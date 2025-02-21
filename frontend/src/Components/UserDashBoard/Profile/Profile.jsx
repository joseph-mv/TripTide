import React, { useEffect, useState } from "react";
import "./Profile.css";
import { ButtonPopup, ImageChangePopup, ImagePopup } from "./Popups/Popups";
const Profile = ({ userData }) => {
  const [profilePicTab, setProfilePicTab] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
 

  const handleProfilePicTab = () => {
    setProfilePicTab((prev) => !prev);
  };

  const viewImage = () => {
    setIsShowImage(true);
  };

  const handleProfilePic = (e) => {
    const file = e.target.files?.[0]; // Get the first file
    if (file) {
      setIsChangeImage(true)
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Store base64 image URL
      };

      reader.readAsDataURL(file); // Convert file to base64 URL
    }
  };

  useEffect(() => {
    
  }, [])
  

  return (
    <div className="profile-header">
      <img
        src={userData.image}
        onClick={handleProfilePicTab}
        alt="Profile"
      />

      {profilePicTab && (
        <ButtonPopup
          handleProfilePicTab={handleProfilePicTab}
          viewImage={viewImage}
          handleProfilePic={handleProfilePic}
        />
      )}
      <h2>Welcome {userData.userName}!</h2>

      {/* Image Image */}
      {isShowImage && (
        <ImagePopup setIsShowImage={setIsShowImage} userData={userData} />
      )}
      {isChangeImage && (
       <ImageChangePopup setIsChangeImage={setIsChangeImage} selectedImage={selectedImage}  />
      
      )}
    </div>
  );
};

export default Profile;
