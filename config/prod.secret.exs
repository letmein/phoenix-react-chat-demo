use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :retro, Retro.Endpoint,
  secret_key_base: "/BizaRjbSpfm+5uFE9l9a2Doeq366t8EKsUoQ4qzOcWX1IkdwZT4PIz/b7DpseyE"

# Configure your database
config :retro, Retro.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: System.get_env("DATABASE_URL"),
  pool_size: 20

config :retro, GitHub,
  client_id:     System.get_env("GITHUB_CLIENT_ID"),
  client_secret: System.get_env("GITHUB_CLIENT_SECRET"),
  redirect_uri:  System.get_env("GITHUB_REDIRECT_URI")
