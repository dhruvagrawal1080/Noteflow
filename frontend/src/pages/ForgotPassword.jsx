import React, { useState } from 'react';
import { HiPencilSquare } from "react-icons/hi2";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/operations/authAPI';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email, setEmailSent));
  }
  return (
    <div className='h-[calc(100vh-3.5rem)] bg-[#0084FF] flex justify-center items-center'>

      <div className='bg-white flex flex-col items-center rounded-lg px-10 py-6 w-[30rem]'>

        <div className='flex items-center gap-2'>
          <HiPencilSquare size={30} color={'#2563eb'} />
          <p className='text-xl font-bold'>NoteFlow</p>
        </div>

        <div className='flex flex-col items-center gap-2'>
          <p className='text-4xl font-bold pt-5 text-[#111827]'>
            {!emailSent ? "Reset your password" : "Check email"}
          </p>
          <p className='text-center text-[#4B5563]'>
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery."
              : `We have sent the reset email to ${email}`
            }
          </p>
        </div>

        <form className='w-full' onSubmit={onSubmitHandler}>

          {
            !emailSent &&
            (
              <div className='flex flex-col gap-1 w-full mt-4'>
                <label htmlFor="email">Email address</label>
                <input required type="email" id='email' value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  className='border-b-2 rounded-md px-2 py-2 bg-gray-100 outline-none'
                />
              </div>
            )
          }

          <button className='bg-[#2563EB] text-white font-bold text-xl rounded-xl py-3 mt-6 w-full cursor-pointer'>
            {!emailSent ? "Sumbit" : "Resend Email"}
          </button>

        </form>

        <p className='mt-4'>
          Remember your Password?
          <Link to={'/login'} className='text-[#2563EB]'> Sign in</Link>
        </p>

      </div>

    </div>
  )
}

export default ForgotPassword