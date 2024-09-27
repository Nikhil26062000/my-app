// import React, { useState, useRef,useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MyContext } from '../../context/accountProvider';
// import Webcam from 'react-webcam';
// import ClearIcon from '@mui/icons-material/Clear';
// import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
// import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
// import Footer from '../../components/Footer';
// import { toast } from 'react-toastify';

// const MediaCapture = ({ title }) => {
//   const webcamRef = useRef(null);
//   const [facingMode, setFacingMode] = useState('user');
//   const [popupMessage, setPopupMessage] = useState('');
//   const fixedColor = '#125B57';
//   const navigate = useNavigate()
//   const {setToken} = useContext(MyContext)



//   useEffect(() => {
//     const checkToken = () => {
//       const storedToken = localStorage.getItem('token');
//       if (!storedToken) {
//         setToken(null);
//         navigate('/login');
//       }
//     };

//     // Run on initial load
//     checkToken();

//     // Run when localStorage changes
//     window.addEventListener('storage', checkToken);

//     return () => {
//       window.removeEventListener('storage', checkToken);
//     };
//   }, [navigate, setToken]);

  

//   const capture = () => {
//     // Get the user's location first
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           console.log('Latitude:', latitude, 'Longitude:', longitude);
  
//           // Check if the webcam reference exists before capturing the image
//           if (webcamRef.current) {
//             const imageSrc = webcamRef.current.getScreenshot();
  
//             if (imageSrc) {
//               // Decode the base64 string (after the comma) to binary data
//               const byteString = atob(imageSrc.split(',')[1]);
  
//               // Create an array buffer to store the binary data
//               const arrayBuffer = new ArrayBuffer(byteString.length);
//               const uint8Array = new Uint8Array(arrayBuffer);
  
//               // Convert the binary string to a Uint8Array
//               for (let i = 0; i < byteString.length; i++) {
//                 uint8Array[i] = byteString.charCodeAt(i);
//               }
  
//               // Convert the Uint8Array to a Blob (which can be sent as binary data)
//               const blob = new Blob([uint8Array], { type: 'image/jpeg' });
  
//               // Prepare the form data to send to the backend
//               const formData = new FormData();
//               formData.append('signaturefile', blob, 'captured-image.jpg');
//               formData.append('latitude', latitude);
//               formData.append('longitude', longitude);
//               formData.append('userid', localStorage.getItem('userid'));

  
//               // Send the data to your backend
//               fetch('https://farmersforforests.org/admin/acc/appdata/usersignature', {
//                 method: 'POST',
//                 body: formData,
//               })
//                 .then(response => {
//                   if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                   }
//                   // Check for JSON content type
//                   const contentType = response.headers.get('content-type');
//                   if (contentType && contentType.includes('application/json')) {
//                     // console.log(response.json());
//                     return response.json(); // Parse JSON response
//                   } else {
//                     // Handle non-JSON responses
//                     // console.log(response.text());
                    
//                     return response.text(); // Or handle as needed
//                   }
//                 })
//                 .then(data => {
//                   console.log('Success:', data);
//                   toast.success(data.msgtext);
//                   setPopupMessage('Image and location uploaded successfully!');
//                 })
//                 .catch((error) => {
//                   console.error('Error:', error);
//                   toast.error(error.message);
//                   setPopupMessage('Failed to upload image and location.');
//                 });
  
//               // Set the popup message based on the current facing mode
//               const message = facingMode === 'user' ? 'Picture captured from the front camera!' : 'Picture captured from the back camera!';
//               setPopupMessage(message);
  
//               // Clear the message after 2 seconds
//               setTimeout(() => setPopupMessage(''), 2000);
//             } else {
//               setPopupMessage('Failed to capture image.');
//               setTimeout(() => setPopupMessage(''), 2000);
//             }
//           } else {
//             console.error('Webcam not available.');
//             setPopupMessage('Webcam not available.');
//             setTimeout(() => setPopupMessage(''), 2000);
//           }
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//           setPopupMessage('Failed to capture location.');
//           setTimeout(() => setPopupMessage(''), 2000);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//       setPopupMessage('Geolocation not supported.');
//       setTimeout(() => setPopupMessage(''), 2000);
//     }
//   };
  

