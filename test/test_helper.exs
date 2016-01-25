ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Retro.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Retro.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Retro.Repo)

