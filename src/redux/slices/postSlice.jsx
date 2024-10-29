import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { HttpStatusCode } from 'axios'

const BASE_URL = "http://192.168.1.36:8080/api/v1";



const initialState = {
    token: localStorage.getItem("bearerToken") || '',
    page: 0,
    totalPages: 0,
    posts: [],
    loading: false,
    error: null,
};

export const getAll = createAsyncThunk(
    "getAll",
    async (_, { getState }) => {

        const { post: { page, size = 21 } } = getState();

        // API isteğini page ve size ile gönderiyoruz
        const response = await axios.get(`${BASE_URL}/posts`, {
            params: {
                page,
                size
            }
        });
        console.log(response)
        if (response.status === HttpStatusCode.Ok) {
            console.log(response)
            return response;
        }
        throw new Error(response.status)
    }
);

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPage: (state, action) => {
            console.log(action.payload)
            state.page = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.loading = false
                state.posts = action.payload.data.content
                console.log(state.posts)
                state.totalPages = action.payload.data.totalPages - 1
            })
            .addCase(getAll.rejected, (state, action) => {
                state.loading = false
                state.error = true
            });
    }
});

export const { setPage } = postSlice.actions;

export default postSlice.reducer;
