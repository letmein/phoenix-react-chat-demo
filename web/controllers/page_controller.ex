defmodule Retro.PageController do
  use Retro.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
