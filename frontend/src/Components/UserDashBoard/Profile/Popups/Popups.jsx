import { faEye, faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "./Popups.css";
import { updateProfilePic } from "../../../../services/user";
import { useDispatch } from "react-redux";
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
          src={userData?.image || "/default-profile.png"}
          alt="Profile"
        />
      </div>
    </div>
  );
};

export const ImageChangePopup = ({ setIsChangeImage, selectedImage }) => {
  const [zoom, setZoom] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [xLast, setXLast] = useState(0);
  const [yLast, setYLast] = useState(0);
  const [crop, setCrop] = useState(false);
  const [base64, setBase64] = useState("");
  const [loading, setLoading] = useState(false);

  // const [imageState,setImageState]=useState({
  //   zoom:0,
  //   isDragging:false,
  //   x:0,
  //   y:0,
  //   xLast:0,
  //   yLast:0,
  //   status:"editing",
  //   base64: "",
  //   loading: false,

  // })

  const canvasRef = useRef();
  const imgRef = useRef();
  const dispatch = useDispatch();

  const closePopup = () => {
    setIsChangeImage(false);
  };

  const handleZoom = (e) => {
    setZoom(e.target.value / 100);
  };
  useEffect(() => {
    if (base64) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = new Image();
      img.src = selectedImage;
      img.onload = function () {
        imgRef.current = img;
        canvas.width =Math.min('400', window.innerWidth*0.5)
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
        if (crop) {
          setBase64(canvas.toDataURL("image/png"));
        }
      };
    }
  }, [selectedImage, zoom, x, y, crop]);

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setXLast(x);
    setYLast(y);
  };

  const handlePointerMove = (e) => {
    e.preventDefault();
    if (isDragging) {
      const x=e?.touches?.[0]?.clientX ?? e.clientX
      const y=e?.touches?.[0]?.clientY ?? e.clientY
      
      const canvas = canvasRef.current;

      const rect = canvas.getBoundingClientRect();
      const newX = xLast + x - rect.left - rect.width / 2;
      const newY = yLast + y - rect.top - rect.height / 2;
      if (newX > -rect.width && newX < rect.width) {
        setX(newX);
      }
      if (newY > -rect.height && newY < rect.height) {
        setY(newY);
      }
    }
  };

  const handlePointerUp = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleCrop = () => {
    setCrop(true);
  };

  const handleSave = async () => {
    setLoading(true);
    if (base64) {
      const response = await updateProfilePic(base64);
      if (response.success) {
        dispatch({ type: "CHANGEIMAGE", payload: base64 });
      } else {
        alert(
          "We couldn't update your image. Please check your internet connection and try again."
        );
      }
      closePopup();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content edit-content">
        <h1>Choose profile picture</h1>
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          onClick={closePopup}
        />
        <div className="image-container">
        <canvas
          ref={canvasRef}
          
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          Your browser does not support the cropping image
        </canvas>
        </div>
       

        <div>
          <input type="range" value={zoom * 100} onChange={handleZoom} />
          {crop ? (
            <button disabled={loading} onClick={handleSave}>
              Save
            </button>
          ) : (
            <button onClick={handleCrop}>Crop</button>
          )}
        </div>
      </div>
    </div>
  );
};
