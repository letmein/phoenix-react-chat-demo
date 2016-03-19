defmodule Retro.User do
  use Retro.Web, :model

  @primary_key {:id, :binary_id, autogenerate: true}

  @derive {Poison.Encoder, only: [
    :id,
    :name,
    :login,
    :avatar_url
  ]}
  schema "users" do
    field :name, :string
    field :login, :string
    field :email, :string
    field :avatar_url, :string

    timestamps
  end

  @required_fields ~w(login)
  @optional_fields ~w(avatar_url email name )

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
