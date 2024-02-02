import React from 'react'
import { NavHeader } from '../../Components'
import { Outlet } from 'react-router-dom'
export default function MainLayout() {
  return (
    <div className="App">
      <section className="App-body">
        <NavHeader/>
        <Outlet/>
      </section>
    </div>
  )
}
