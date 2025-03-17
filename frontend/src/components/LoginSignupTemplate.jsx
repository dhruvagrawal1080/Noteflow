import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import facebook from '../assets/facebook.png';
import google from '../assets/google.png';
import loginImage from '../assets/loginImage.png';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setSignupData } from '../slices/authSlice';
import { login, sendotp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

const LoginSignupTemplate = ({ template }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    return (
        <div className='h-[calc(100vh-3.5rem)] bg-[#0084FF] flex overflow-auto'>

            <div className='relative pl-20 py-10 w-[30rem]'>
                <p className='text-white text-5xl font-serif leading-12'>Join Us, <br /> Start Organizing!</p>
                <img src={loginImage} alt="Description" className='absolute h-[35rem] bottom-6' loading='lazy' />
            </div>

            <div className='h-full w-[calc(100%-30rem)] flex items-center justify-center'>
                <div className='bg-white rounded-xl w-[70%] h-[90%] flex flex-col items-center'>

                    <div className='flex items-center gap-2 pt-5'>
                        <HiPencilSquare size={30} color={'#2563eb'} />
                        <p className='text-xl font-bold'>NoteFlow</p>
                    </div>

                    <p className='text-4xl font-bold pt-5'>Welcome back</p>
                    {
                        template === 'login' ?
                            (
                                <p className='text-lg pt-2'>Don't have an account? <Link to={'/signup'} className='text-[#0084ff]'>Sign up</Link></p>
                            ) :
                            (
                                <p className='text-lg pt-2'>Already have an account? <Link to={'/login'} className='text-[#0084ff]'>Login</Link></p>
                            )
                    }

                    <div className='flex gap-4 items-center pt-6'>
                        <div className='flex gap-4 items-center border rounded-lg px-4 py-2 cursor-pointer'>
                            <img src={google} className='w-8' loading='lazy' />
                            <p className='text-lg text-[#A1A1A1]'>Continue with Google</p>
                        </div>

                        <div className='flex gap-4 items-center border rounded-lg px-4 py-2 cursor-pointer'>
                            <img src={facebook} className='w-8' loading='lazy' />
                            <p className='text-lg text-[#A1A1A1]'>Continue with Facebook</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-center gap-4 pt-2'>
                        <div className='h-[1px] w-20 bg-black'></div>
                        <p className='text-[#A1A1A1] text-lg'>OR</p>
                        <div className='h-[1px] w-20 bg-black'></div>
                    </div>

                    <form className='flex flex-col gap-4 pt-2 w-full px-20' onSubmit={handleOnSubmit}>

                        {
                            template === 'signup' &&
                            (
                                <div className='flex gap-4'>
                                    <div className='flex flex-col gap-1 w-[50%]'>
                                        <label htmlFor="firstname">First name</label>
                                        <input required type="text" id='firstname' value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            placeholder='Enter your first name'
                                            className='border-b-2 rounded-md px-2 py-2 bg-gray-100 outline-none'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1 w-[50%]'>
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

                        <div className='flex gap-4'>
                            <div className={`relative flex flex-col gap-1 ${template === 'login' ? 'w-full' : 'w-[50%]'}`}>
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
                                    <div className='relative flex flex-col gap-1 w-[50%]'>
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