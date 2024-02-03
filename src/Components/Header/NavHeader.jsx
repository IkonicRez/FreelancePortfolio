import React from 'react'

const NavHeader = () => {
  return (
    <div>
      <header id='App-header'>
        <a href="/">
          <h1>IRFreelance</h1>
        </a>
        <nav id='header-nav'>
            <a href="/team">Team</a>
            <a href="/showcase">Showcase</a>
        </nav>
      </header>
    </div>
  )
}

export default NavHeader
