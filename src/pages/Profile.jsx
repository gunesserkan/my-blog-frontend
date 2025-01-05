import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../redux/slices/authSlice';

function Profile() {
    const dispatch = useDispatch();
    const { username } = useSelector((store) => store.auth.user);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        dispatch(fetchUserData(username)).then((action) => {
            if (action.payload) {
                setUserData(action.payload);
            }
        });
    }, [dispatch, username]);

    return (
        <div>
            <h1>User Profile</h1>
            {userData ? (
                <div>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <h2>Posts</h2>
                    <ul>
                        {userData.posts && userData.posts.length > 0 ? (
                            userData.posts.map((post) => (
                                <li key={post.id}>
                                    <h3>{post.title}</h3>
                                    <p>{post.content}</p>
                                </li>
                            ))
                        ) : (
                            <p>No posts available.</p>
                        )}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Profile;
