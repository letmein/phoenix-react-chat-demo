defmodule Retro.SaveAuthenticatedUserTest do
  use ExUnit.Case

  alias Retro.SaveAuthenticatedUser
  alias Retro.User
  alias Retro.Repo

  require IEx

  setup do
    # TODO create a Rerto.SomethingCase
    Ecto.Adapters.SQL.restart_test_transaction(Retro.Repo, [])
    :ok
  end

  test "create a new user" do
    SaveAuthenticatedUser.call(%{
      login: "foo",
      email: "foo@example.com",
      name:  "Foo"
    })
    results = Repo.all(User)
    assert length(results) == 1
  end

  test "update an existing user" do
    Repo.insert!(%User{login: "foo"})
    SaveAuthenticatedUser.call(%{
      login: "foo",
      email: "foo@example.com",
      name:  "Foo"
    })
    results = Repo.all(User)
    assert length(results) == 1
  end
end
