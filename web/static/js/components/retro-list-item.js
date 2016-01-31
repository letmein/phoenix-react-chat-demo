import React from "react"
import { Link } from "react-router"

export default (props) => {
  let retro = props.retro
  return (
    <li>
      <Link to={`/retro/${retro.uuid}`}>{retro.uuid}</Link>
    </li>
  )
}
