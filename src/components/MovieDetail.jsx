import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Tooltip from '@mui/material/Tooltip';
import { UserContext } from '../context/UserContext';
import { BASE_URL } from '../helper';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import MovieDetailShimmer from './MovieDetailShimmer';

const apiKey = '52c1b4e3926b7e8672736ab2872b2812';

const MovieDetail = () => {

    const [movieDetail, setMovieDetail] = useState(null);
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(null);
    const [flag, setFlag] = useState(false);

    const [trailorKey, setTrailorKey] = useState(null);
    const [trailorKey2, setTrailorKey2] = useState(null);


    const { id } = useParams();


    async function getDetails() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
            const data = await response.json();
            setMovieDetail(data);
            // console.log(data);

        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }

    async function getVideo() {

        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
        const data = await response.json();
        // console.log(data.results[0].key);
        setTrailorKey(data.results[0].key);
        setTrailorKey2(data.results[1].key);

    }


    useEffect(() => {
        getDetails();

        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/profile`, {
                    credentials: 'include', // Ensure cookies are included in the request
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // console.log(data);

                setUserInfo(data?.user);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching profile:', err);
            }
        };

        fetchData();
        getVideo();

    }, [id]);

    // console.log(userInfo);
    const useremail = userInfo.email;
    // console.log(useremail);



    if (!movieDetail) {
        return <MovieDetailShimmer />; // Optionally, you can add a loading spinner here
    }

    const Yeararray = movieDetail?.release_date.split('-');
    // console.log(Yeararray);
    const Year = Yeararray[0];

    const genraList = movieDetail?.genres.map((genre) => genre.name);
    const genraString = genraList.join(',');

    const convertMinutesToHours = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const minutesRemaining = minutes % 60;
        return `${hours}h ${minutesRemaining}m`;
    };

    const totalRuntime = convertMinutesToHours(movieDetail.runtime);


    const convertRating = (rating) => {
        return Math.round(rating * 10);
    };
    const rating = movieDetail.vote_average;
    const convertedRating = convertRating(rating);


    // console.log(movieDetail);
    // console.log(userInfo);



    async function AddmovietoWatchlist() {

        setFlag(true);

        try {
            console.log('Add to watchlist clicked');

            const response = await fetch(`${BASE_URL}/addtowatchlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure the server can handle JSON payload
                },
                credentials: 'include',
                body: JSON.stringify({
                    useremail: useremail,
                    moviedetail: movieDetail,
                }),
            });

            const data = await response.json(); // Parse JSON response if applicable
            // console.log('Server response:', data);
            if (data.success) {
                setAlert({ type: 'success', message: 'Movie added to your watchlist' });
            }

            if (!response.ok) {
                setAlert({ type: 'error', message: 'This movie is already in your watchlilist' });
                throw new Error(`HTTP error! Status: ${response.status}`);

            }


        } catch (error) {
            console.error('Error adding to watchlist:', error);
        }
    }


    // console.log(trailorKey);











    return (
        <>
            <div className='h-[110vh] lg:h-[100vh] w-full bg-sky-400 relative'>


                <div
                    className='h-full w-full   lg:flex relative'
                    style={{
                        backgroundImage: movieDetail?.poster_path ? `url(https://image.tmdb.org/t/p/w500${movieDetail.poster_path})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    {alert && (
                        <Alert
                            sx={{ position: 'absolute', top: '10px', right: '100px', zIndex: '20' }}
                            icon={alert.type === 'success' ? <CheckIcon fontSize="inherit" /> : <ErrorIcon fontSize="inherit" />}
                            severity={alert.type}
                            onClose={() => setAlert(null)} // Optional: Close the alert
                        >
                            {alert.message}
                        </Alert>
                    )}

                    <Link to="/"><Tooltip title="go to home"><button className='bg-white absolute top-[15px] left-[15px] lg:top-[40px] lg:left-[75px] px-[5px] rounded font-medium z-30 transform duration-150 hover:bg-gray-200'>{`< Go back`}</button></Tooltip></Link>

                    <div className='h-[50%] mx-auto lg:h-full w-[300px] lg:w-[30%] lg:z-10 flex justify-center items-center'>
                        <img className='h-[70%] z-20 lg:w-[70%] object-cover object-center rounded' src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} />
                    </div>
                    <div className='h-[40%] lg:h-full w-full lg:w-[70%] z-50 lg:z-20 lg:pt-[60px] mt-[-50px] lg:mt-0 px-[30px] lg:px-[40px]'>
                        <h1 className=' text-white text-[35px] font-bold'>{movieDetail?.title} <span className='text-gray-300 font-thin'>({Year})</span></h1>
                        <h1 className=' text-gray-100 '>
                            <span className='text-lg'>{movieDetail?.release_date}</span>
                            <span className=' text-lg ml-[5px]'>({movieDetail.original_language})</span> <span className='text-lg font-extrabold ml-[5px] mr-[10px]'>.</span>
                            <span className='text-lg '>{genraString}</span>  <span className='text-lg font-extrabold ml-[5px] mr-[10px]'>.</span>
                            <span className='text-lg '>{totalRuntime} </span>
                        </h1>

                        <h1 className='text-lg mt-[10px] text-white'>{convertedRating}% people liked it</h1>

                        <h1 className='text-white mt-[10px] text-lg'><span className='font-bold'>Overview : </span><p>{movieDetail.overview}</p></h1>

                        {useremail && (
                            <div className='flex w-[120px] mt-[10px] justify-between items-center'>
                                <Tooltip title="Add to favourites"><button><FavoriteIcon sx={{ fontSize: '50px', color: 'white' }} /></button></Tooltip>
                                {(flag == false) && (
                                    <Tooltip onClick={() => AddmovietoWatchlist()} title='Add to watchlist'><button><BookmarkIcon sx={{ fontSize: '50px', color: 'white' }} /></button></Tooltip>
                                )}
                                {(flag) && (
                                    <Tooltip onClick={() => AddmovietoWatchlist()} title='Add to watchlist'><button><BookmarkIcon sx={{ fontSize: '50px', color: 'gray' }} /></button></Tooltip>
                                )}
                            </div>
                        )}


                    </div>

                </div>

                <div className=' absolute inset-0 z-1' style={{ background: 'rgba(0, 0, 0, 0.9)' }}>

                </div>

            </div>

            <div className='h-auto w-full bg-black p-[30px] flex justify-between'>

                <div className='w-full lg:h-[700px] h-[400px] lg:w-[1000px] mx-auto'>
                    <iframe
                        className='w-full h-full rounded'
                        src={`https://www.youtube.com/embed/${trailorKey}?autoplay=1`}
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                    ></iframe>
                </div>

            </div>
        </>
    );
};

export default MovieDetail;
