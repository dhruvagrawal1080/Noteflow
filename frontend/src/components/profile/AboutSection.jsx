import React, { useEffect, useState } from 'react'
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../services/operations/profileAPI';

const AboutSection = ({ user }) => {
  const [isEditEnable, setEditEnable] = useState(false);
  const [about, setAbout] = useState(user.about);
  const [isDirty, setIsDirty] = useState(false);
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsDirty(about !== user.about);
  }, [about]);

  const handleClose = () => {
    if (isDirty) {
      if (!window.confirm("You have unsaved changes. Are you sure you want to close?")) {
        return;
      }
    }
    setAbout(user.about);
    setIsDirty(false);
    setEditEnable(false);
  };

  const handleSave = () => {
    if (!isDirty) {
      window.alert("You have not changed anything about yourself.");
      return;
    }
    const userData = {
      ...user,
      about
    }
    dispatch(updateProfile(token, userData));
    setIsDirty(false);
    setEditEnable(false);
  }

  return (
    <div className="my-10 flex flex-col gap-y-4 rounded-md border bg-white px-8 pb-6 pt-4">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">About</p>

        <div>
          {
            isEditEnable == false ?
              (
                <button
                  onClick={() => setEditEnable(prev => !prev)}
                  className='border flex gap-2 items-center rounded-lg px-5 py-2 font-semibold cursor-pointer bg-[#2563eb] text-white'>
                  Edit
                  <TiEdit />
                </button>
              ) :
              (
                <div className='flex items-center gap-2'>
                  <button
                    onClick={handleSave}
                    className='border flex gap-2 items-center rounded-lg px-5 py-2 font-semibold cursor-pointer bg-[#2563eb] text-white'>
                    Save
                  </button>
                  <button
                    onClick={handleClose}
                    className='border flex gap-2 items-center rounded-lg px-5 py-2 font-semibold cursor-pointer bg-[#2563eb] text-white'>
                    Cancel
                  </button>
                </div>
              )
          }
        </div>

      </div>

      {
        isEditEnable == false ?
          (
            <p className='text-sm font-medium'>
              {about || "Write Something About Yourself"}
            </p>
          ) :
          (
            <textarea
              className='resize-none outline-none h-20'
              placeholder='Write Something About Yourself'
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          )
      }
    </div>
  )
}

export default AboutSection