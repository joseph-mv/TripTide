import { faEye, faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "./Popups.css";
import { updateProfilePic } from "../../../../services/user";
export const ButtonPopup = ({
  handleProfilePicTab,
  viewImage,
  handleProfilePic,
}) => {
  return (
    <div className="profile-options" onMouseLeave={handleProfilePicTab}>
      <button onClick={viewImage}>
        <FontAwesomeIcon icon={faEye} /> View Profile Picture
      </button>
      <label>
        <FontAwesomeIcon icon={faImage} /> Choose Profile Picture
        <input type="file" accept="image/*" onChange={handleProfilePic} />
      </label>
    </div>
  );
};

export const ImagePopup = ({ setIsShowImage, userData }) => {
  return (
    <div className="modal-overlay" onClick={() => setIsShowImage(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          onClick={() => setIsShowImage(false)}
        />

        <img
          className="showImage"
          src={userData?.profilePicture || "/default-profile.png"}
          alt="Profile"
        />
      </div>
    </div>
  );
};

export const ImageChangePopup = ({ setIsChangeImage, selectedImage,userId }) => {
  const [zoom, setZoom] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [xLast, setXLast] = useState(0);
  const [yLast, setYLast] = useState(0);
  const [crop, setCrop] = useState(false);
  const [base64, setBase64] = useState("");
  const canvasRef = useRef();
  const imgRef = useRef();

  const handlePopup = () => {
    setIsChangeImage(false);
  };

  const handleZoom = (e) => {
    setZoom(e.target.value / 100);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    console.log("canvas");
    if (!canvas) return;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = new Image();
      img.src = selectedImage;
      img.onload = function () {
        imgRef.current = img;
        canvas.width = "400";
        canvas.height = canvas.width / (img.width / img.height); //canvas has same aspect ratio of img
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.height / 2, canvas.width / 2);
        const imgX = x - (canvas.width * zoom) / 2; //while zooming extra length added is canvas.width*zoom
        const imgY = y - (canvas.height * zoom) / 2;

        ctx.filter = "blur(5px)";
        ctx.drawImage(
          img,
          imgX,
          imgY,
          canvas.width * (1 + zoom),
          canvas.height * (1 + zoom)
        );
        ctx.fillStyle = "rgba(86, 183, 59, 0.44)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        if (crop) {
          console.log("crop");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.filter = "none";
        // Draw the image inside the circle
        ctx.drawImage(
          img,
          imgX,
          imgY,
          canvas.width * (1 + zoom),
          canvas.height * (1 + zoom)
        );
        ctx.stroke();
      if(crop){
         setBase64(canvas.toDataURL("image/png"));
      }
      };
    }
  }, [selectedImage, zoom, x, y, crop]);

  const handleMouseDown = () => {
    setIsDragging(true);
    setXLast(x);
    setYLast(y);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const canvas = canvasRef.current;

      const rect = canvas.getBoundingClientRect();
      const newX = xLast + e.clientX - rect.left - rect.width / 2;
      const newY = yLast + e.clientY - rect.top - rect.height / 2;
      console.log(newX, newY);
      if (newX > -rect.width && newX < rect.width) {
        setX(newX);
      }
      if (newY > -rect.height && newY < rect.height) {
        setY(newY);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleCrop = () => {
    setCrop(true);
    
  };

useEffect(() => {
  if(base64){

    updateProfilePic(userId,base64)
  }
}, [base64])

  

  return (
    <div className="modal-overlay">
      <div className="modal-content edit-content">
        <h1>Choose profile picture</h1>
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          onClick={handlePopup}
        />

        <canvas
          ref={canvasRef}
          className="image-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          Your browser does not support the cropping image
        </canvas>
        <button onClick={handleCrop}>Save</button>
        <input type="range" value={zoom * 100} onChange={handleZoom} />
      </div>
    </div>
  );
};
