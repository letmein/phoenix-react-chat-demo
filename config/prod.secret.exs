use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :retro, Retro.Endpoint,
  secret_key_base: "/BizaRjbSpfm+5uFE9l9a2Doeq366t8EKsUoQ4qzOcWX1IkdwZT4PIz/b7DpseyE"

# Configure your database
config :retro, Retro.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("DATABASE_USERNAME"),
  password: System.get_env("DATABASE_PASSWORD"),
  database: "retro_prod",
  pool_size: 20
