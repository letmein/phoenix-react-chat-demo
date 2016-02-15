defmodule Retro.UserTest do
  use Retro.ModelCase

  alias Retro.User

  @valid_attrs %{login: "foo", email: "foo@example.com", name: "Foo"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
