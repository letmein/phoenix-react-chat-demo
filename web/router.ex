defmodule Retro.Router do
  use Retro.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :assign_user
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/auth", Retro do
    pipe_through :browser

    get "/:provider", AuthController, :index
    get "/:provider/callback", AuthController, :callback
    get "/:provider/logout", AuthController, :delete
  end

  scope "/", Retro do
    pipe_through :browser

    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Retro do
  #   pipe_through :api
  # end

  defp assign_user(conn, _) do
    token   = get_session(conn, :user_token)
    user_id = get_session(conn, :current_user_id)

    conn
    |> assign(:user_token, token)
    |> assign(:user_id, user_id)
  end
end