//   const toggleCamera = () => {
//     setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Header */}
//       <div
//         className="h-[106px] bg-[#125B57] z-[90] relative flex justify-center items-center"
//         style={{
//           borderTopLeftRadius: '0px',
//           borderTopRightRadius: '0px',
//           borderBottomLeftRadius: '36px',
//           borderBottomRightRadius: '36px',
//           boxShadow: '0px 4px 4px 0px #00000040' 
//         }}
//       >
//         <div className="absolute left-[18.95px]">
//           <ClearIcon className="text-[#FFFFFF] cursor-pointer" />
//         </div>
//         <div className="absolute">
//           <p className="font-inter font-[500] text-[16px] leading-[19.36px] text-[#FFFFFF]">Citizen scientist kit</p>
//         </div>
//       </div>

//       {/* Camera and Controls */}
//       <div className="relative mt-[-40px] flex flex-col items-center justify-end flex-1">
//         {/* Webcam */}
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           videoConstraints={{ facingMode }}
//           className="absolute top-0 left-0 w-full h-full object-cover"
//         />

//         {/* Dummy Options (Photo, Video, Audio) */}
//         <div className="flex space-x-6 mb-4 z-[1000] ">
//           <button className="text-white font-inter font-[500] text-[16px] leading-[19.36px]">VIDEO</button>
//           <button className="text-white font-inter font-[500] text-[16px] leading-[19.36px]">PHOTO</button>
//           <button className="text-white font-inter font-[500] text-[16px] leading-[19.36px]">AUDIO</button>
//         </div>

//         {/* Capture and Camera Switch Buttons */}
//         <div className="flex space-x-6 mb-6 pb-[50px] z-[1000]">
//           <button className="w-14 h-14 text-white rounded-full shadow-lg hover:bg-green-600 flex items-center justify-center">
//             <PhotoSizeSelectActualIcon className='w-[32px] h-[20px]' />
//           </button>
//           <button
//             onClick={capture}
//             className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center"
//           >
//             <span className="sr-only">Capture</span>
//           </button>
//           <button
//             onClick={toggleCamera}
//             className="w-14 h-14 text-white rounded-full shadow-lg flex items-center justify-center">
//             <CameraswitchIcon  className='w-[32px] h-[32px]'/>
//           </button>
//         </div>

//         {/* Popup Notification */}
//         {popupMessage && (
//           <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
//             {popupMessage}
//           </div>
//         )}
//       </div>

//       <section className="mt-10">
//     <Footer color={fixedColor} /> 
//     </section>
//     </div>
//   );
// };

// export default MediaCapture;


// import React, { useState, useRef, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MyContext } from '../../context/accountProvider';
// import Webcam from 'react-webcam';
// import ClearIcon from '@mui/icons-material/Clear';
// import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
// import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
// import Footer from '../../components/Footer';
// import { toast } from 'react-toastify';

// const MediaCapture = ({ title }) => {
//   const webcamRef = useRef(null);
//   const [facingMode, setFacingMode] = useState('user');
//   const [popupMessage, setPopupMessage] = useState('');
//   const [imageSrc, setImageSrc] = useState(null); // State to store captured image
//   const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
//   const fixedColor = '#125B57';
//   const navigate = useNavigate();
//   const { setToken } = useContext(MyContext);

//   useEffect(() => {
//     const checkToken = () => {
//       const storedToken = localStorage.getItem('token');
//       if (!storedToken) {
//         setToken(null);
//         navigate('/login');
//       }
//     };

//     // Run on initial load
//     checkToken();

//     // Run when localStorage changes
//     window.addEventListener('storage', checkToken);

//     return () => {
//       window.removeEventListener('storage', checkToken);
//     };
//   }, [navigate, setToken]);

//   const capture = () => {
//     // Get the user's location first
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           console.log('Latitude:', latitude, 'Longitude:', longitude);

