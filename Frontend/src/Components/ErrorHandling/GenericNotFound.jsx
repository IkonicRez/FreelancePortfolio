import React, { useEffect } from 'react'

const GenericNotFound = () => {

  useEffect(() => {
    document.getElementsByClassName("window-area")[0].remove()
  }, [])

  return (
    <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
      PAGE NOT FOUND!!
    </div>
  )
}

export default GenericNotFound
