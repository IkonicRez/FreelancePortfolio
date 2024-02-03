import React from 'react'
import { NavHeader } from '../../Components'
import WindowManager from '../../Components/MovableWindow/WindowManager'
import { Outlet } from 'react-router-dom'


export default function MainLayout() {
  return (
    <div className="App">
      <WindowManager className="App-body">
        <NavHeader/>
        <Outlet/>
      </WindowManager>
    </div>
  )
}
