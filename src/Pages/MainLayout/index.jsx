import React from 'react'
import { NavHeader, WindowManager} from '../../Components'
import { Outlet } from 'react-router-dom'
import ModalButton from '../../Components/Contact/ModalButton'


export default function MainLayout() {
  return (
    <>
      <NavHeader title="IRFreelance"/>
      <ModalButton/>
      <WindowManager >
          <Outlet/>
      </WindowManager>
    </>
  )
}
