import React, { useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBBadge } from 'mdb-react-ui-kit';
import { adminAllUserAPI } from '../services/allAPI';

function AdminUser() {
  const [adminUsers, setAdminUsers] = useState([]);
  const [searchKey, setSearchKey] = useState('');
const navigate=useNavigate()
  const fetchAdminUsers = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      };
      try {
        const result = await adminAllUserAPI(searchKey, reqHeader);
        setAdminUsers(result.data);
      } catch (error) {
        console.error("Error fetching admin users:", error);
      }
    }
  };
  const handleLogout = () => {
    
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    
    navigate('/');
  };
  useEffect(() => {
    fetchAdminUsers();
  }, [searchKey]);

  return (
    <div className="container-fluid admin-dashboard">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block sidebar" style={{ backgroundColor: '#f1f2f7', height: '650px' }}>
          <div className="sidebar-sticky">
            <h3 className="sidebar-header m-5">MY bank</h3>
            <ul className="nav flex-column sidebar-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link rounded" style={{ backgroundColor: '#e4e7f5' }} to="/admin/users">Manage Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/transactions">Manage Transactions</Link>
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

          <h1 className='mt-5'>User Management</h1>
          <p>Here you can activate or deactivate user accounts.</p>

          <MDBTable align='middle'>
            <MDBTableHead>
              <tr className='table-dark'>
                <th scope='col'>#</th>
                <th scope='col'>User ID</th>
                <th scope='col'>Username</th>
                <th scope='col'>Email</th>
                
                <th scope='col'>Status</th>
                <th scope='col'>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {adminUsers.map((user, index) => (
                <tr key={user._id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  
                  <td>
                    <MDBBadge color={user.isActive ? 'danger' : 'success'} pill>
                      {user.isActive ? 'Inactive' : 'Active'}
                    </MDBBadge>
                  </td>
                  <td>
                    <MDBBtn color={user.isActive ? 'success' : 'danger'} size='sm'>
                      {user.isActive ? 'Activate' : 'Deactivate'}
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>

          {/* <MDBBtn color='success' className='mt-3'>Add New User</MDBBtn> */}
        </main>
      </div>
    </div>
  );
}

export default AdminUser;