//           // Check if the webcam reference exists before capturing the image
//           if (webcamRef.current) {
//             const imageSrc = webcamRef.current.getScreenshot();

//             if (imageSrc) {
//               // Decode the base64 string (after the comma) to binary data
//               const byteString = atob(imageSrc.split(',')[1]);

//               // Create an array buffer to store the binary data
//               const arrayBuffer = new ArrayBuffer(byteString.length);
//               const uint8Array = new Uint8Array(arrayBuffer);

//               // Convert the binary string to a Uint8Array
//               for (let i = 0; i < byteString.length; i++) {
//                 uint8Array[i] = byteString.charCodeAt(i);
//               }

//               // Convert the Uint8Array to a Blob (which can be sent as binary data)
//               const blob = new Blob([uint8Array], { type: 'image/jpeg' });

//               // Prepare the form data to send to the backend
//               const formData = new FormData();
//               formData.append('signaturefile', blob, 'captured-image.jpg');
//               formData.append('latitude', latitude);
//               formData.append('longitude', longitude);
//               formData.append('userid', localStorage.getItem('userid'));
//               formData.append('username', localStorage.getItem('username'));

//               // Send the data to your backend
//               fetch('https://farmersforforests.org/admin/acc/appdata/usersignature', {
//                 method: 'POST',
//                 body: formData,
//               })
//                 .then(response => {
//                   if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                   }
//                   // Check for JSON content type
//                   const contentType = response.headers.get('content-type');
//                   if (contentType && contentType.includes('application/json')) {
//                     return response.json(); // Parse JSON response
//                   } else {
//                     return response.text(); // Or handle as needed
//                   }
//                 })
//                 .then(data => {
//                   console.log('Success:', data);
//                   toast.success(data.msgtext);
//                   setPopupMessage('Image and location uploaded successfully!');
//                 })
//                 .catch((error) => {
//                   console.error('Error:', error);
//                   toast.error(error.message);
//                   setPopupMessage('Failed to upload image and location.');
//                 });

//               // Show the image in the popup
//               setImageSrc(imageSrc);
//               setShowPopup(true);

//               // Set the popup message based on the current facing mode
//               const message = facingMode === 'user' ? 'Picture captured from the front camera!' : 'Picture captured from the back camera!';
//               setPopupMessage(message);

//               // Clear the message after 2 seconds
//               setTimeout(() => setPopupMessage(''), 2000);
//             } else {
//               setPopupMessage('Failed to capture image.');
//               setTimeout(() => setPopupMessage(''), 2000);
//             }
//           } else {
//             console.error('Webcam not available.');
//             setPopupMessage('Webcam not available.');
//             setTimeout(() => setPopupMessage(''), 2000);
//           }
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//           setPopupMessage('Failed to capture location.');
//           setTimeout(() => setPopupMessage(''), 2000);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//       setPopupMessage('Geolocation not supported.');
//       setTimeout(() => setPopupMessage(''), 2000);
//     }
//   };

//   const toggleCamera = () => {
//     setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//     setImageSrc(null); // Clear the image source
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Header */}
//       <div
//         className="h-[106px] bg-[#125B57] z-[90] relative flex justify-center items-center"
//         style={{
//           borderTopLeftRadius: '0px',
//           borderTopRightRadius: '0px',
//           borderBottomLeftRadius: '36px',
//           borderBottomRightRadius: '36px',
//           boxShadow: '0px 4px 4px 0px #00000040' 
//         }}
//       >
//         <div className="absolute left-[18.95px]">
//           <ClearIcon className="text-[#FFFFFF] cursor-pointer" onClick={()=>navigate(-1)} />
//         </div>
//         <div className="absolute">
//           <p className="font-inter font-[500] text-[16px] leading-[19.36px] text-[#FFFFFF]">Citizen scientist kit</p>
//         </div>
//       </div>

//       {/* Camera and Controls */}
//       <div className="relative mt-[-40px] flex flex-col items-center justify-end flex-1">
//         {/* Webcam */}
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           videoConstraints={{ facingMode }}
//           className="absolute top-0 left-0 w-full h-full object-cover"
//         />

