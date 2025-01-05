import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { HttpStatusCode } from 'axios'
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:8080/api/v1";

const initialState = {
    token: localStorage.getItem('token'),
    isAuth: localStorage.getItem('isAuth'),
    loading: false,
    error: null,
    user: {
        id: localStorage.getItem('userId'),
        username: localStorage.getItem('username')
    },
};

export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, { "username": username, "password": password });
            if (response.status === HttpStatusCode.Ok) {
                return {
                    token: response.headers['authorization'].split(' ')[1],
                    user: {
                        id: response.data.id,
                        username: response.data.username,
                    },
                };
            }
            return rejectWithValue("Login failed");
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async ({ name, username, password, email }, { rejectWithValue }) => {
        try {
            const response = await axios.
                post(`${BASE_URL}/auth/register`,
                    {
                        "name": name,
                        "username": username,
                        "password": password,
                        "email": email,
                        "authorities": ["ROLE_USER"]
                    });
            if (response.status === HttpStatusCode.Created) {
                return response.headers;
            }
            return rejectWithValue("registration request failed");
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

export const fetchUserData = createAsyncThunk(
    "auth/fetchUserData",
    async (username, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const token = state.auth.token;
            const response = await axios.get(`${BASE_URL}/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred while fetching user data");
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            console.log("logout authslice")
            state.token = ''
            state.isAuth = false;
            localStorage.removeItem("token")
            console.log(localStorage.getItem("token"))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user.id = action.payload.user.id;
                state.user.username = action.payload.user.username;
                state.isAuth = true;
                localStorage.setItem('isAuth', state.isAuth)
                localStorage.setItem('userId', state.user.id)
                localStorage.setItem('username', state.user.username)
                localStorage.setItem('token', state.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //registration
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload['authorization'].split(' ')[1];
                state.isAuth = true;
                localStorage.setItem('token', state.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                console.log("istek çalıştı")
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                console.log("hata oluştu istek reddedildi")
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
