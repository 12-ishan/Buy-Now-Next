'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation

import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '@/redux/slice/authSlice';

import { logout } from '@/redux/slice/authSlice';

const MyProfile = () => {
    const dispatch = useDispatch();

    const router = useRouter();
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

          hello this is a restricted page... 
          <p onClick={handleLogout}>Logout</p>

        </div>
    );
};

export default MyProfile;
