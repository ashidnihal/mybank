
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import { CiLogout } from "react-icons/ci";
// import { MDBTable, MDBTableHead, MDBTableBody, MDBBadge } from 'mdb-react-ui-kit';
// function Transaction() {
//   const [username,setUsername]=useState("")
//   useEffect(()=>{
// setUsername(sessionStorage.getItem('username'))
//   })
//   return (
//     <div className="container-fluid user-dashboard">
//     <div className="row">
//       <nav className="col-md-2 d-none d-md-block sidebar" style={{ backgroundColor: '#f1f2f7', height: '650px' }}>
//         <div className="sidebar-sticky">
//           <h3 className="sidebar-header m-5">My Bank</h3>
//           <ul className="nav flex-column sidebar-menu">
//             <li className="nav-item">
//               <Link className="nav-link" to="/dashboard">Dashboard</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link "  to="/user/account">My Accounts</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link rounded" style={{ backgroundColor: '#e4e7f5' }} to="/user/transaction">Transaction History</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/user/payments">Make a Payment</Link>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
//         <div className="d-flex justify-content-end align-items-center pt-3 pb-2 mb-3 border-bottom">
//           <div className="user-info mb-2 d-flex align-items-center">
//             <span className="username me-5">{username}</span>
//             <button className='btn' style={{ backgroundColor: '#f1f2f7' }}>
//               <CiLogout className='fs-3 me-2' /> Logout
//             </button>
//           </div>
//         </div>

//         <h1 className='mt-5'>Manage Transactions</h1>
//         <p>Welcome to the transaction management section. Review your transactions below.</p>
//          <MDBTable align='middle'>
//       <MDBTableHead>
//         <tr className='table-dark'>
//         <th scope='col'>#</th>
//         <th scope='col'>Transaction ID</th>
//         <th scope='col'>Amount</th>
//         <th scope='col'>Date</th>
//         <th scope='col'>Status</th>
//          <th scope='col'>Actions</th>
//         </tr>
//       </MDBTableHead>
      
//       <MDBTableBody>
//         <tr>
//           <th scope='row'>1</th>
//           <td>Mark</td>
//           <td>Otto</td>
//           <td>@mdo</td>
//           <td>
//             <MDBBadge color='warning' pill>
//               Awaiting
//             </MDBBadge>
//           </td>
//           <td>Otto</td>

//         </tr>
//         <tr>
//           <th scope='row'>2</th>
//           <td>Jacob</td>
//           <td>Thornton</td>
//           <td>@fat</td>
//         </tr>
//         <tr>
//           <th scope='row'>3</th>
//           <td colSpan={2}>Larry the Bird</td>
//           <td>@twitter</td>
//         </tr>
//       </MDBTableBody>
//     </MDBTable>
//       </main>
//     </div>
//   </div>
//   )
// }

// export default Transaction
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBadge } from 'mdb-react-ui-kit';
import { getUserTransactionsAPI } from '../services/allAPI'; 
import { format } from 'date-fns';
function Transaction() {
  const [username, setUsername] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  
  const fetchTransactions = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      };
      try {
        const result = await getUserTransactionsAPI(reqHeader);
        setTransactions(result.data);
        console.log(result.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    }
  };
  
  useEffect(() => {
    setUsername(sessionStorage.getItem('username'));

  
  

    fetchTransactions();
    
    
  }, []);

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
                <Link className="nav-link " to="/user/account">My Accounts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link rounded" style={{ backgroundColor: '#e4e7f5' }} to="/user/transaction">Transaction History</Link>
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
              <button className='btn' style={{ backgroundColor: '#f1f2f7' }}>
                <CiLogout className='fs-3 me-2' /> Logout
              </button>
            </div>
          </div>

          <h1 className='mt-5'>Manage Transactions</h1>
          <p>Welcome to the transaction management section. Review your transactions below.</p>
          {error && <p className="text-danger">{error}</p>}
          <MDBTable align='middle'>
            <MDBTableHead>
              <tr className='table-dark'>
                <th scope='col'>#</th>
                <th scope='col'>Transaction ID</th>
                <th scope='col'>Amount</th>
                <th scope='col'>Date</th>
                <th scope='col'>Status</th>
                <th scope='col'>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={transaction._id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{transaction._id}</td>
                    <td>{transaction.amount}</td>
                    <td>{new Date(transaction.date).toLocaleString()}</td>
                    <td>
                      <MDBBadge color={transaction.type === 'deposit' ? 'success' : 'danger'} pill>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </MDBBadge>
                    </td>
                    <td>Actions</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='6'>No transactions found.</td>
                </tr>
              )}
            </MDBTableBody>
          </MDBTable>
        </main>
      </div>
    </div>
  );
}

export default Transaction;