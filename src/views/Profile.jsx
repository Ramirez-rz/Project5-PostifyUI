import React from 'react'
import { useParams } from 'react-router';
import { FiHome } from "react-icons/fi";
import useFetch from '../hooks/useFetch';


const Profile = () => {
    const{userId} = useParams();
    const urlPosts=`http://localhost:8000/users/${userId}/posts`;
    console.log({urlPosts});
    const {data,loading,error}=useFetch(urlPosts);
    console.log(userId)
    return (
        <div className='flex flex-col'>
            <div className='h-[20px] bg-blue-200 flex gap-20'>
                <div>Andres</div>
                <div>Followers</div>
                <div>Posts</div>
            </div>
            <div className='h-[640px] bg-gray-500'>
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
                {data.map((post)=>(
                    <div key={post.id} className='h-[100px] w-[200px] bg-orange-300 p-2'>
                        {post.description}
                    </div>
                ))}
            </div>
            <div className='h-[50px] bg-blue-100'>
                <FiHome className='w-10 h-10'/>
            </div>
        </div>
        
    )
}
    


export default Profile;
