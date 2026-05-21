import React from 'react'

const Home = () => {
    return(
        <div className='mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col bg-gray-100'>
            <div className='border-b border-gray-200 bg-white px-5 py-4'>
                <h1 className='text-lg font-semibold text-gray-950'>Home</h1>
                <p className='mt-1 text-sm text-gray-500'>Holaaaa!!! Bienvenido de nuevo</p>
            </div>
            <div className='flex-1 p-5'>
                <div className='rounded-md border border-gray-200 bg-white p-4 text-sm text-gray-500 shadow-sm'>
                    Mira lo nuevo aquí
                </div>
            </div>
        </div>
    )
}
    


export default Home
