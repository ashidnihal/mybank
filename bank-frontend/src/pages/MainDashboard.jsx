import React from 'react'
import AdminPanel from './AdminPanel'
import Dashboard from './Dashboard'
function MainDashboard() {
    const role = sessionStorage.getItem('isAdmin');
    console.log(role);
    
  return (
    <div>
    {role === 'true' ? (
        <AdminPanel />
    ) : (
        <Dashboard />
    )}
</div>
  )
}

export default MainDashboard