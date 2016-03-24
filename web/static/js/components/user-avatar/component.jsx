import React from "react"

export default (props) => {
  const { imageUrl, className } = props
  const style = { backgroundImage: `url(${imageUrl})` }
  return (
    <span style={style} className={`user-avatar ${className}`}/>
  )
}
