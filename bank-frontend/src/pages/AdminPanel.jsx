import React, { useEffect, useState } from 'react'
import { Link,useNavigate  } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";

function AdminPanel() {
  const [username,setUsername]=useState("")
  const navigate = useNavigate();
  useEffect(()=>{
setUsername(sessionStorage.getItem('username'))
  })
  const handleLogout = () => {
    
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    
    navigate('/');
  };
  return (
    <div><div className="container-fluid admin-dashboard">
    <div className="row">
      <nav className="col-md-2 d-none d-md-block sidebar" style={{backgroundColor:'#f1f2f7',height:'650px'}}>
        <div className="sidebar-sticky">
          <h3 className="sidebar-header m-5">My Bank</h3>
          <ul className="nav flex-column sidebar-menu">
            <li className="nav-item">
              <Link className="nav-link rounded" style={{backgroundColor:'#e4e7f5'}} to="/admin">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/user">Manage Users</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/admin/accounts">Manage Accounts</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/admin/transactions">Manage Transactions</Link>
            </li>
            
          </ul>
        </div>
      </nav>

      <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="d-flex justify-content-end align-items-center pt-3 pb-2 mb-3 border-bottom">
      <div className="user-info mb-2 d-flex align-items-center">
            <span className="username me-5">Admin</span>
            <button className='btn' style={{backgroundColor:'#f1f2f7'}} onClick={handleLogout}><CiLogout className='fs-3 me-4' /> Logout</button>
          </div>
        </div>
        <h1 className='mt-5'>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard. Here you can manage user accounts, transactions, and view banking statistics.</p>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Manage Users</h5>
                <p className="card-text">View and manage all registered users.</p>
                <a href="/admin/user" className="btn btn-primary">Manage Users</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
          <div className="card">
              <div className="card-body">
                <h5 className="card-title">Manage Transactions</h5>
                <p className="card-text">View and manage all transactions.</p>
                <a href="/admin/transactions" className="btn btn-primary">View Transactions</a>
              </div>
            </div>
          
          </div>
          <div className="col-md-4">
            {/* <div className="card">
              <div className="card-body">
                <h5 className="card-title">Manage Accounts</h5>
                <p className="card-text">View and manage all user accounts.</p>
                <a href="/admin/accounts" className="btn btn-primary">Manage Accounts</a>
              </div>
            </div> */}
          </div>
       
        </div>
      </main>
    </div>
  </div></div>
  )
}

export default AdminPanel