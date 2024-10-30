import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { HttpStatusCode } from 'axios'

const BASE_URL = "http://localhost:8080/api/v1";



const initialState = {
    token: localStorage.getItem("token"),
    isAuth: false,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, { "username": username, "password": password });
            if (response.status === HttpStatusCode.Ok) {
                return response.data;
            }
            return rejectWithValue("Login failed");
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
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
                state.token = action.payload;
                state.isAuth = true;
                localStorage.setItem('token', state.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
