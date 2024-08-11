import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = (props) => {
    // console.log(props.data);
    
    const { poster_path, title, release_date ,id } = props?.data || {};

    const defaultImage = "https://watchmovies123.cyou/images/noposter.jpg";
    const imageUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : defaultImage;

    // Extract the year from release_date
    const year = release_date ? release_date.split('-')[0] : '';

    return (
        <Link to={`/moviedetail/${id}`}> 
            <div className='h-[450px] w-[250px] p-[5px] rounded hover:bg-gray-300  transition decoration-neutral-300 hover:scale-[101%]'>
                <div className='h-[85%] w-full'>
                    <img
                        className='h-full rounded w-full object-cover'
                        src={imageUrl}
                        alt={title || 'Movie poster'}
                    />
                </div>
                <div className=' w-full flex items-center mt-[5px]'>
                    <h1 className='font-semibold text-lg leading-5'>{title} <span>({year})</span></h1>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;
