



// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AudioRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlobUrl, setAudioBlobUrl] = useState(null);
//   const [status, setStatus] = useState('Ready to Record');
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [recordingTime, setRecordingTime] = useState(0); // Timer state to keep track of recording time
//   const audioRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]); // Reference to store audio data chunks
//   const timerRef = useRef(null); // Timer reference
//   const navigate = useNavigate()

//   // Function to start the timer
//   const startTimer = () => {
//     timerRef.current = setInterval(() => {
//       setRecordingTime((prevTime) => prevTime + 1);
//     }, 1000);
//   };

//   // Function to stop the timer
//   const stopTimer = () => {
//     clearInterval(timerRef.current);
//   };

//   const handleStartRecording = () => {
//     if (isRecording) return; // Prevent starting a new recording if already recording

//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((stream) => {
//         audioRecorderRef.current = new MediaRecorder(stream);

//         audioRecorderRef.current.ondataavailable = (event) => {
//           if (event.data.size > 0) {
//             audioChunksRef.current.push(event.data);
//           }
//         };

//         audioRecorderRef.current.onstop = () => {
//           const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//           const url = URL.createObjectURL(blob);
//           setAudioBlobUrl(url);
//           audioChunksRef.current = [];
//           setIsRecording(false);
//           setIsPopupOpen(true);
//           stopTimer(); // Stop the timer when recording stops
//           // Stop all audio tracks
//           stream.getTracks().forEach((track) => track.stop());
//         };

//         audioRecorderRef.current.start();
//         setStatus('Recording...');
//         setIsRecording(true);
//         setRecordingTime(0); // Reset the timer
//         startTimer(); // Start the timer
//       })
//       .catch((error) => {
//         console.error('Error accessing audio devices.', error);
//         setStatus('Failed to access audio devices');
//       });
//   };

//   const handleStopRecording = () => {
//     if (audioRecorderRef.current && isRecording) {
//       audioRecorderRef.current.stop();
//     }
//   };

//   const handleClosePopup = () => {
//     if (audioBlobUrl) {
//       URL.revokeObjectURL(audioBlobUrl);
//     }
//     setAudioBlobUrl(null);
//     setIsPopupOpen(false);
//     setStatus('Ready to Record');
//     navigate("/camera")
//   };

//   // Format the timer to display minutes and seconds
//   const formatTime = (timeInSeconds) => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = timeInSeconds % 60;
//     return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       {!isPopupOpen ? (
//         <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm text-center">
//           {isRecording ? (
//             <div>
//               <button
//                 onClick={handleStopRecording}
//                 className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300 ease-in-out shadow-md"
//               >
//                 Stop Recording
//               </button>
//               <div className="mt-4 text-xl font-bold text-gray-700">
//                 Recording Time: {formatTime(recordingTime)}
//               </div>
//             </div>
//           ) : (
//             <button
//               onClick={handleStartRecording}
//               className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 ease-in-out shadow-md"
//             >
//               Open Audio Recorder
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="popup-content bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-center">
//             <audio src={audioBlobUrl} controls autoPlay className="w-full mt-4" />
//             <button
//               className="close-button bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out mt-4 shadow-md"
//               onClick={handleClosePopup}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AudioRecorder;



//! Last updated code

// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ClearIcon from '@mui/icons-material/Clear'; // Import ClearIcon from MUI

// const AudioRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlobUrl, setAudioBlobUrl] = useState(null);
//   const [status, setStatus] = useState('Ready to Record');
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const audioRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const timerRef = useRef(null);
//   const navigate = useNavigate();

//   const startTimer = () => {
//     timerRef.current = setInterval(() => {
//       setRecordingTime((prevTime) => prevTime + 1);
//     }, 1000);
//   };

//   const stopTimer = () => {
//     clearInterval(timerRef.current);
//   };

//   const handleStartRecording = () => {
//     if (isRecording) return;

//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((stream) => {
//         audioRecorderRef.current = new MediaRecorder(stream);

//         audioRecorderRef.current.ondataavailable = (event) => {
//           if (event.data.size > 0) {
//             audioChunksRef.current.push(event.data);
//           }
//         };

//         audioRecorderRef.current.onstop = () => {
//           const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//           const url = URL.createObjectURL(blob);
//           setAudioBlobUrl(url);
//           audioChunksRef.current = [];
//           setIsRecording(false);
//           setIsPopupOpen(true);
//           stopTimer();
//           stream.getTracks().forEach((track) => track.stop());
//         };

//         audioRecorderRef.current.start();
//         setStatus('Recording...');
//         setIsRecording(true);
//         setRecordingTime(0);
//         startTimer();
//       })
//       .catch((error) => {
//         console.error('Error accessing audio devices.', error);
//         setStatus('Failed to access audio devices');
//       });
//   };

//   const handleStopRecording = () => {
//     if (audioRecorderRef.current && isRecording) {
//       audioRecorderRef.current.stop();
//     }
//   };

//   const handleClosePopup = () => {
//     if (audioBlobUrl) {
//       URL.revokeObjectURL(audioBlobUrl);
//     }
//     setAudioBlobUrl(null);
//     setIsPopupOpen(false);
//     setStatus('Ready to Record');
//     navigate("/camera");
//   };

