defmodule Retro.SetRegistryTest do
  use ExUnit.Case, async: true

  setup do
    {:ok, _} = Retro.SetRegistry.start_link(:foo)
    :ok
  end

  test "behaves like a set" do
    assert Retro.SetRegistry.includes?(:foo, 1) == false

    Retro.SetRegistry.put(:foo, 1)

    assert Retro.SetRegistry.includes?(:foo, 1) == true

    Retro.SetRegistry.put(:foo, 2)

    assert Retro.SetRegistry.all(:foo) == [1, 2]

    Retro.SetRegistry.delete(:foo, 2)

    assert Retro.SetRegistry.includes?(:foo, 2) == false
  end
end
