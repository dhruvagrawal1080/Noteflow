import React from "react";
import { useSelector } from "react-redux";
import AboutSection from "../../components/profile/AboutSection";
import ImageSection from "../../components/profile/ImageSection";
import PersonalDetailsSection from "../../components/profile/PersonalDetailsSection";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  console.log('user', user);  

  return (
    <div className="h-[calc(100vh-3.5rem)] flex justify-center items-center">

      <div className='h-full w-full px-10 pt-5 pb-8 overflow-auto'>

        <h1 className="text-3xl font-medium">
          My Profile
        </h1>

        <ImageSection user={user} />

        <AboutSection user={user} />

        <PersonalDetailsSection user={user} />

      </div>

    </div>
  );
};

export default Profile;
