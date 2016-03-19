defmodule Retro.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    execute "CREATE EXTENSION \"uuid-ossp\""
    create table(:users, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :name, :string
      add :login, :string
      add :email, :string
      add :avatar_url, :string

      timestamps
    end

  end
end
