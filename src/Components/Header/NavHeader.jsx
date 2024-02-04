import React from 'react'
import { Link } from 'react-router-dom'

const NavHeader = (props) => {
  return (
    <div>
      <header id='App-header'>
        <Link to="/">
          <h1>{props.title}</h1>
        </Link>
        <nav id='header-nav'>
          {props.children}
        </nav>
      </header>
    </div>
  )
}

export default NavHeader