//         {/* Dummy Options (Photo, Video, Audio) */}
//         <div className="flex space-x-6 mb-4 z-[1000] ">
//           <button className="text-white font-inter font-[500] text-[16px] leading-[19.36px]">VIDEO</button>
//           <button className="text-white font-inter font-[500] text-[16px] leading-[19.36px]">PHOTO</button>
//           <button className="text-white font-inter font-[500] text-[16px] leading-[19.36px]">AUDIO</button>
//         </div>

//         {/* Capture and Camera Switch Buttons */}
//         <div className="flex space-x-6 mb-6 pb-[75px] z-[1000]">
//           <button className="w-14 h-14 text-white rounded-full shadow-lg hover:bg-green-600 flex items-center justify-center">
//             <PhotoSizeSelectActualIcon className='w-[32px] h-[20px]' />
//           </button>
//           <button
//             onClick={capture}
//             className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center"
//           >
//             <span className="sr-only">Capture</span>
//           </button>
//           <button
//             onClick={toggleCamera}
//             className="w-14 h-14 text-white rounded-full shadow-lg flex items-center justify-center">
//             <CameraswitchIcon className='w-[32px] h-[32px]'/>
//           </button>
//         </div>

//         {/* Popup Notification */}
//         {popupMessage && (
//           <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
//             {popupMessage}
//           </div>
//         )}

//         {/* Image Popup */}
//         {showPopup && (
//           <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-[1000]">
//             <div className="relative bg-gray-400 p-4 rounded-lg">
//               <button
//                 onClick={closePopup}
//                 className="absolute top-4 right-4 text-white"
//               >
//                 <ClearIcon />
//               </button>
//               <img src={imageSrc} alt="Captured" className="w-[200px] h-auto rounded-lg" />
//             </div>
//           </div>
//         )}
//       </div>

//       <section className="mt-10">
//         <Footer color={fixedColor} /> 
//       </section>
//     </div>
//   );
// };

// export default MediaCapture;




import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/accountProvider';
import Webcam from 'react-webcam';
import ClearIcon from '@mui/icons-material/Clear';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';
import SendIcon from '@mui/icons-material/Send';
import LoadingAnimation from '../../components/LoadingAnimation';
import { api_url } from '../../constants';
import axiosInstance from '../../utils/axiosInstance';
// import { Toast } from 'react-toastify/dist/components';

