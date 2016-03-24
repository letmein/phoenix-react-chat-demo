defmodule Retro.UserChannel do
  use Retro.Web, :channel
  import Ecto.Query

  intercept ["user-joined"]

  def join("users:lobby", payload, socket) do
    Retro.SetRegistry.put(:online, socket.assigns.user_id)
    messages = Retro.SizedStackRegistry.all(:messages)
    if authorized?(payload) do
      {:ok, %{users: users_online, messages: messages}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("user-authenticated", user_id, socket) do
    user = Retro.Repo.get(Retro.User, user_id)
    broadcast socket, "user-joined", user
    {:noreply, socket}
  end

  def handle_in("message-sent", payload, socket) do
    Retro.SizedStackRegistry.put(:messages, payload)
    broadcast socket, "message-received", payload
    {:reply, :ok, socket}
  end

  def handle_out("user-joined", user, socket) do
    unless user.id == socket.assigns.user_id do
      push socket, "user-joined", user
    end
    {:noreply, socket}
  end

  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  def terminate(_reason, socket) do
    Retro.SetRegistry.delete(:online, socket.assigns.user_id)
    broadcast socket, "user-left", %{id: socket.assigns.user_id}
    :ok
  end

  defp authorized?(_payload) do
    true
  end

  defp users_online do
    ids = Retro.SetRegistry.all(:online)
    query = from u in Retro.User, where: u.id in ^ids
    Retro.Repo.all(query)
  end
end
