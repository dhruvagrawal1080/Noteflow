import React, { useEffect, useState } from 'react';
import { HiPencilSquare } from "react-icons/hi2";
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signup } from '../services/operations/authApi';

const OTP = () => {
    const [otp, setOtp] = useState('');
    const { signupData } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.token);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...signupData,
            otp
        }

        dispatch(signup(data, navigate));
    }

    return (
        <div className='h-[calc(100vh-3.5rem)] bg-[#0084FF] flex justify-center items-center'>
            {
                loading ?
                    (
                        <div className='spinner'></div>
                    ) :
                    (
                        <div className='bg-white flex flex-col items-center rounded-lg px-10 py-6 w-[30rem]'>
                            <div className='flex items-center gap-2'>
                                <HiPencilSquare size={30} color={'#2563eb'} />
                                <p className='text-xl font-bold'>NoteFlow</p>
                            </div>

                            <div className='flex flex-col items-center gap-2'>
                                <p className='text-4xl font-bold pt-5 text-[#111827]'>
                                    Verify Email
                                </p>
                                <p className='text-center text-[#4B5563]'>
                                    Enter the verification code sent to your email address
                                </p>
                            </div>

                            <form className='mt-6' onSubmit={handleOnSubmit}>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            placeholder="-"
                                            style={{
                                                boxShadow: "inset rgb(141 132 132 / 18%) 0px 0px 10px",
                                            }}
                                            className="w-[48px] lg:w-[60px] border-1 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                        />
                                    )}
                                    containerStyle={{
                                        gap: "0 6px",
                                    }}
                                />

                                <button className="w-full bg-[#2563EB] py-2 mt-6 text-white font-bold text-xl rounded-xl cursor-pointer">
                                    Verify Email
                                </button>
                            </form>

                            <div className='mt-2'>Code expires in: <span className='text-[#2563EB]'>{formatTime(timeLeft)}</span></div>

                            <p className='mt-3'>
                                <span className='text-[#4B5563]'>Didn't receive the code? </span>
                                <button className='text-[#2563EB] cursor-pointer'>Send again</button>
                            </p>

                            <p className='mt-2'>
                                <span className='text-[#4B5563]'>Back to </span>
                                <Link to={'/signup'} className='text-[#2563EB]'>Sign up</Link>
                            </p>
                        </div>
                    )
            }

        </div>
    );
};

export default OTP;