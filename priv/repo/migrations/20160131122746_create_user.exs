defmodule Retro.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :abbrev, :string
      add :email, :string

      timestamps
    end

  end
end
