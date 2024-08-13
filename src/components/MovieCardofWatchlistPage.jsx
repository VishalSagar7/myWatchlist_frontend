
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCardofWatchlistPage = (props) => {
    // console.log(props.data);
    
    const { poster_path, title, release_date ,id } = props?.data || {};

    const defaultImage = "https://watchmovies123.cyou/images/noposter.jpg";
    const imageUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : defaultImage;

    // Extract the year from release_date
    const year = release_date ? release_date.split('-')[0] : '';

    // console.log(id);
    

    return (
        <Link to={`/moviedetailofwatchlist/${id}`}> 
            <div className='h-[450px]  w-[300px] lg:w-[200px] lg:h-auto p-[5px]  rounded  transition duration-300 hover:bg-gray-300'>
                <div className='h-[88%] w-full'>
                    <img
                        className='h-full rounded w-full object-cover'
                        src={imageUrl}
                        alt={title || 'Movie poster'}
                    />
                </div>
                <div className=' w-full flex items-center mt-[5px]'>
                    <h1 className='font-semibold text-md leading-5'>{title} <span>({year})</span></h1>
                </div>
            </div>
        </Link>
    );
}

export default MovieCardofWatchlistPage;

