defmodule Retro.UserSocket do
  use Phoenix.Socket

  ## Channels
  #channel "retrospectives:*", Retro.RetrospectiveChannel
  channel "users:*", Retro.UserChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket

  def connect(%{"token" => token}, socket) do
    # max_age: 1209600 is equivalent to two weeks in seconds
    case Phoenix.Token.verify(socket, "user", token, max_age: 1209600) do
      {:ok, user_id} ->
        {:ok, assign(socket, :user_id, user_id)}
      {:error, reason} ->
        :error
    end
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "users_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     Retro.Endpoint.broadcast("users_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(socket), do: "users_socket:#{socket.assigns.user_id}"
end
