'use client'

import React, { useEffect } from 'react';

import Breadcrumb from '@/components/layout/breadcrumb';
import RegisterForm from '@/components/RegisterForm';
import LoginForm from '@/components/LoginForm';



function MyAccount() {
//   const token = useSelector((state) => state.login.token);
//   console.log(token);


// useEffect(() => {
//     if (token) {
//       dispatch(loginCustomer());
//     }
//   }, [token]);

  return (
    <>
      <Breadcrumb pageName="My Account" />
      <div className="site-section">
        <div className="container">
          <div className="row">
           
                <RegisterForm />
                <LoginForm />
             
            
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
