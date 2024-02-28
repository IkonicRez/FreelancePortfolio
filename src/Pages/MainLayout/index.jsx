import React from 'react'
import { NavHeader, WindowManager } from '../../Components'
import { Outlet } from 'react-router-dom'


export default function MainLayout() {
  return (
    <>
      <NavHeader title="IRFreelance"/>
      <WindowManager >
          <Outlet/>
      </WindowManager>
    </>
  )
}
