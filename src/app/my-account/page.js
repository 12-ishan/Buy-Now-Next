'use client'

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation'; // Import from next/navigation

import Breadcrumb from '@/components/layout/breadcrumb';
import RegisterForm from '@/components/RegisterForm';
import LoginForm from '@/components/LoginForm';

import { useSelector } from 'react-redux';



function MyAccount() {
  const router = useRouter();

const token = useSelector((state) => state.auth.token);


useEffect(() => {
    if (token) {
      router.push('/my-profile'); // Redirect to the profile page
    }
  }, [token, router]);

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
