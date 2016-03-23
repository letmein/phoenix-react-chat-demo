defmodule Retro.SetRegistry do
  def start_link(name) do
    Agent.start_link(fn -> MapSet.new end, name: name)
  end

  def includes?(name, item) do
    Agent.get(name, fn set -> item in set end)
  end

  def put(name, item) do
    Agent.update(name, &MapSet.put(&1, item))
  end

  def delete(name, item) do
    Agent.update(name, &MapSet.delete(&1, item))
  end

  def all(name) do
    Agent.get(name, &MapSet.to_list(&1))
  end
end
