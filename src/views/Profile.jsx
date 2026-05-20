import React from 'react'
import { Link, useParams } from 'react-router';
import { FiHome } from "react-icons/fi";
import useFetch from '../hooks/useFetch';


const Profile = () => {
    const{userId} = useParams();
    const urlPosts=`http://localhost:8000/users/${userId}/posts`;
    const urlUsers=`http://localhost:8000/users/`;
    const {data:postsData,loading:postsLoading,error:postsError}=useFetch(urlPosts);
    const {data:usersData,loading:usersLoading,error:usersError}=useFetch(urlUsers);
    const posts = Array.isArray(postsData) ? postsData : [];
    const users = Array.isArray(usersData) ? usersData : [];
    const user = users.find((currentUser) => currentUser.id === userId);
    const userName = user ? `${user.name} ${user.lastname}` : 'Profile';
    const loading = postsLoading || usersLoading;
    const error = postsError || usersError;

    return (
        <div className='mx-auto flex min-h-[calc(100vh-48px)] max-w-md flex-col bg-white'>
            <div className='flex items-center justify-between border-b border-gray-300 px-4 py-3 text-sm'>
                <div className='font-semibold'>{userName}</div>
                <div className='text-gray-500'>0 Followers</div>
                <div className='text-gray-500'>{posts.length} Posts</div>
            </div>
            <div className='flex-1 space-y-3 bg-gray-100 p-4'>
                {loading && <div className='text-sm text-gray-500'>Loading...</div>}
                {error && <div className='text-sm text-gray-700'>Error: {error}</div>}
                {!loading && !error && posts.length === 0 && (
                    <div className='text-sm text-gray-500'>No posts yet.</div>
                )}
                {posts.map((post)=>(
                    <div key={post.id} className='rounded border border-gray-300 bg-white p-3 text-sm shadow-sm'>
                        {post.description}
                    </div>
                ))}
            </div>
        </div>
        
    )
}
    


export default Profile;
