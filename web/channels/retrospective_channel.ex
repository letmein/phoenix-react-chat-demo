defmodule Retro.RetrospectiveChannel do
  use Retro.Web, :channel
  import Ecto.Query
  alias Retro.Retrospective
  alias Retro.Repo

  def join("retrospectives:lobby", payload, socket) do
    if authorized?(payload) do
      retros = Repo.all(Retrospective)
      {:ok, retros, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("new:retrospective", payload, socket) do
    changeset = Retrospective.changeset(%Retrospective{}, payload)
    case Repo.insert(changeset) do
      {:ok, retro} ->
        broadcast! socket, "new:retrospective", payload
        {:reply, {:ok, payload}, socket}
      {:error, changeset} ->
        {:reply, :error, socket}
    end
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (retrospectives:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
