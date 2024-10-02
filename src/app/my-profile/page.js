'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '@/redux/slice/authSlice';

import { logout } from '@/redux/slice/authSlice';
import Breadcrumb from '@/components/layout/breadcrumb';
import ProfileTabs from '@/components/layout/ProfileTabs';

const MyProfile = () => {
    const dispatch = useDispatch();

    const router = useRouter();
    const customer = useSelector((state) => state.auth.customer);
    const token = useSelector((state) => state.auth.token); 

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
         <ProfileTabs  handleLogout={handleLogout}/>
     </>
          
        ) : (
          <p>Loading profile...</p> 
        )}
      </div>
    );
};

export default MyProfile;
