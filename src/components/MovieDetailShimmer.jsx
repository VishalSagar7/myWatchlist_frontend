import React from 'react'

const MovieDetailShimmer = () => {
    return (
        <div className='h-[100vh] w-full bg-gray-100 flex'>
            <div className='h-full w-[30%] flex justify-center items-center rounded'>
                <div className='h-[450px] w-[300px] bg-gray-300 rounded'>

                </div>
            </div>
            <div className='h-full w-[70%] pl-[40px] flex flex-col gap-[20px] pt-[80px]'>
                <div className='h-[40px] w-[600px] bg-gray-300 rounded'></div>
                <div className='h-[40px] w-[500px] bg-gray-300 rounded'></div>
                <div className='h-[80px] w-[700px] bg-gray-300 rounded'></div>
                <div className='h-[40px] w-[400px] bg-gray-300 rounded'></div>
                <div className='h-[40px] w-[600px] bg-gray-300 rounded'></div>
                <div className='h-[40px] w-[400px] bg-gray-300 rounded'></div>
            </div>
        </div>
    )
}

export default MovieDetailShimmer
