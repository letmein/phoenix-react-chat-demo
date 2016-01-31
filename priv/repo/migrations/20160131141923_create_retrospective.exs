defmodule Retro.Repo.Migrations.CreateRetrospective do
  use Ecto.Migration

  def change do
    create table(:retrospectives) do
      add :uuid, :string
      add :due_on, :date

      timestamps
    end

  end
end
