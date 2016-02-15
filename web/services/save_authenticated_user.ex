defmodule Retro.SaveAuthenticatedUser do
  alias Retro.Repo
  alias Retro.User

  def call(user_attrs) do
    case Repo.get_by(User, login: user_attrs[:login]) do
      nil  -> %User{login: user_attrs[:login]}
      user -> user
    end
    |> User.changeset(user_attrs)
    |> Repo.insert_or_update
  end
end
