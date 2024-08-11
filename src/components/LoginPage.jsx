import React, { useState,useContext } from 'react'
import { Formik, useFormik } from 'formik'
import { LoginValidation } from './YupValidations/YupValidations'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../helper'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'


const initialStates = {
    email: '',
    password: 'password',
}

const LoginPage = () => {

    const [redirect, setRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { userInfo, setUserInfo } = useContext(UserContext);


    const Formik = useFormik({
        initialValues: initialStates,
        validationSchema : LoginValidation,
        onSubmit: async(values) => {
            // console.log(values);

            try {
                const response = await fetch(`${BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values), 
                    credentials : 'include',
                });

                const data = await response.json();
                // console.log(data.user);
                const userData = data.user;
                // console.log(userData);
                
                // console.log(data.error);
                setErrorMessage(data.error)
                
                

                if (response.ok) {
                    setUserInfo(userData)
                    setRedirect(true);
                }

                if (!response.ok) {
                    
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }


            } catch (error) {
                console.error('Error:', error);
            }

        }
    });

    // console.log(redirect);

    // console.log("error message" , errorMessage);
    
    
    
    // console.log(Formik);

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = Formik;

    if (redirect) {
        return <Navigate to={'/'}/>
    }


    return (
        <>
            <div className='flex justify-center items-center h-[100vh] w-[100vw]' style={{ background: `url("https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media/banner.jpg")` }}>
                <form onSubmit={handleSubmit} className='h-[250px] w-[350px]  flex flex-col z-20 justify-around p-[10px] rounded' style={{ background: 'rgba(0,0,0,0.6)' }}>
                    <h1 className='font-semibold text-lg block text-white mx-auto'>Login</h1>

                    <input
                        className='h-[40px] pl-[10px] outline-none border rounded border-gray-400'
                        type='emil'
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

                    {errorMessage && <p className='text-red-500 font-semibold'>{ errorMessage }</p>}


                    <button type='submit'
                        className='bg-red-700 rounded text-white text-lg transition duration-200 hover:bg-red-500 h-[40px]'>
                        Login
                    </button>

                    <p className='text-white text-sm'>Don't have an accoutn? <Link to='/signup' className='hover:underline'>create account</Link></p>

                </form>


            </div>

            <div className=' absolute inset-0 z-10' style={{ background: 'rgba(0,0,0,0.6)' }}>
            </div>
        </>
    )
}

export default LoginPage;