const MediaCapture = ({ title }) => {
  const webcamRef = useRef(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [popupMessage, setPopupMessage] = useState('');
  const [imageSrc, setImageSrc] = useState(null); // State to store captured image
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [description, setDescription] = useState(''); // State for image description
  const fixedColor = '#125B57';
  const [isLoading, setIsLoading] = useState(true); // State for loader

  const navigate = useNavigate();
  const { setToken } = useContext(MyContext);


  function _jsonTrim(jsonArray){
    return JSON.parse(JSON.stringify(jsonArray).replace(/"\s+|\s+"/g,'"'))
}

  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setToken(null);
        navigate('/');
      }
    };

    // Run on initial load
    checkToken();

    // Run when localStorage changes
    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, [navigate, setToken]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const capture = () => {
    // Get the user's location first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem('latitude', latitude); // Store latitude
          localStorage.setItem('longitude', longitude); // Store longitude

          // Check if the webcam reference exists before capturing the image
          if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();

            if (imageSrc) {
              setImageSrc(imageSrc);
              setShowPopup(true);

              const message = facingMode === 'user' ? 'Picture captured from the front camera!' : 'Picture captured from the back camera!';
              setPopupMessage(message);

              setTimeout(() => setPopupMessage(''), 1000);
            } else {
              setPopupMessage('Failed to capture image.');
              setTimeout(() => setPopupMessage(''), 2000);
            }
          } else {
            console.error('Webcam not available.');
            setPopupMessage('Webcam not available.');
            setTimeout(() => setPopupMessage(''), 2000);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setPopupMessage('Failed to capture location.');
          setTimeout(() => setPopupMessage(''), 2000);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setPopupMessage('Geolocation not supported.');
      setTimeout(() => setPopupMessage(''), 2000);
    }
  };

  const toggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  const closePopup = () => {
    setShowPopup(false);
    setImageSrc(null); // Clear the image source
    setDescription(''); // Clear the descriptions
  };

  const sendImage = async () => {
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');
  
    // Decode base64 string to binary data
    const byteString = atob(imageSrc.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
  
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });
  
    const formData = new FormData();
    formData.append('signaturefile', blob, 'captured-image.jpg');
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('userid', localStorage.getItem('userid'));
    formData.append('description', description);
    formData.append('username', localStorage.getItem('username'));
  
    try {
      console.log(`${api_url}/admin/acc/appdata/usersignature`);
      const response = await  axiosInstance.post('/admin/acc/appdata/usersignature',formData);
      console.log(response);
  
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // console.log(response)
  
      // const contentType = response.headers.get('content-type');
      // let data;
  
      // if (contentType && contentType.includes('application/json')) {
      //   data = await response.json();
      // } else {
      //   const text = await response.text();
      //   data = { msgtext: text };
      // }
      // console.log(data);
      toast.success(response.data.msgtext);
      setPopupMessage(response.data.msgtext);
      closePopup();
      setTimeout(() => setPopupMessage(''), 1000);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
      setPopupMessage('Failed to upload image and location.');
    }
  };

 if(isLoading){
  return <LoadingAnimation/>
 }

  return (
   <div className="flex flex-col h-screen">
      {/* Header */}
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

      {/* Camera and Controls */}
      <div className="relative mt-[-40px] flex flex-col items-center justify-end flex-1">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode }}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        <div className="flex space-x-6 mb-4 z-[1000]">
          <button className="text-white font-inter font-[500] text-[16px] leading-[19.36px]">VIDEO</button>
          <button className="text-white font-inter font-[500] text-[16px] leading-[19.36px] underline">PHOTO</button>
          <button className="text-white font-inter font-[500] text-[16px] leading-[19.36px]" onClick={()=>navigate("/audio")}>AUDIO</button>
        </div>

        <div className="flex space-x-6 mb-6 pb-[100px] z-[1000]">
          <button className="w-14 h-14 text-white opacity-30 rounded-full shadow-lg hover:bg-green-600 flex items-center justify-center">
            <PhotoSizeSelectActualIcon className="w-[32px] h-[20px]" />
          </button>
          <button
            onClick={capture}
            className="w-16 h-16 bg-white opacity-30 rounded-full shadow-lg flex items-center justify-center"
          >
            <span className="sr-only">Capture</span>
          </button>
          <button
            onClick={toggleCamera}
            className="w-14 h-14 text-white opacity-30 rounded-full shadow-lg flex items-center justify-center"
          >
            <CameraswitchIcon className="w-[32px] h-[32px]" />
          </button>
        </div>

        {/* Popup Notification */}
        {popupMessage && (
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
            {popupMessage}
          </div>
        )}

        {/* Image Popup with Description and Send Button */}
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full pb-24 flex items-start justify-center bg-black bg-opacity-100 z-[3000]">
            <div className="relative bg-white rounded-lg max-w-[90%]">
              <button
                onClick={closePopup}
                className="absolute top-3 right-3 bg-[rgb(55_65_81/63%)]   text-white rounded-full p-[3px] text-[6px] "
              >
                <ClearIcon />
              </button>
              <img src={imageSrc} alt="Captured" className="w-full h-auto  mb-4" />
              <textarea
                value={description}
                
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description..."
                className="w-[96%] mx-[2%] !h-[100px] resize-none  py-2 px-2 mb-4 border-2 rounded-lg"
                rows="3"
              />
             <div className="w-[96%] mr-[2%] mb-2 flex justify-end">
             <button
                onClick={sendImage}
                className="w-[40px] h-[40px] bg-[#125B57] flex justify-center items-center text-white py-2 px-2 rounded-full"
              >
                <SendIcon className="text-[20px]"/>
              </button>
             </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer color="#125b57" title={title} />
    </div>
  );
};

export default MediaCapture;