//   const formatTime = (timeInSeconds) => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = timeInSeconds % 60;
//     return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100">
//       {/* Custom Header */}
//       <div
//         className="h-[106px] bg-[#125B57] z-[90] relative flex justify-center items-center w-full"
//         style={{
//           borderTopLeftRadius: '0px',
//           borderTopRightRadius: '0px',
//           borderBottomLeftRadius: '36px',
//           borderBottomRightRadius: '36px',
//           boxShadow: '0px 4px 4px 0px #00000040',
//         }}
//       >
//         <div className="absolute left-[18.95px]">
//           <ClearIcon className="text-[#FFFFFF] cursor-pointer" onClick={() => navigate(-1)} />
//         </div>
//         <div className="absolute">
//           <p className="font-inter font-[500] text-[16px] leading-[19.36px] text-[#FFFFFF]">
//             Citizen scientist kit
//           </p>
//         </div>
//       </div>

//       {/* Main Content Section */}
//       <div className="flex flex-col items-center justify-center w-full max-w-sm mt-20">
//         {!isPopupOpen ? (
//           <div className="bg-white shadow-md rounded-lg p-8 w-full text-center">
//             {isRecording ? (
//               <div>
//                 <button
//                   onClick={handleStopRecording}
//                   className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300 ease-in-out shadow-md"
//                 >
//                   Stop Recording
//                 </button>
//                 <div className="mt-4 text-xl font-bold text-gray-700">
//                   Recording Time: {formatTime(recordingTime)}
//                 </div>
//               </div>
//             ) : (
//               <button
//                 onClick={handleStartRecording}
//                 className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 ease-in-out shadow-md"
//               >
//                 Open Audio Recorder
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="popup-content bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-center">
//               <audio src={audioBlobUrl} controls autoPlay className="w-full mt-4" />
//               <button
//                 className="close-button bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out mt-4 shadow-md"
//                 onClick={handleClosePopup}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AudioRecorder;






import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear'; // Import ClearIcon from MUI
import { api_url } from '../../../constants';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null); // New state to hold the audio blob
  const [status, setStatus] = useState('Ready to Record');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const audioRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const handleStartRecording = () => {
    if (isRecording) return;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioRecorderRef.current = new MediaRecorder(stream);

        audioRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        audioRecorderRef.current.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/weba' });
          const url = URL.createObjectURL(blob);
          setAudioBlobUrl(url);
          setAudioBlob(blob); // Store the audio blob
          audioChunksRef.current = [];
          setIsRecording(false);
          setIsPopupOpen(true);
          stopTimer();
          stream.getTracks().forEach((track) => track.stop());
        };

        audioRecorderRef.current.start();
        setStatus('Recording...');
        setIsRecording(true);
        setRecordingTime(0);
        startTimer();
      })
      .catch((error) => {
        console.error('Error accessing audio devices.', error);
        setStatus('Failed to access audio devices');
      });
  };

  const handleStopRecording = () => {
    if (audioRecorderRef.current && isRecording) {
      audioRecorderRef.current.stop();
    }
  };

  const handleClosePopup = () => {
    if (audioBlobUrl) {
      URL.revokeObjectURL(audioBlobUrl);
    }

    // Upload audio to backend after closing the popup
    if (audioBlob) {
      console.log("hi");
      uploadAudio(audioBlob);
    }

    setAudioBlobUrl(null);
    setAudioBlob(null);
    setIsPopupOpen(false);
    setStatus('Ready to Record');
    navigate('/camera');
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const uploadAudio = async (blob, description) => {
    try {
      // Get current position and proceed once we have the coordinates
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
  
      const { latitude, longitude } = position.coords;
      localStorage.setItem('latitude', latitude);
      localStorage.setItem('longitude', longitude);
  
      const formData = new FormData();
      formData.append('signaturefile', blob, 'recording.weba');
      formData.append('latitude', latitude); // Use actual latitude
      formData.append('longitude', longitude); // Use actual longitude
      formData.append('userid', localStorage.getItem('userid'));
      formData.append('description', "This is my audio");
      formData.append('username', localStorage.getItem('username'));
  
      console.log('Sending audio data to backend...');
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
      console.log('Audio uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100">
      {/* Custom Header */}
      <div
        className="h-[106px] bg-[#125B57] z-[90] relative flex justify-center items-center w-full"
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
          <p className="font-inter font-[500] text-[16px] leading-[19.36px] text-[#FFFFFF]">
            Citizen scientist kit
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col items-center justify-center w-full max-w-sm mt-20">
        {!isPopupOpen ? (
          <div className="bg-white shadow-md rounded-lg p-8 w-full text-center">
            {isRecording ? (
              <div>
                <button
                  onClick={handleStopRecording}
                  className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300 ease-in-out shadow-md"
                >
                  Stop Recording
                </button>
                <div className="mt-4 text-xl font-bold text-gray-700">
                  Recording Time: {formatTime(recordingTime)}
                </div>
              </div>
            ) : (
              <button
                onClick={handleStartRecording}
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 ease-in-out shadow-md"
              >
                Open Audio Recorder
              </button>
            )}
          </div>
        ) : (
          <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="popup-content bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-center">
              <audio src={audioBlobUrl} controls autoPlay className="w-full mt-4" />
              <button
                className="close-button bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out mt-4 shadow-md"
                onClick={handleClosePopup}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;

