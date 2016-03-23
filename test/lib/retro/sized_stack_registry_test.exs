defmodule Retro.SizedStackRegistryTest do
  use ExUnit.Case, async: true
  
  alias Retro.SizedStackRegistry

  setup do
    {:ok, _} = SizedStackRegistry.start_link(:sized_stack, 2)
    :ok
  end

  test "behaves like a sized stack" do
    assert SizedStackRegistry.all(:sized_stack) == []

    SizedStackRegistry.put(:sized_stack, 1)

    assert SizedStackRegistry.all(:sized_stack) == [1]

    SizedStackRegistry.put(:sized_stack, 2)

    assert SizedStackRegistry.all(:sized_stack) == [2, 1]

    SizedStackRegistry.put(:sized_stack, 3)

    assert SizedStackRegistry.all(:sized_stack) == [3, 2]
  end
end
