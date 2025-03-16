import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { changePassword } from '../services/operations/authApi';

const updatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: ''
  })

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      toast.error('Password and Confirm Password should be same');
      return;
    }

    dispatch(changePassword(password.newPassword, token, navigate));
  }

  return (
    <div className='h-[calc(100vh-3.5rem)] bg-[#0084FF] flex justify-center items-center'>

      <div className='bg-white flex flex-col items-center rounded-lg px-8 py-6 w-[30rem]'>

        <div className='flex items-center gap-2'>
          <HiPencilSquare size={30} color={'#2563eb'} />
          <p className='text-xl font-bold'>NoteFlow</p>
        </div>

        <div className='flex flex-col items-center gap-2'>
          <p className='text-4xl font-bold pt-5 text-[#111827]'>
            Choose new password
          </p>
          <p className='text-center text-[#4B5563]'>
            Almost done. Enter your new password and you are all set.
          </p>
        </div>

        <form className='w-full' onSubmit={onSubmitHandler}>

          <div className='relative flex flex-col gap-1 w-full mt-4'>
            <label htmlFor="password">New Password</label>
            <input required type={passwordVisible == true ? 'text' : 'password'} id='password' value={password.newPassword}
              onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
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

          <div className='relative flex flex-col gap-1 w-full mt-4'>
            <label htmlFor="ConfirmPassword">Confirm New Password</label>
            <input required type={confirmPasswordVisible == true ? 'text' : 'password'} id='ConfirmPassword' value={password.confirmPassword}
              onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
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

          <button className='bg-[#2563EB] text-white font-bold text-xl rounded-xl py-3 mt-6 w-full cursor-pointer'>
            Reset Password
          </button>

        </form>

        <p className='mt-4'>
          Remember your Password?
          <Link to={'/login'} className='text-[#2563EB]'> Login</Link>
        </p>

      </div>

    </div>
  )
}

export default updatePassword