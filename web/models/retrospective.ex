defmodule Retro.Retrospective do
  use Retro.Web, :model

  @derive {Poison.Encoder, only: [:uuid, :due_on]}
  schema "retrospectives" do
    field :uuid, :string
    field :due_on, Ecto.Date

    timestamps
  end

  @required_fields ~w(uuid)
  @optional_fields ~w(due_on)

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
