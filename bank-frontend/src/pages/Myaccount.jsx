import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { userDetailsAPI } from '../services/allAPI';

function Myaccount() {
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState({});

  const fetchDetailUser = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      };
      try {
        const result = await userDetailsAPI(reqHeader);
        setUserDetails(result.data);
        console.log(result.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    }
  };

  useEffect(() => {
    fetchDetailUser();
    setUsername(sessionStorage.getItem('username') || '');
  }, []); 

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    window.location.href = '/login'; 
  };

  return (
    <div className="container-fluid user-dashboard">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block sidebar" style={{ backgroundColor: '#f1f2f7', height: '650px' }}>
          <div className="sidebar-sticky">
            <h3 className="sidebar-header m-5">My Bank</h3>
            <ul className="nav flex-column sidebar-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link rounded" style={{ backgroundColor: '#e4e7f5' }} to="/user/account">My Accounts</Link>
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
              <button className='btn' style={{ backgroundColor: '#f1f2f7' }} onClick={handleLogout}>
                <CiLogout className='fs-3 me-2' /> Logout
              </button>
            </div>
          </div>

          <h1 className='mt-5'>My Account</h1>
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Personal Information</h5>
                  <p className="card-text"><strong>Name:</strong> {userDetails.username || 'N/A'}</p>
                  <p className="card-text"><strong>Email:</strong> {userDetails.email || 'N/A'}</p>
                  <p className="card-text"><strong>Phone:</strong> {userDetails.phoneNumber || 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Bank Details</h5>
                  <p className="card-text"><strong>Account Number:</strong> {userDetails.accountNumber || 'N/A'}</p>
                  <p className="card-text"><strong>Account Type:</strong> Savings</p> 
                  <p className="card-text"><strong>Balance:</strong> ${userDetails.balance || '0'}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Myaccount;
