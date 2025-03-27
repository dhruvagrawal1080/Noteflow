import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../assets/loginImage.png';
import { googleLogin, login, sendotp } from '../services/operations/authAPI';
import { setSignupData } from '../slices/authSlice';

const LoginSignupTemplate = ({ template }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (template === 'login') {
            const loginData = {
                email: formData.email,
                password: formData.password
            }
            dispatch(login(loginData, navigate));
        } else {
            if (formData.password !== formData.confirmPassword) {
                toast.error('Password and Confirm Password should be same');
                return;
            }

            const signupData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            }

            dispatch(setSignupData(signupData));
            dispatch(sendotp(signupData.email, navigate));
        }
    };

    const handleSuccess = async (response) => {
        dispatch(googleLogin(response.credential, navigate, setLoading));
    };

    const handleError = () => {
        toast.error("Google Login Failed");
    };

    return (
        <div className='h-[calc(100vh-3.5rem)] bg-[#0084FF] flex justify-between overflow-auto'>

            <div className='pl-20 pt-10 w-[30rem] xl:flex hidden'>
                <p className='text-white text-5xl font-serif leading-12 relative'>Join Us, <br /> Start Organizing!
                <img src={loginImage} alt="Description" className='absolute h-[35rem] top-6' loading='lazy' />
                </p>
            </div>

            <div className={`h-full flex-1 flex items-center justify-center w-full overflow-auto ${template === 'login' ? 'landscape-login' : 'landscape-signup'}`}>
                <div className='bg-white rounded-xl sm:w-[60%] w-full flex flex-col items-center py-5'>

                    <div className='flex items-center gap-2'>
                        <FaPenToSquare size={30} color={'#2563eb'} />
                        <p className='text-xl font-bold'>NoteFlow</p>
                    </div>

                    <p className='text-2xl md:text-3xl lg:text-4xl font-bold pt-4'>Welcome back</p>
                    {
                        template === 'login' ?
                            (
                                <p className='pt-2 text-center'>Don't have an account? <Link to={'/signup'} className='text-[#0084ff]'>Sign up</Link></p>
                            ) :
                            (
                                <p className='pt-2 text-center'>Already have an account? <Link to={'/login'} className='text-[#0084ff]'>Login</Link></p>
                            )
                    }

                    <div className="pt-6 md:scale-125">
                        <button disabled={loading}>
                            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                        </button>
                    </div>

                    <div className='flex items-center justify-center gap-4 pt-1 md:pt-4 px-20 w-full'>
                        <div className='h-[1px] w-full bg-black'></div>
                        <p className='text-[#A1A1A1] text-lg'>OR</p>
                        <div className='h-[1px] w-full bg-black'></div>
                    </div>

                    <form className='flex flex-col gap-4 w-full px-10' onSubmit={handleOnSubmit}>

                        {
                            template === 'signup' &&
                            (
                                <div className='flex flex-col lg:flex-row gap-4'>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <label htmlFor="firstname">First name</label>
                                        <input required type="text" id='firstname' value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            placeholder='Enter your first name'
                                            className='border-b-2 rounded-md px-2 py-2 bg-gray-100 outline-none'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <label htmlFor="lastname">Last name</label>
                                        <input required type="text" id='lastname' value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            placeholder='Enter your last name'
                                            className='border-b-2 rounded-md px-2 py-2 bg-gray-100 outline-none'
                                        />
                                    </div>
                                </div>
                            )
                        }

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="email">Email address</label>
                            <input required type="email" id='email' value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder='Enter your email'
                                className='border-b-2 rounded-md px-2 py-2 bg-gray-100 outline-none'
                            />
                        </div>

                        <div className='flex flex-col lg:flex-row gap-4'>
                            <div className='relative flex flex-col gap-1 w-full'>
                                <label htmlFor="password">Password</label>
                                <input required type={passwordVisible == true ? 'text' : 'password'} id="password" value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder='Enter your password'
                                    className='border-b-2 rounded-md px-2 py-2 bg-gray-100 outline-none'
                                />
                                {
                                    passwordVisible == true ?
                                        (
                                            <FaEyeSlash
                                                onClick={() => setPasswordVisible(false)}
                                                className='absolute right-5 top-10 cursor-pointer'
                                            />
                                        ) :
                                        (
                                            <FaEye
                                                onClick={() => setPasswordVisible(true)}
                                                className='absolute right-5 top-10 cursor-pointer'
                                            />
                                        )
                                }
                            </div>

                            {
                                template === 'signup' &&
                                (
                                    <div className='relative flex flex-col gap-1 w-full'>
                                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                                        <input required type={confirmPasswordVisible == true ? 'text' : 'password'} id="ConfirmPassword" value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            placeholder='Enter your password again'
                                            className='border-b-2 rounded-md px-2 py-2 bg-gray-100 outline-none'
                                        />
                                        {
                                            confirmPasswordVisible == true ?
                                                (
                                                    <FaEyeSlash
                                                        onClick={() => setConfirmPasswordVisible(false)}
                                                        className='absolute right-5 top-10 cursor-pointer'
                                                    />
                                                ) :
                                                (
                                                    <FaEye
                                                        onClick={() => setConfirmPasswordVisible(true)}
                                                        className='absolute right-5 top-10 cursor-pointer'
                                                    />
                                                )
                                        }
                                    </div>
                                )
                            }
                        </div>

                        {
                            template === 'login' &&
                            (
                                <Link to={'/forgot-password'} className='text-[#0084ff] ml-auto -mt-4'>Forgot password?</Link>
                            )
                        }

                        <div>
                            <button className='bg-[#2563EB] text-white font-bold text-xl rounded-xl py-3 mt-2 w-full cursor-pointer'>
                                {template === 'login' ? 'Sign in' : 'Create Account'}
                            </button>
                        </div>

                    </form>

                </div>
            </div>

        </div>
    )
}

export default LoginSignupTemplate