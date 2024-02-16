import { React, useContext } from 'react';
import { Link } from 'react-router-dom'
import { WindowManagerContext } from '../MovableWindow/WindowManager/context/WindowManagerContext';

const NavHeader = (props) => {
  const {x, y, dispatchCallbackEvent} = useContext(WindowManagerContext);
  return (
    <header>
      <Link to="/" onClick={() => {dispatchCallbackEvent({type:"reset"})}}>
        <h1>{props.title}</h1>
      </Link>
      <nav>
        <Link to="/team" onClick={() => {dispatchCallbackEvent({type:"reset"})}}><p>Team</p></Link>
        <Link to="/showcase" onClick={() => {dispatchCallbackEvent({type:"reset"})}}><p>Showcase</p></Link>
      </nav>
    </header>
  )
}

export default NavHeader
