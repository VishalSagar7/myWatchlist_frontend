import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { BASE_URL } from '../helper';
import MovieCardofWatchlistPage from './MovieCardofWatchlistPage';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import MovieCardShimmer from './MovieCardShimmer';

const WatchlistPage = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [watchlistArray, setWatchlistArray] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/profile`, {
          credentials: 'include', // Ensure cookies are included in the request
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserInfo(data?.user);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching profile:', err);
      }
    };

    fetchData();
  }, [setUserInfo]);

  useEffect(() => {
    if (!userInfo?.email) {
      return;
    }

    const getWatchList = async () => {
      try {
        console.log("Getting watchlist data");

        const response = await fetch(`${BASE_URL}/getwatchlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ useremail: userInfo.email }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data.watchlistArray);
        setWatchlistArray(data.watchlistArray);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    getWatchList();
  }, [userInfo?.email]);

  console.log(watchlistArray);


  if (!watchlistArray) {
    return (<div className=' bg-gray-100 h-[100vh] px-[100px] pt-[40px]'>

      <div className='h-[40px] w-[400px] rounded bg-gray-300'>
      </div>

      <div className='flex flex-wrap justify-between gap-[40px] pt-[40px] '>
        <MovieCardShimmer />
        <MovieCardShimmer />
        <MovieCardShimmer />
        <MovieCardShimmer />
        <MovieCardShimmer />
        <MovieCardShimmer />
        <MovieCardShimmer />
        <MovieCardShimmer />
      </div>


    </div>)
  }



  return (
    <div className=' min-h-[100vh] w-full px-[50px] pt-[20px] bg-gray-200'>
      <Link to="/"><Tooltip title="go to home"><button className='bg-white px-[5px] rounded font-medium z-30 transform duration-150 hover:bg-gray-200'>{`< Go back`}</button></Tooltip></Link>
      <h1 className='text-2xl text-gray-800 mt-[10px] font-bold'>{`Your Watchlist`}</h1>

      {(watchlistArray.length == 0) && (
        <div className='h-[100vh] w-full flex justify-center'>
          <h1 className='mt-[200px] text-3xl font-semibold'>Your wathclist is empty</h1>
        </div>
      )}

      <div className=' flex mt-[20px] flex-wrap justify-left gap-[30px]'>
        {
          watchlistArray.map((movie) =>
            <MovieCardofWatchlistPage key={movie.id} data={movie} />
          )
        }
      </div>
    </div>
  );
};

export default WatchlistPage;
