defmodule Retro.UserChannel do
  use Retro.Web, :channel
  import Ecto.Query

  intercept ["user-joined", "user-typing"]

  def join("users:lobby", payload, socket) do
    if authorized?(payload) do
      Retro.SetRegistry.put(:online, socket.assigns.user_id)
      messages = Retro.SizedStackRegistry.all(:messages)
      online   = Retro.SetRegistry.all(:online)
      response = %{
        users:           all_users(messages, online),
        messages:        messages,
        online_user_ids: online
      }
      {:ok, response, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("user-authenticated", user_id, socket) do
    user = Retro.Repo.get(Retro.User, user_id)
    broadcast socket, "user-joined", user
    {:noreply, socket}
  end

  def handle_in("user-typing", user, socket) do
    broadcast socket, "user-typing", user
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

  def handle_out("user-typing", user, socket) do
    unless user["id"] == socket.assigns.user_id do
      push socket, "user-typing", user
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

  defp all_users(messages, online) do
    all_user_ids =  messages
      |> Enum.map(&(&1["user_id"]))
      |> Enum.concat(online)
      |> Enum.dedup
    query = from u in Retro.User, where: u.id in ^all_user_ids
    Retro.Repo.all(query)
  end
end
