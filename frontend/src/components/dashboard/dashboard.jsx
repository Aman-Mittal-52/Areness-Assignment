import React from 'react'
import cookie from 'js-cookie'

function Dashboard() {

cookie.get('token')

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard