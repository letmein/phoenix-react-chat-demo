import React from "react"

import RetroListItem from "app/components/retro-list-item"

export default (props) => {
  let items = props.items.map((item) => {
    return (
      <RetroListItem key={item.uuid} retro={item}/>
    )
  })

  return (
    <ul>{items}</ul>
  )
}
