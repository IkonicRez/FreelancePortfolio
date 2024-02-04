import React from 'react'
import { Link } from 'react-router-dom'

const NavHeader = () => {
  return (
    <div>
      <header id='App-header'>
        <Link to="/">
          <h1>IRFreelance</h1>
        </Link>
        <nav id='header-nav'>
            <Link to="/team">Team</Link>
            <Link to="/showcase">Showcase</Link>
        </nav>
      </header>
    </div>
  )
}

export default NavHeader
