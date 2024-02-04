import React from 'react'
import { NavHeader, WindowManager } from '../../Components'
import { Outlet, Link } from 'react-router-dom'


export default function MainLayout() {
  return (
    <div className="App">
      <WindowManager className="App-body">
        <NavHeader title="IRFreelance">
          <Link to="/team">Team</Link>
          <Link to="/showcase">Showcase</Link>
        </NavHeader>
        <Outlet/>
      </WindowManager>
    </div>
  )
}
