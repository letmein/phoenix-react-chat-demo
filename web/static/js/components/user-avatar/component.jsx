import React from "react"

export default (props) => {
  const { imageUrl, className } = props
  return (
    <img src={imageUrl} height="32" width="32" className={`user-avatar ${className}`}/>
  )
}
