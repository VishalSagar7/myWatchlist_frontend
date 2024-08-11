import React from 'react'
import MovieCardShimmer from './MovieCardShimmer';

const HomeShimmer = () => {
    return (
        <div className='w-full bg-gray-100 pt-[20px] px-[100px]'>
            <div className=' w-full h-[280px] bg-gray-300 mx-[auto] rounded '>

            </div>
            <div className='h-[100vh] w-full flex justify-between mt-[30px] flex-wrap'>
            
                <MovieCardShimmer/>
                <MovieCardShimmer/>
                <MovieCardShimmer/>
                <MovieCardShimmer/>
                <MovieCardShimmer/>
                <MovieCardShimmer/>
                <MovieCardShimmer/>
                <MovieCardShimmer/>
                <MovieCardShimmer/>
                <MovieCardShimmer/>
            </div>
        </div>
    )
}

export default HomeShimmer;
