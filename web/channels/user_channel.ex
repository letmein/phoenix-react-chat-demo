defmodule Retro.UserChannel do
  use Retro.Web, :channel

  def join("users:" <> user_id, payload, socket) do
    if authorized?(payload) do
      user = Retro.Repo.get(Retro.User, user_id)
      {:ok, user, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  defp authorized?(_payload) do
    true
  end
end
