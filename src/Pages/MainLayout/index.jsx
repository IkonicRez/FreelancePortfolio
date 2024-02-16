import React from 'react'
import { NavHeader, WindowManager } from '../../Components'
import { Outlet, Link } from 'react-router-dom'


export default function MainLayout() {
  return (
      <WindowManager>
        <NavHeader title="IRFreelance"/>
        <div className='window-area'>
          <Outlet/>
        </div>
      </WindowManager>
  )
}
