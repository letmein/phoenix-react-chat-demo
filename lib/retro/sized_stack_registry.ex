defmodule Retro.SizedStackRegistry do
  def start_link(name, max_size) do
    Agent.start_link(fn -> {max_size, []} end, name: name)
  end

  def put(name, item) do
    Agent.update(name, fn {max_size, items} ->
      add({max_size, items}, item)
    end)
  end

  def all(name) do
    Agent.get(name, fn {_, items} ->
      items
    end)
  end

  defp add({max_size, items}, item) when length(items) >= max_size do
    add({max_size, List.delete_at(items, -1)}, item)
  end

  defp add({max_size, items}, item) do
    {max_size, [item | items]}
  end
end
