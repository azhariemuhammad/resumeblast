import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4px' }}>
      <Outlet />
    </div>
  )
}

export default Layout
