import React, { useState } from 'react'
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';


const Profile = () => {
    const{userId} = useParams();
    const [files, setFiles] = useState([]);
    const [uploadError, setUploadError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [createdPosts, setCreatedPosts] = useState([]);
    const urlPosts=`http://127.0.0.1:8000/users/${userId}/posts`;
    const urlUsers=`http://127.0.0.1:8000/users/`;
    const {data:postsData,loading:postsLoading,error:postsError}=useFetch(urlPosts);
    const {data:usersData,loading:usersLoading,error:usersError}=useFetch(urlUsers);
    const posts = [...createdPosts, ...(Array.isArray(postsData) ? postsData : [])];
    const users = Array.isArray(usersData) ? usersData : [];
    const user = users.find((currentUser) => currentUser.id === userId);
    const userName = user ? `${user.name} ${user.lastname}` : 'Profile';
    const loading = postsLoading || usersLoading;
    const error = postsError || usersError;

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
        setUploadError(null);
    }

    const submitPost = async (e) => {
        e.preventDefault();

        if (files.length === 0) {
            setUploadError("Selecciona una imagen.");
            return;
        }

        const formData = new FormData();
        formData.append('description', 'NEW POST!!!');
        formData.append('user_id', userId);

        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            setUploading(true);
            setUploadError(null);

            const res = await fetch('http://127.0.0.1:8000/posts/', {
                method: 'POST',
                body: formData,
            });
            const post = await res.json();

            if (!res.ok) {
                const detail = Array.isArray(post.detail) ? post.detail[0]?.msg : post.detail;
                throw new Error(detail || "No se pudo crear el post.");
            }

            setCreatedPosts((currentPosts) => [post, ...currentPosts]);
            setFiles([]);
            e.target.reset();
        } catch (error) {
            setUploadError(error.message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className='mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col bg-gray-100'>
            <div className='border-b border-gray-200 bg-white px-5 py-4'>
                <div className='text-lg font-semibold text-gray-950'>{userName}</div>
                <div className='mt-3 flex gap-6 text-sm'>
                    <div>
                        <div className='font-semibold text-gray-950'>0</div>
                        <div className='text-gray-500'>Followers</div>
                    </div>
                    <div>
                        <div className='font-semibold text-gray-950'>{posts.length}</div>
                        <div className='text-gray-500'>Posts</div>
                    </div>
                </div>
            </div>
            <div className='flex-1 space-y-3 p-5'>
                {loading && <div className='text-sm text-gray-500'>Loading...</div>}
                {error && <div className='text-sm text-gray-700'>Error: {error}</div>}
                {uploadError && <div className='text-sm text-gray-700'>Error: {uploadError}</div>}
                {!loading && !error && posts.length === 0 && (
                    <div className='text-sm text-gray-500'>No posts yet.</div>
                )}
                {posts.map((post)=>(
                    <div key={post.id} className='rounded-md border border-gray-200 bg-white p-4 text-sm leading-6 text-gray-800 shadow-sm'>
                        {post.images?.[0]?.url && (
                            <img
                                className='mb-3 aspect-square w-full rounded-md object-cover'
                                src={post.images[0].url}
                                alt=""
                            />
                        )}
                        {post.description}
                    </div>
                ))}
            </div>
            <form className='border-t border-gray-200 bg-white p-5' onSubmit={submitPost}>
                <input
                    className='block w-full text-sm text-gray-600'
                    type='file'
                    multiple
                    accept='image/*'
                    onChange={handleFileChange}
                />
                <div className='mt-3 flex items-center justify-between'>
                    <span className='text-xs text-gray-500'>{files.length} files selected</span>
                    <input
                        className='rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:bg-gray-400'
                        disabled={uploading}
                        type="submit"
                        value={uploading ? "Uploading..." : "Send File"}
                    />
                </div>
            </form>
        </div>
        
    )
}
    


export default Profile;
