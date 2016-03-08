defmodule Retro.UserChannel do
  use Retro.Web, :channel

  def join("users:lobby", payload, socket) do
    if authorized?(payload) do
      user = Retro.Repo.get(Retro.User, socket.assigns.user_id)
      {:ok, user, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("user-joined", payload, socket) do
    broadcast socket, "user-joined", payload
    {:noreply, socket}
  end

  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  defp authorized?(_payload) do
    true
  end
end
