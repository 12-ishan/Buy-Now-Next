import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const getCsrfToken = async () => {
    try {
      await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });
    } catch (error) {
      console.error('Error retrieving CSRF token:', error);
      throw error;
    }
  };

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

// export const login = createAsyncThunk(
//     'auth/loginUser',
//     async (credentials, { rejectWithValue }) => {
//       try {
//         const response = await axios.post('http://127.0.0.1:8000/api/v1/customer-login', credentials);
//         const token = response.data.access_token;
//         // Set the token in Axios headers
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         return { user: response.data.user, token };
//       } catch (err) {
//         if (!err.response) {
//           throw err;
//         }
//         return rejectWithValue(err.response.data);
//       }
//     }
//   );


// export const login = createAsyncThunk(
//     'auth/loginUser',
//     async (credentials, { rejectWithValue }) => {
//       try {
//         const response = await axios.post('http://127.0.0.1:8000/api/v1/customer-login', credentials);
//         return response.data;
//       } catch (err) {
//         if (!err.response) {
//           throw err;
//         }
//         return rejectWithValue(err.response.data);
//       }
//     }
//   );

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
       // token: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.user = action.payload.user;
                // console.log(state.user);
                // state.token = action.payload.token;
                // console.log(state.token);
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
