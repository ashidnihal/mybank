import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
function Dashboard() {
  const [username,setUsername]=useState("")
  useEffect(()=>{
setUsername(sessionStorage.getItem('username'))
  })
  return (
    <div>
    <div className="container-fluid user-dashboard">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block sidebar" style={{backgroundColor:'#f1f2f7',height:'650px'}}>
          <div className="sidebar-sticky">
            <h3 className="sidebar-header m-5">My Bank</h3>
            <ul className="nav flex-column sidebar-menu">
              <li className="nav-item">
                <Link className="nav-link rounded" style={{backgroundColor:'#e4e7f5'}} to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user/myaccount">My Accounts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user/transaction">Transaction History</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user/payments">Make a Payment</Link>
              </li>
             
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div className="d-flex justify-content-end align-items-center pt-3 pb-2 mb-3 border-bottom">
    <div className="user-info mb-2 d-flex align-items-center">
        <span className="username me-5">{username}</span>
        <button className='btn' style={{backgroundColor:'#f1f2f7'}}>
            <CiLogout className='fs-3 me-4' /> Logout
        </button>
    </div>
</div>

          <h1 className='mt-5'>User Dashboard</h1>
          <p>Welcome to your dashboard. Here, you can view your accounts, manage transactions, and transfer funds securely.</p>

          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">My Accounts</h5>
                  <p className="card-text">View and manage your bank accounts.</p>
                  <a href="/user/myaccount" className="btn btn-primary">View Accounts</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Transaction History</h5>
                  <p className="card-text">Review your past transactions.</p>
                  <a href="/user/transaction" className="btn btn-primary">View Transactions</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Make a Payment</h5>
                  <p className="card-text">Initiate a new payment or transfer.</p>
                  <a href="/user/payments" className="btn btn-primary">Make Payment</a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3">
            
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
  )
}

export default Dashboard