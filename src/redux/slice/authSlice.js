import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


export const login = createAsyncThunk('auth/login', async (credentials) => {
    try{
       
    const response = await axios.post('http://127.0.0.1:8000/api/v1/customer-login', credentials, { withCredentials: true });
    return response.data;
    }
    catch(error){
        if (error.response) {
            console.error('Failed to login:', error.response.status, error.response.data);
        } else {
            console.error('Failed to login:', error.message);
        }
        throw error;
    }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/my-profile', {
            withCredentials: true,
        });
        console.log(response);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Failed to fetch profile:', error.response.status, error.response.data);
        } else {
            console.error('Failed to fetch profile:', error.message);
        }
        throw error;
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default authSlice.reducer;
