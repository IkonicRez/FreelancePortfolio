import { React } from 'react';
import { Link } from 'react-router-dom'

const NavHeader = (props) => {
  return (
    <header>
      <Link to="/">
        <h1>{props.title}</h1>
      </Link>
      <nav>
        <Link to="/team"><p>Team</p></Link>
        <Link to="/showcase"><p>Showcase</p></Link>
      </nav>
    </header>
  )
}

export default NavHeader
