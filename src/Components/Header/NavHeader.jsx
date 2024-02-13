import React from 'react'
import { Link } from 'react-router-dom'

const NavHeader = (props) => {
  return (
    <header>
      <Link to="/">
        <h1>{props.title}</h1>
      </Link>
      <nav>
        {props.children}
      </nav>
    </header>
  )
}

export default NavHeader
