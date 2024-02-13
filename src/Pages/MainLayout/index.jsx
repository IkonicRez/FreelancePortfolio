import React from 'react'
import { NavHeader, WindowManager } from '../../Components'
import { Outlet, Link } from 'react-router-dom'


export default function MainLayout() {
  return (
      <WindowManager>
        <NavHeader title="IRFreelance">
          <Link to="/team"><p>Team</p></Link>
          <Link to="/showcase"><p>Showcase</p></Link>
        </NavHeader>
        <Outlet/>
      </WindowManager>
  )
}
