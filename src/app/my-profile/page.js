'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation

import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '@/redux/slice/authSlice';

import { logout } from '@/redux/slice/authSlice';
import Breadcrumb from '@/components/layout/breadcrumb';

const MyProfile = () => {
    const dispatch = useDispatch();

    const router = useRouter();
    const customer = useSelector((state) => state.auth.customer);
    console.log(customer);
    const token = useSelector((state) => state.auth.token); // Get token from the Redux store

    useEffect(() => {
        if (!token) {
            // Redirect to the "My Account" page if the token is not set
            router.push('/my-account');
        } else {
            // Fetch the profile if the token is present
            dispatch(fetchProfile());
        }
    }, [dispatch, token, router]);
 
    const handleLogout = (e) => {
        e.preventDefault();
          dispatch(logout());
      };

    return (
        <div>
        {customer ? (
          
          <>
    <Breadcrumb pageName="My Profile"/>
    <div className="site-section">
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h2 className="display-3 text-black">Welcome, {customer.username}</h2>
          <p className="lead mb-5"></p>
          <button className="btn btn-sm btn-primary" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  </div>
  </>
            // <p>Hello, {customer.username}</p> 
            // <p onClick={handleLogout}>Logout</p>
          
        ) : (
          <p>Loading profile...</p> 
        )}
      </div>
    );
};

export default MyProfile;
