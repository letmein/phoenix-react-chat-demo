defmodule Retro.PageControllerTest do
  use Retro.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Home Page!"
  end
end
