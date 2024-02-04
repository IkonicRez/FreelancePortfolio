import React from 'react'
import { Link } from 'react-router-dom'

const NavHeader = () => {
  return (
    <div>
      <header id='App-header'>
        <Link href="/">
          <h1>IRFreelance</h1>
        </Link>
        <nav id='header-nav'>
            <Link href="/team">Team</Link>
            <Link href="/showcase">Showcase</Link>
        </nav>
      </header>
    </div>
  )
}

export default NavHeader
