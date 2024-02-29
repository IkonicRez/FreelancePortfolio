import React from 'react'
import { NavHeader, WindowManager, ContactModal } from '../../Components'
import { Outlet } from 'react-router-dom'


export default function MainLayout() {
  return (
    <>
      <NavHeader title="IRFreelance"/>
      <ContactModal/>
      <WindowManager >
          <Outlet/>
      </WindowManager>
    </>
  )
}
