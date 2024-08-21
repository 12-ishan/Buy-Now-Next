'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '@/redux/slice/authSlice';

const MyProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    return (
        <div>
            {user ? <h1>Profile {user.name}</h1> : <div>Loading...</div>}
        </div>
    );
};

export default MyProfile;
