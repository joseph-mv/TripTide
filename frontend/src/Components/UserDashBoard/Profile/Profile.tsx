import React, { useEffect, useState } from "react";
import "./Profile.css";
import { ButtonPopup, ImageChangePopup, ImagePopup } from "./Popups/Popups";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { UserState } from "../../../types";
interface ProfileProps {
  userData: UserState;
}

const Profile = ({ userData }: ProfileProps) => {
  const dispatch = useDispatch()
  const [profilePicTab, setProfilePicTab] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");


  const handleProfilePicTab = () => {
    setProfilePicTab((prev) => !prev);
  };

  const viewImage = () => {
    setIsShowImage(true);
  };

  const handleProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file
    if (file) {
      setIsChangeImage(true)
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); // Store base64 image URL
      };

      reader.readAsDataURL(file); // Convert file to base64 URL
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch({ type: "REMOVEUSER" })
  };


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
        <ImageChangePopup setIsChangeImage={setIsChangeImage} selectedImage={selectedImage} />

      )}
      <Link onClick={handleLogout} className="link" to={ROUTES.AUTHENTICATE}>
        &nbsp;&nbsp; &nbsp;&nbsp;{"Logout"}
      </Link>

    </div>
  );
};

export default Profile;
