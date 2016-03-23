defmodule Retro.SizedStackRegistry do
  def start_link(name, max_size) do
    Agent.start_link(fn -> {max_size, []} end, name: name)
  end

  def put(name, item) do
    Agent.update(name, fn list ->
      {max_size, items} = list
      result = add(items, item, max_size) 
      {max_size, result}
    end)
  end

  def all(name) do
    Agent.get(name, fn list ->
      {_, items} = list
      items
    end)
  end

  defp add(items, item, max_size) when length(items) >= max_size do
    trimmed_list = List.delete_at(items, -1)
    add(trimmed_list, item, max_size)
  end

  defp add(items, item, _) do
    [item | items]
  end
end
