import React, { useEffect, useState } from 'react'
import '../css/MainContent.css'
import Post from './Post'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAll, setPage } from '../redux/slices/postSlice'
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';

function MainContent() {
    const dispatch = useDispatch();

    const posts = useSelector((store) => store.post.posts);
    const totalPages = useSelector((store) => store.post.totalPages);
    const page = useSelector((store) => store.post.page);

    useEffect(() => {
        dispatch(getAll(page));
    }, [dispatch, page]);

    const handleChange = (event, value) => {
        dispatch(setPage(value));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '100vh' }}>
            <Grid container spacing={2} justifyContent="center">
                {
                    posts && posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))
                }
            </Grid >
            <div style={{ margin: '10px' }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    showFirstButton
                    showLastButton
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                />
            </div>
        </div>
    );
}

export default MainContent