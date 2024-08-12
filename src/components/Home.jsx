import React, { useEffect, useState, useCallback } from 'react';
import Header from './Header';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import HomeShimmer from './HomeShimmer';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [hasMore, setHasMore] = useState(true); // Track if more pages are available

    const apiKey = '52c1b4e3926b7e8672736ab2872b2812';

    const genreIds = {
        Action: 28,
        Adventure: 12,
        'Sci-fi': 878,
        Horror: 27,
    };

    // Function to fetch movies
    const fetchMovies = useCallback(async (page = 1, query = '', genreId = '') => {
        const url = genreId
            ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`
            : query
            ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`
            : `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=${page}`;

        try {
            setIsLoading(true); // Set loading state when fetching
            const response = await fetch(url);
            const data = await response.json();
            if (page === 1) {
                setMovieList(data.results); // Replace movieList with new results if on page 1
            } else {
                setMovieList((prevMovies) => [...prevMovies, ...data.results]); // Append new movies to the list
            }
            setHasMore(data.page < data.total_pages); // Check if more pages are available
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching movie data:', error);
            setIsLoading(false);
        }
    }, [apiKey]);

    // Initial data fetch
    useEffect(() => {
        fetchMovies(currentPage, searchQuery);
    }, [currentPage, searchQuery, fetchMovies]);

    // Scroll event handler
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200 && !isLoading) {
            if (hasMore) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll, isLoading, hasMore]);

    const handleGenreClick = (genre) => {
        const genreId = genreIds[genre];
        setCurrentPage(1); // Reset page number
        fetchMovies(1, searchQuery, genreId); // Fetch movies for the selected genre
    };

    const firstMovie = movieList[0];

    return (
        <div>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} getDetails={() => fetchMovies(1, searchQuery)} />
        

            <div className='h-[60px] w-full flex justify-start px-[5px] lg:px-[100px] gap-[20px] items-center'>
                <button className='h-[30px] w-[100px] border rounded bg-sky-500 text-white transition duration-200 hover:bg-sky-400 active:scale-[95%]' onClick={() => fetchMovies()}>Home</button>
                {Object.keys(genreIds).map((genre) => (
                    <button
                        key={genre}
                        className='h-[30px] w-[100px] border rounded bg-sky-500 text-white transition duration-200 hover:bg-sky-400 active:scale-[95%]'
                        onClick={() => handleGenreClick(genre)}
                    >
                        {genre}
                    </button>
                ))}
            </div>

            {isLoading && currentPage === 1 ? (
                <HomeShimmer />
            ) : (
                <>
                    {!searchQuery && firstMovie && (
                        <Link to={`/moviedetail/${firstMovie.id}`}>
                            <div className='rounded'>
                                <h1 className='text-2xl font-semibold mt-[10px] ml-[100px]'>Worldwide Trending!</h1>
                                <div className='parent h-[300px] mt-[10px] relative w-[88%] mx-auto bg-gray-400 rounded overflow-hidden transition'>
                                    <div
                                        className='h-full w-full rounded'
                                        style={{
                                            background: `url(https://image.tmdb.org/t/p/w500${firstMovie.backdrop_path})`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                    >
                                        <div className='relative z-10 p-[20px]'>
                                            <h1 className='text-white text-3xl lg:text-6xl font-bold'>{firstMovie.title}</h1>
                                            <h1 className='mt-[20px] text-gray-200 text-2xl lg:text-3xl font-semibold'>Currently trending #1</h1>
                                            <p className=' text-gray-300 mt-[20px] hover-show'>{firstMovie.overview}</p>
                                        </div>
                                    </div>

                                    <div className='absolute inset-0 z-1' style={{ background: 'rgba(0, 0, 0, 0.6)' }} />
                                </div>
                            </div>
                        </Link>
                    )}

                    <div className='h-auto p-[20px] mt-[10px] flex flex-wrap gap-[25px] justify-center'>
                        {movieList.length > 0 ? (
                            movieList.map((movie) => <MovieCard key={movie.id} data={movie} />)
                        ) : (
                            <p>No movies found</p>
                        )}
                    </div>

                    {isLoading && <p>Loading more movies...</p>}
                </>
            )}
        </div>
    );
}

export default Home;
