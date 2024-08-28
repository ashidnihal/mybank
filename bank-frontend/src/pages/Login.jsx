import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginAPI, registerAPI } from '../services/allAPI';

function Login({ register }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    accountNumber: "" // Added this field for registration
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!userData.username || !userData.email || !userData.password || !userData.accountNumber) {
      Swal.fire({
        title: 'Warning',
        text: 'Please fill all the fields',
        icon: 'warning',
        confirmButtonText: 'Back'
      });
    } else {
      try {
        const result = await registerAPI(userData);
        if (result.status === 200) {
          Swal.fire({
            title: 'Success',
            text: 'User Registered',
            icon: 'success',
            confirmButtonText: 'Back'
          });
          setUserData({
            username: "",
            email: "",
            password: "",
            accountNumber: ""
          });
          navigate('/');
        } else {
          Swal.fire({
            title: 'Error',
            text: result.response?.data || 'An error occurred',
            icon: 'error',
            confirmButtonText: 'Back'
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'An error occurred during registration',
          icon: 'error',
          confirmButtonText: 'Back'
        });
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      Swal.fire({
        title: 'Warning',
        text: 'Please fill all the fields',
        icon: 'warning',
        confirmButtonText: 'Back'
      });
    } else {
      try {
        const result = await loginAPI(userData);
        if (result.status === 200) {
          sessionStorage.setItem("username", result.data.existingUser.username);
          sessionStorage.setItem("token", result.data.token);
          Swal.fire({
            title: 'Success',
            text: 'Login Success',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          setUserData({
            email: "",
            password: ""
          });
          if (userData.email === "admin@gmail.com") {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        } else {
          Swal.fire({
            title: 'Error',
            text: result.response?.data || 'An error occurred',
            icon: 'error',
            confirmButtonText: 'Back'
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'An error occurred during login',
          icon: 'error',
          confirmButtonText: 'Back'
        });
      }
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage
              src='https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1724760038~exp=1724763638~hmac=36fb5f7289e06afda4d69c09f7c3738587cf7f6687657bc10a41fa3f224f7ce1&w=740'
              alt="login form"
              className='rounded-start w-100'
            />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <img
                  src="https://media.istockphoto.com/id/1215256045/vector/safe-payment-logo-template-designs-vector-illustration.jpg?s=612x612&w=0&k=20&c=22EA9Y3-gToqirb3PlgCqjnoprrgXyPAvO4_CZmT2Jc="
                  alt="Logo"
                  style={{ width: '50px', height: '50px', marginRight: '12px' }}
                />
                <span className="h1 fw-bold mb-0">MY bank</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Sign {register ? 'up' : 'in'} to your account
              </h5>

              {register && (
                <>
                  <MDBInput
                    onChange={e => setUserData({ ...userData, accountNumber: e.target.value })}
                    value={userData.accountNumber}
                    wrapperClass='mb-4'
                    label='Account Number'
                    id='accountNumber'
                    type='text'
                    size="lg"
                  />
                  <MDBInput
                    onChange={e => setUserData({ ...userData, username: e.target.value })}
                    value={userData.username}
                    wrapperClass='mb-4'
                    label='Username'
                    id='username'
                    type='text'
                    size="lg"
                  />
                </>
              )}

              <MDBInput
                onChange={e => setUserData({ ...userData, email: e.target.value })}
                value={userData.email}
                wrapperClass='mb-4'
                label='Email address'
                id='email'
                type='email'
                size="lg"
              />

              <MDBInput
                onChange={e => setUserData({ ...userData, password: e.target.value })}
                value={userData.password}
                wrapperClass='mb-4'
                label='Password'
                id='password'
                type='password'
                size="lg"
              />

              <MDBBtn
                className="mb-4 px-5"
                color='dark'
                size='lg'
                onClick={register ? handleRegister : handleLogin}
              >
                {register ? 'Register' : 'Login'}
              </MDBBtn>

              {!register && (
                <a className="small text-muted" href="#!">Forgot password?</a>
              )}

              {register ? (
                <div>
                  <p className="mt-3">Already Registered?<Link to={'/'}><a href="#!" className="text-dark-50 fw-bold">Login here</a></Link></p>
                </div>
              ) : (
                <div>
                  <p className="mt-3">Don't have an account?<Link to={'/register'}><a href="#!" className="text-dark-50 fw-bold">Sign Up</a></Link></p>
                </div>
              )}

              <div className='d-flex flex-row justify-content-start mt-3'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
