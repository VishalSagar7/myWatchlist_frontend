import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { BASE_URL } from '../helper'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const Header = (params) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const searchQuery = params.searchQuery
    const setSearchQuery = params.setSearchQuery
    const getDetails = params.getDetails
    const [error, setError] = useState(null);
    const { userInfo, setUserInfo } = useContext(UserContext);

    // console.log(searchQuery);


    function handleOnchange(e) {
        setSearchQuery(e.target.value)
        getDetails(searchQuery);
    }


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
                setUserInfo(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching profile:', err);
            }
        };

        fetchData();
    }, []);

    const username = userInfo?.user?.username;

    // console.log(username);

    let fname;


    if (username) {
        const firstname = username.split(' ');
        // console.log(firstname);
        fname = firstname[0];
        // console.log(fname);

    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const email = userInfo?.user?.email
    // console.log(email);


    const handlelogout = async () => {

        fetch(`${BASE_URL}/logout`, {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);

    }



    return (
        <div className='h-[80px] w-full bg-[rgb(3,37,65)] flex justify-between items-center px-[10px] lg:px-[100px]'>

            <h1 className='text-xl hidden lg:block text-white font-bold'>My WatchList</h1>

            <div className='lg:w-[300px]'>
                <input
                    className='w-full h-[30px] pl-[10px] rounded'
                    placeholder='Search movies...'
                    type='text'
                    value={searchQuery}
                    onChange={(e) => handleOnchange(e)}
                />
            </div>

            {username && (
                <div className='flex w-[250px] justify-between items-center'>
                    <Link to="/watchlist"><h1 className='text-white font-semibold text-sm ml-[20px] lg:mx-0 lg:text-lg cursor-pointer transition duration-100 hover:text-sky-500'>{`${fname}'s Watchlist`}</h1></Link>
                    <Tooltip title="Account"><AccountCircleIcon onClick={handleClick} sx={{ fontSize: '35px', color: 'white' }} /></Tooltip>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                            marginTop: '2px',

                        }}
                    >
                        <MenuItem onClick={handleClose}>{`${username}`}</MenuItem>
                        <MenuItem onClick={handleClose}>{`${email}`}</MenuItem>
                        <MenuItem onClick={() => handlelogout()}>Logout</MenuItem>
                    </Menu>
                </div>
            )}


            {!username && (
                <div className='w-[200px] text-white flex justify-between items-center'>
                    <Link to='/login'><h1 className='text-xl font-semibold cursor-pointer'>Login</h1></Link>
                    <Link to='/signup'><h1 className='text-xl font-semibold cursor-pointer'>Register</h1></Link>
                </div>
            )}
        </div>
    )
}

export default Header;
