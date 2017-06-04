defmodule Retro.AuthController do
  use Retro.Web, :controller

  alias Retro.SaveAuthenticatedUser

  def index(conn, %{"provider" => provider}) do
    redirect conn, external: authorize_url!(provider)
  end

  def delete(conn, _params) do
    conn
    |> put_flash(:info, "You have been logged out!")
    |> configure_session(drop: true)
    |> redirect(to: "/")
  end

  def callback(conn, %{"provider" => provider, "code" => code}) do
    oauth_token = get_token!(provider, code)
    user_attrs  = get_user!(provider, oauth_token)

    {:ok, user} = SaveAuthenticatedUser.call(user_attrs)
    user_token  = Phoenix.Token.sign(conn, "user", user.id)

    conn
    |> put_session(:current_user_id, user.id)
    |> put_session(:user_token, user_token)
    |> put_session(:oauth_access_token, oauth_token.token.access_token)
    |> redirect(to: "/")
  end

  defp authorize_url!("github"), do: GitHub.authorize_url!
  defp authorize_url!(_), do: raise "No matching provider available"

  defp get_token!("github", code), do: GitHub.get_token!(code: code)
  defp get_token!(_, _), do: raise "No matching provider available"

  defp get_user!("github", token) do
    user = OAuth2.Client.get!(token, "/user").body
    %{
      name:       user["name"],
      avatar_url: user["avatar_url"],
      email:      user["email"],
      login:      user["login"]
    }
  end
end
