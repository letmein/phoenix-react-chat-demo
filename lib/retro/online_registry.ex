defmodule Retro.OnlineRegistry do
  def start_link do
    Agent.start_link(fn -> MapSet.new end, name: __MODULE__)
  end

  def online?(user_id) do
    Agent.get(__MODULE__, fn set -> user_id in set end)
  end

  def add(user_id) do
    Agent.update(__MODULE__, &MapSet.put(&1, user_id))
  end

  def remove(user_id) do
    Agent.update(__MODULE__, &MapSet.delete(&1, user_id))
  end

  def all do
    Agent.get(__MODULE__,  &MapSet.to_list(&1))
  end
end
