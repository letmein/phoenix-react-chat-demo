defmodule Retro.RetrospectiveChannelTest do
  use Retro.ChannelCase

  alias Retro.RetrospectiveChannel

  setup do
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(RetrospectiveChannel, "retrospectives:lobby")

    {:ok, socket: socket}
  end

  test "new:retrospectives replies with success", %{socket: socket} do
    ref = push socket, "new:retrospective", %{"uuid" => "UUID", "due_on" => "2016-10-10"}
    assert_reply ref, :ok
  end

  test "new:retrospectives broadcasts to retrospectives:lobby", %{socket: socket} do
    push socket, "new:retrospective", %{"uuid" => "UUID", "due_on" => "2016-10-10"}
    assert_broadcast "new:retrospective", %{"uuid" => "UUID", "due_on" => "2016-10-10"}
  end

  test "new:retrospectives returns an error with wrong params", %{socket: socket} do
    ref = push socket, "new:retrospective", %{}
    assert_reply ref, :error
  end

  """ 
  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from! socket, "broadcast", %{"some" => "data"}
    assert_push "broadcast", %{"some" => "data"}
  end
  """
end
