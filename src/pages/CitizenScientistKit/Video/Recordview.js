import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CameraAlt, Stop, SwitchCamera } from "@mui/icons-material"; // Import icons from Material UI
import ClearIcon from '@mui/icons-material/Clear';
import Footer from "../../../components/Footer";
import { api_url } from "../../../constants";
import { toast } from "react-toastify";
import { MyContext } from "../../../context/accountProvider";


const RecordView = ({ title }) => {
  const [status, setStatus] = useState("Ready to Record");
  const [blobCopy, setBlobCopy] = useState()
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [facingMode, setFacingMode] = useState("user"); // 'user' for front, 'environment' for back
  const [isCameraOpen, setIsCameraOpen] = useState(false); // State to manage camera preview
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null); // To hold the stream for switching cameras
  const navigate = useNavigate();

  const { token, setToken } = useContext(MyContext);
  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setToken(null);
        navigate("/");
      }
    };

    checkToken();
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, [navigate, setToken]);


  useEffect(() => {
    // Automatically open the camera when the component mounts
    handleStartCamera();

    return () => {
      // Clean up the stream when the component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraOpen]);

  const handleStartCamera = () => {
    if (isCameraOpen) return; // Prevent starting the camera again if already open
    setIsCameraOpen(true);

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode }, audio: false })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream; // Save the stream for later use

          // Wait for the video metadata to load before playing
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
          };
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
        setStatus("Failed to access media devices");
      });
  };

  const handleStartRecording = () => {
    if (isRecording) return; // Prevent starting a new recording if already recording

    if (!isCameraOpen) {
      handleStartCamera(); // Ensure the camera is open before starting recording
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode }, audio: true })
      .then((stream) => {
        if (!videoRef.current) {
          throw new Error("Video element not found");
        }

        const options = { mimeType: "video/webm; codecs=vp8" };
        mediaRecorderRef.current = new MediaRecorder(stream, options);

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "video/webm" });
          const url = URL.createObjectURL(blob);
          setMediaBlobUrl(url);
          setBlobCopy(blob)
          // uploadVideo(blob);
          chunksRef.current = [];
          setIsRecording(false);
          setIsPopupOpen(true);
          // Stop all video tracks
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorderRef.current.start();
        setStatus("Recording...");
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
        setStatus("Failed to access media devices");
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSwitchCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === "user" ? "environment" : "user"
    );
    if (isRecording) {
      // Restart recording with the new camera facing mode
      handleStopRecording();
      handleStartRecording();
    } else {
      // Restart the camera preview with the new facing mode
      handleStartCamera();
    }
  };

  const handleClosePopup = () => {
    if (mediaBlobUrl) {
      URL.revokeObjectURL(mediaBlobUrl);
    }
    uploadVideo(blobCopy);
    setMediaBlobUrl(null);
    setIsPopupOpen(false);
    setStatus("Ready to Record");
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null; // Clear the reference
    }
    setIsCameraOpen(false); // Close the camera when the popup is closed
    
  };

//! Logic to upload the video
const uploadVideo = async (blob) => {
  try {
    // Get current position and proceed once we have the coordinates
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;

    const formData = new FormData();
    formData.append('signaturefile', blob, 'recording.webm');
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('userid', localStorage.getItem('userid'));
    formData.append('description', "This is my video");
    formData.append('username', localStorage.getItem('username'));

    // Optional: Log FormData entries for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await fetch(`${api_url}/admin/acc/appdata/usersignature`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if(data.isValid==true) {
      toast.success(data.msgtext)
    }
    console.log('Video uploaded successfully:', data);
  } catch (error) {
    console.error('Error uploading video:', error);
  }
};


  useEffect(() => {
    if (isCameraOpen) {
      // Restart the video stream with the new facing mode
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode }, audio: false })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = stream;
          }
        });
    }
  }, [facingMode]);

  return (
    <div style={{ textAlign: "center" }}>
    <div
        className="h-[106px] bg-[#125B57] z-[90] relative flex justify-center items-center"
        style={{
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          borderBottomLeftRadius: '36px',
          borderBottomRightRadius: '36px',
          boxShadow: '0px 4px 4px 0px #00000040',
        }}
      >
        <div className="absolute left-[18.95px]">
          <ClearIcon className="text-[#FFFFFF] cursor-pointer" onClick={() => navigate(-1)} />
        </div>
        <div className="absolute">
          <p className="font-inter font-[500] text-[16px] leading-[19.36px] text-[#FFFFFF]">Citizen scientist kit</p>
        </div>
      </div>
      {!isPopupOpen ? (
        <div className="absolute mt-[-134px]">
          {isCameraOpen ? (
            <div className="relative">
              <div>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  style={{ width: "100%", height: "100vh", objectFit: "cover" }}
                />
              </div>
              <div className="w-full absolute bottom-[20%] flex justify-center">
                {isRecording ? (
                  <div className="flex w-full justify-center">
                    {/* Use icon for stopping the recording */}
                    <button
                      onClick={handleStopRecording}
                      className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center bg-red-500"
                    >
                      <Stop fontSize="medium" />
                    </button>
                    {/* Use icon for switching the camera */}
                    {/* <button
                      onClick={handleSwitchCamera}
                      className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center text-white"
                    >
                      <SwitchCamera fontSize="medium" />
                    </button> */}
                  </div>
                ) : (
                  <div className="flex flex-col gap-5 ">
                    <div className="flex z-[1000] justify-center gap-[25px] ">
                      <button
                        className="text-white !bg-transparent font-inter font-[500] text-[16px] leading-[19.36px]"
                        onClick={() => navigate("/camera")}
                      >
                        PHOTO
                      </button>
                      <button className="text-white underline !bg-transparent font-inter font-[500] text-[16px] leading-[19.36px]">
                        VIDEO
                      </button>
                      <button className="text-white !bg-transparent font-inter font-[500] text-[16px] leading-[19.36px]" onClick={() => navigate("/audio")}>
                        AUDIO
                      </button>
                    </div>
                    <div className="flex w-full justify-center gap-5">
                      <button
                        onClick={handleSwitchCamera}
                        className="icon-button w-16 h-16 bg-white opacity-20 rounded-full shadow-lg flex justify-center items-center"
                      >
                        <SwitchCamera fontSize="medium" className="text-gray-400" />
                      </button>
                      {/* Use icon for starting the recording */}
                      <button
                        onClick={handleStartRecording}
                        className="icon-button w-16 h-16 bg-white opacity-20 rounded-full shadow-lg flex justify-center items-center"
                      >
                        <CameraAlt fontSize="medium"  className="text-gray-400"/>
                      </button>
                      {/* Use icon for switching the camera */}
                      <button
                        onClick={handleSwitchCamera}
                        className="icon-button w-16 h-16 bg-white opacity-20 rounded-full shadow-lgflex justify-center items-center"
                      >
                        <SwitchCamera fontSize="medium"  className="text-gray-400"/>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={handleStartCamera}
              className="icon-button rounded-full w-[50px] h-[50px] flex justify-center items-center"
            >
              <CameraAlt fontSize="medium" className="text-white" />
            </button>
          )}
        </div>
      ) : (
        <div className="popup">
          <div className="popup-content py-5">
            <video
              src={mediaBlobUrl}
              controls
              autoPlay
              className="recorded-video"
            />
            <button
              className="close-button bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out mt-4 shadow-md"
              onClick={handleClosePopup}
            >
              Send
            </button>
          </div>
        </div>
      )}
      <Footer color="#125b57" title={title} />
    </div>
  );
};

export default RecordView;
