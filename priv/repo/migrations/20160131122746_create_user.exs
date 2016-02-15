defmodule Retro.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :login, :string
      add :email, :string
      add :avatar_url, :string

      timestamps
    end

  end
end
