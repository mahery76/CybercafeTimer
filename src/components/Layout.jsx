import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Layout() {

  return (
    <div>
      <NavLink to="/">Postes</NavLink>
      <NavLink to="/wifi">Wi-fi</NavLink>
      <Outlet/>
    </div>
  )
}

export default Layout