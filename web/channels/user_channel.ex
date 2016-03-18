defmodule Retro.UserChannel do
  use Retro.Web, :channel
  import Ecto.Query

  intercept ["user-joined"]

  def join("users:lobby", payload, socket) do
    Retro.OnlineRegistry.add(socket.assigns.user_id)
    if authorized?(payload) do
      {:ok, %{users: users_online}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("user-joined", payload, socket) do
    broadcast socket, "user-joined", payload
    {:noreply, socket}
  end

  def handle_out("user-joined", payload, socket) do
    user_id = socket.assigns.user_id
    case payload do
      %{"id" => ^user_id} ->
        {:noreply, socket}
      _ ->
        push socket, "user-joined", payload
        {:noreply, socket}
    end
  end

  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  def terminate(_reason, socket) do
    Retro.OnlineRegistry.remove(socket.assigns.user_id)
    broadcast socket, "user-left", %{id: socket.assigns.user_id}
    :ok
  end

  defp authorized?(_payload) do
    true
  end

  defp users_online do
    ids = Retro.OnlineRegistry.all
    query = from u in Retro.User, where: u.id in ^ids
    Retro.Repo.all(query)
  end
end
