
import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
function Header() {
  return (
    <MDBNavbar light bgColor='light'>
    <MDBContainer fluid>
      <MDBNavbarBrand href='#'>
        <img
          src='https://media.istockphoto.com/id/1215256045/vector/safe-payment-logo-template-designs-vector-illustration.jpg?s=612x612&w=0&k=20&c=22EA9Y3-gToqirb3PlgCqjnoprrgXyPAvO4_CZmT2Jc='
          height='90'
          alt=''
          loading='lazy'
        />
        MYbank
      </MDBNavbarBrand>
    </MDBContainer>
  </MDBNavbar>
  )
}

export default Header