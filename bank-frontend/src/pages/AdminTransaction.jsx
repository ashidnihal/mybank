import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBadge } from 'mdb-react-ui-kit';
import { adminAlltransAPI } from '../services/allAPI';

function AdminTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [error, setError] = useState(null);
  const navigate=useNavigate()
  useEffect(() => {
    fetchTransactionDetails();
  }, [searchKey]);

  const fetchTransactionDetails = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      };
      
      try {
        const result = await adminAlltransAPI(searchKey, reqHeader);
        setTransactions(result.data);
        
        
      } catch (error) {
        setError('Failed to fetch transactions');
      }
    }
  };

  const handleLogout = () => {
    
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    
    navigate('/');
  };
  if (error) return <div>{error}</div>;

  return (
    <div className="container-fluid admin-dashboard">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block sidebar" style={{ backgroundColor: '#f1f2f7', height: '650px' }}>
          <div className="sidebar-sticky">
            <h3 className="sidebar-header m-5">My Bank</h3>
            <ul className="nav flex-column sidebar-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/user">Manage Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link rounded" style={{ backgroundColor: '#e4e7f5' }} to="/admin/transactions">Manage Transactions</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <input
              className="form-control form-control-dark w-50"
              onChange={e => setSearchKey(e.target.value)}
              type="text"
              placeholder="Search User."
              aria-label="Search"
            />
            <div className="user-info mb-2">
              <span className="username me-5">Admin</span>
              <button className='btn' style={{ backgroundColor: '#f1f2f7' }} onClick={handleLogout}>
                <CiLogout className='fs-3 me-2' /> Logout
              </button>
            </div>
          </div>

          <h1 className='mt-5'>Transaction Management</h1>
          <p>Welcome to the transaction management section. You can review, approve, or reject transactions below.</p>

          <MDBTable align='middle'>
            <MDBTableHead>
              <tr className='table-dark'>
                <th scope='col'>#</th>
                <th scope='col'>Transaction ID</th>
                <th scope='col'>User</th>
                <th scope='col'>Amount</th>
                <th scope='col'>Date</th>
                <th scope='col'>Type</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={transaction._id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{transaction._id}</td>
                    <td>{transaction.userId.username}</td> 
                    <td>{transaction.amount}</td>
                    <td>{new Date(transaction.date).toLocaleString()}</td>
                    <td>
                      <MDBBadge color={transaction.type === 'deposit' ? 'success' : 'danger'} pill>
                        {transaction.type}
                      </MDBBadge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No transactions found</td>
                </tr>
              )}
            </MDBTableBody>
          </MDBTable>
        </main>
      </div>
    </div>
  );
}

export default AdminTransaction;
