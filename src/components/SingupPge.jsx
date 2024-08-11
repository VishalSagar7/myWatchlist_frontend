import React, { useState } from 'react'
import { useFormik } from 'formik'
import { SignUpvalidation } from './YupValidations/YupValidations'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../helper'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

const initialStates = {
    username: '',
    email: '',
    password: 'password',
}

const SignupPage = () => {

    const [alert, setAlert] = useState(null);

    const Formik = useFormik({
        initialValues: initialStates,
        validationSchema: SignUpvalidation,
        onSubmit: async (values) => {
            // console.log(values);

            try {
                const response = await fetch(`${BASE_URL}/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values), // Ensure values are correctly formatted
                });


                if (!response.ok) {
                    setAlert({ type: 'error', message: 'Email already in use' });
                    throw new Error(`HTTP error! Status: ${response.status}`);

                }
                const data = await response.json();
                console.log('Success:', data);
                setAlert({ type: 'success', message: 'Account created successfully' });

            } catch (error) {
                console.error('Error:', error);
            }

        }
    });

    // console.log(Formik);

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = Formik


    return (
        <>
            <div className='flex justify-center items-center h-[100vh] relative w-[100vw]' style={{ background: `url("https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media/banner.jpg")` }}>

                {alert && (
                    <Alert
                        sx={{position:'absolute',top:'100px', zIndex:'20'}}
                        icon={alert.type === 'success' ? <CheckIcon fontSize="inherit" /> : <ErrorIcon fontSize="inherit" />}
                        severity={alert.type}
                        onClose={() => setAlert(null)} // Optional: Close the alert
                    >
                        {alert.message}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className='h-[300px] w-[350px]  flex flex-col z-20 justify-around p-[10px] rounded' style={{ background: 'rgba(0,0,0,0.6)' }}>
                    <h1 className='font-semibold text-lg block text-white mx-auto'>Signup</h1>

                    <input
                        className='h-[40px] pl-[10px] outline-none border rounded border-gray-400'
                        type='text'
                        placeholder='Enter Your name'
                        name='username'
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.username && touched.username ? <p className="text-sm text-red-600">{errors.username}</p> : null}

                    <input
                        className='h-[40px] pl-[10px] outline-none border rounded border-gray-400'
                        type='email'
                        placeholder='Enter email'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? <p className="text-sm text-red-600">{errors.email}</p> : null}


                    <input
                        className='h-[40px] pl-[10px] outline-none border rounded border-gray-400'
                        type='password'
                        placeholder='Enter password'
                        value={values.password}
                        name='password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? <p className="text-sm text-red-600">{errors.password}</p> : null}


                    <button type='submit'
                        className='bg-red-700 rounded text-white text-lg transition duration-200 hover:bg-red-500 h-[40px]'>
                        Signup
                    </button>

                    <p className='text-white text-sm'>Already have an account? <Link to='/login' className='hover:underline'>login</Link></p>

                </form>


            </div>

            <div className=' absolute inset-0 z-10' style={{ background: 'rgba(0,0,0,0.6)' }}>
            </div>
        </>
    )
}

export default SignupPage;
