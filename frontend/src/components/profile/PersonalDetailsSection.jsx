import React, { useEffect, useState } from 'react'
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../services/operations/profileAPI';
import toast from 'react-hot-toast';

const PersonalDetailsSection = ({ user }) => {
  const [isEditEnable, setEditEnable] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [personalData, setPersonalData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    contactNumber: user.contactNumber,
    gender: user.gender,
    dob: user.dob
  });

  useEffect(() => {
    setIsDirty(
      personalData.firstName !== user.firstName ||
      personalData.lastName !== user.lastName ||
      personalData.contactNumber !== user.contactNumber ||
      personalData.gender !== user.gender ||
      personalData.dob !== user.dob
    );
  }, [personalData]);

  const handleClose = () => {
    if (isDirty) {
      if (!window.confirm("You have unsaved changes. Are you sure you want to close?")) {
        return;
      }
    }
    setPersonalData({
      firstName: user.firstName,
      lastName: user.lastName,
      contactNumber: user.contactNumber,
      gender: user.gender,
      dob: user.dob
    });
    setIsDirty(false);
    setEditEnable(false);
  };

  const handleSave = () => {
    if (!isDirty) {
      window.alert("You have not changed anything.");
      return;
    }

    const userData = {
      ...user,
      ...personalData,
    };

    if(!userData.firstName || !userData.lastName){
      toast.error('Please enter first name and last name');
      return;
    }

    dispatch(updateProfile(token, userData));
    setIsDirty(false);
    setEditEnable(false);
  };

  const formattedDate = (dateString) => {
    if (!dateString) return null;
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="mt-10 flex flex-col gap-y-4 rounded-md border bg-white px-8 pb-6 pt-4">

      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">
          Personal Details
        </p>

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
            <div className='grid grid-cols-2 gap-x-10 max-w-[500px]'>

              <div className="mb-2">
                <p className="text-sm">First Name</p>
                <p className="text-sm font-medium">
                  {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) || "N/A"}
                </p>
              </div>

              <div className="mb-2">
                <p className="text-sm">Last Name</p>
                <p className="text-sm font-medium">
                  {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1) || "N/A"}
                </p>
              </div>

              <div className="mb-2">
                <p className="text-sm">Email</p>
                <p className="text-sm font-medium">
                  {user?.email || "N/A"}
                </p>
              </div>

              <div className="mb-2">
                <p className="text-sm">Contact Number</p>
                <p className="text-sm font-medium">
                  {user?.contactNumber || "N/A"}
                </p>
              </div>

              <div className="mb-2">
                <p className="text-sm">Gender</p>
                <p className="text-sm font-medium">
                  {user?.gender || "N/A"}
                </p>
              </div>

              <div className="mb-2">
                <p className="text-sm">Date Of Birth</p>
                <p className="text-sm font-medium">
                  {formattedDate(user?.dob) || "N/A"}
                </p>
              </div>

            </div>
          ) :
          (
            <div className='space-y-4 max-w-[500px]'>

              <div className='flex gap-x-5'>

                <div className='w-full'>
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    id='firstName'
                    value={personalData.firstName}
                    onChange={(e) => setPersonalData({ ...personalData, firstName: e.target.value })}
                    placeholder='Enter your first name'
                    className='border-b-2 rounded-md px-2 py-1 bg-[#F3F4F6] w-full'
                  />
                </div>

                <div className='w-full'>
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    id='lastName'
                    value={personalData.lastName}
                    onChange={(e) => setPersonalData({ ...personalData, lastName: e.target.value })}
                    placeholder='Enter your last name'
                    className='border-b-2 rounded-md px-2 py-1 bg-[#F3F4F6] w-full'
                  />
                </div>

              </div>

              <div className='flex gap-x-5'>

                <div className='w-full'>
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    id='dob'
                    value={personalData.dob ? new Date(personalData.dob).toISOString().split("T")[0] : ""}
                    onChange={(e) => setPersonalData({ ...personalData, dob: e.target.value })}
                    max={new Date().toISOString().split("T")[0]}
                    className='border-b-2 rounded-md px-2 py-1 bg-[#F3F4F6] w-full'
                  />
                </div>

                <div className='w-full'>
                  <label htmlFor="gender">Gender</label>
                  <select
                    id='gender'
                    value={personalData.gender}
                    onChange={(e) => setPersonalData({ ...personalData, gender: e.target.value })}
                    className='border-b-2 rounded-md px-2 py-1 bg-[#F3F4F6] w-full'
                  >
                    <option value="">Choose your Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

              </div>

              <div className='w-full'>
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  id='contactNumber'
                  type='number'
                  maxLength={10}
                  value={personalData.contactNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {  // Allows only up to 10 digits
                      setPersonalData({ ...personalData, contactNumber: value });
                    }
                  }}
                  placeholder='Enter your Contact Number'
                  className='border-b-2 rounded-md px-2 py-1 bg-[#F3F4F6] w-full'
                />
              </div>

            </div>
          )
      }

    </div>
  )
}

export default PersonalDetailsSection
