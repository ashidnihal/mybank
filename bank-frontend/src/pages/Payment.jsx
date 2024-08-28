
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { depositAPI, withdrawAPI } from '../services/allAPI';

function Payment() {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [username, setUsername] = useState('');
  const handleCloseWithdraw = () => setShowWithdraw(false);
  const handleShowWithdraw = () => setShowWithdraw(true);
  const handleCloseDeposit = () => setShowDeposit(false);
 const handleShowDeposit = () => setShowDeposit(true);
  useEffect(() => {
    setUsername(sessionStorage.getItem('username'));
  }, []);

  const handleTransaction = async (type) => {
    const token = sessionStorage.getItem('token');
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    };

    const userId = sessionStorage.getItem('userId');
    const transactionData = { userId, amount: parseFloat(amount) };

    let result;
    if (type === 'deposit') {
      result = await depositAPI(transactionData, reqHeader);
    } else if (type === 'withdraw') {
      result = await withdrawAPI(transactionData, reqHeader);
    }

    if (result && result.data) {
      setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`);
    } else {
      setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} failed.`);
    }

    setAmount(''); 
    setShowDeposit(false);
    setShowWithdraw(false);
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
                <Link className="nav-link" to="/user/myaccount">My Accounts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user/transaction">Transaction History</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={{ backgroundColor: '#e4e7f5' }} to="/user/payments">Make a Payment</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-end align-items-center pt-3 pb-2 mb-3 border-bottom">
            <div className="user-info mb-2 d-flex align-items-center">
              <span className="username me-5">{username}</span>
              <button className='btn' style={{ backgroundColor: '#f1f2f7' }}>
                <CiLogout className='fs-3 me-4' /> Logout
              </button>
            </div>
          </div>

          <h1 className='mt-5'>User Dashboard</h1>
          <p>Welcome to your dashboard. Here you can view your accounts, manage transactions, and update your settings.</p>

          <div className="row mt-4">
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Deposit</h5>
                  <p className="card-text">Add funds to your account.</p>
                  <Button variant="primary" onClick={handleShowDeposit}>Deposit Funds</Button>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Withdraw</h5>
                  <p className="card-text">Withdraw funds from your account.</p>
                  <Button variant="primary" onClick={handleShowWithdraw}>Withdraw Funds</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Deposit Modal */}
          <Modal show={showDeposit} onHide={handleCloseDeposit}>
            <Modal.Header closeButton>
              <Modal.Title>Deposit Funds</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label htmlFor="depositAmount" className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="depositAmount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                <Button variant="primary" type="button" onClick={() => handleTransaction('deposit')}>Deposit</Button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeposit}>Close</Button>
            </Modal.Footer>
          </Modal>

          {/* Withdraw Modal */}
          <Modal show={showWithdraw} onHide={handleCloseWithdraw}>
            <Modal.Header closeButton>
              <Modal.Title>Withdraw Funds</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label htmlFor="withdrawAmount" className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="withdrawAmount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                <Button variant="primary" type="button" onClick={() => handleTransaction('withdraw')}>Withdraw</Button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseWithdraw}>Close</Button>
            </Modal.Footer>
          </Modal>

          {message && <div className="alert alert-info mt-3">{message}</div>}
        </main>
      </div>
    </div>
  );
}

export default Payment;
