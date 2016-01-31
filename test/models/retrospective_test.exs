defmodule Retro.RetrospectiveTest do
  use Retro.ModelCase

  alias Retro.Retrospective

  @valid_attrs %{due_on: "2010-04-17", uuid: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Retrospective.changeset(%Retrospective{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Retrospective.changeset(%Retrospective{}, @invalid_attrs)
    refute changeset.valid?
  end
end
