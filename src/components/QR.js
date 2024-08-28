
// import React, { useEffect, useState,useContext } from 'react';
// import QRCodeScanner from './QRCodeScanner'; // Import the updated component
// import QR_Static from './components/Common_Components/QR_Static';

// import QR_Header from './QR_Header';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Footer from './Footer';
// import { useNavigate } from 'react-router-dom';
// import { MyContext } from '../context/accountProvider';

// const QRComponent = () => {
 


//   const [scannedData, setScannedData] = useState('');
//   const [filterData, setFilterData] = useState([]);
//   const [isScanning, setIsScanning] = useState(true);
//   const [showPopup, setShowPopup] = useState(false);
//   const [jsonData, setJsonData] = useState([]);
//   const fixedColor = '#125B57';
//   const [qrId,setQrId] = useState("")

//   const navigate = useNavigate()
//   const {setToken} = useContext(MyContext)



//   useEffect(() => {
//     const checkToken = () => {
//       const storedToken = localStorage.getItem('token');
//       if (!storedToken) {
//         setToken(null);
//         navigate('/');
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
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Log message for debugging
//         console.log('Fetching data from /dataset.json');
        
//         // Fetch the data
//         const response = await fetch(`${process.env.PUBLIC_URL}/dataset.json`);
        
//         // Check if the response is okay
//         if (!response.ok) {
//           throw new Error("Response is not coming");
//         }
        
//         // Log response body for debugging
//         const data = await response.json();
//         console.log('Fetched data:', data);
        
//         // Set the state with the fetched data
//         setJsonData(data);
        
//       } catch (error) {
//         // Log any errors that occur
//         console.error("Error fetching dataset.json:", error);
//       }
//     };
  
//     // Call the fetch function
//     fetchData();
//   }, []);
  
 

//   const handleScan = (data) => {
//     setScannedData(data);
//     // Filter data based on scanned QR code
//     const filteredData = jsonData && jsonData.filter((ele) => ele.qr_id === data);
//     setFilterData(filteredData);
//     setIsScanning(false); // Stop scanning when QR code is detected
//     setShowPopup(true); // Show popup when QR code is scanned
//   };

//   const handleBack = () => {
//     setScannedData('');
//     setFilterData([]);
//     setIsScanning(true); // Resume scanning
//     setShowPopup(false); // Hide popup
//   };

//   return (
//     <div className='w-[100%]'>
//     <div className='top_header'>
//     <QR_Header title="Qr Scan"/>
//     </div>
      
//       <div className="main_Container">
//         {scannedData && scannedData ? <QR_Static/> : <QRCodeScanner onScan={handleScan} isScanning={isScanning} setQrId={setQrId} />}
//         {showPopup && (
//           <div className="popupOverlay" onClick={handleBack}>
//             <div className="popupContent" onClick={(e) => e.stopPropagation()}>
//               {filterData.length > 0 ? (
//                 filterData.map((data) => (
//                   <div key={data.qr_id}>
                    
                   
//                     <p> {data.name}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No data found</p>
//               )}
//               <div className="w-[35px] h-[35px] rounded-full bg-white flex justify-center items-center">
//               <ArrowForwardIosIcon className="text-black !text-[15px]" onClick={()=>navigate(`/qrDetails/${qrId}`)}/>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <section className="mt-16">
//     <Footer color={fixedColor} /> 
//     </section>
//       </div>
//   );
// };

// export default QRComponent;

import React, { useEffect, useState, useContext } from 'react';
import QRCodeScanner from './QRCodeScanner'; // Import the updated component
import QR_Static from './components/Common_Components/QR_Static';
import QR_Header from './QR_Header';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/accountProvider';
import LoadingAnimation from './LoadingAnimation';

const QRComponent = () => {
  const fixedColor = '#125B57';
  const [scannedData, setScannedData] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [isScanning, setIsScanning] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [jsonData, setJsonData] = useState([]);
  const [isReady, setIsReady] = useState(false); // State to manage delay
  const [qrId, setQrId] = useState('');

  const navigate = useNavigate();
  const { setToken } = useContext(MyContext);

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
    const fetchData = async () => {
      try {
        // Log message for debugging
        console.log('Fetching data from /dataset.json');

        // Fetch the data
        const response = await fetch(`${process.env.PUBLIC_URL}/dataset.json`);

        // Check if the response is okay
        if (!response.ok) {
          throw new Error("Response is not coming");
        }

        // Log response body for debugging
        const data = await response.json();
        console.log('Fetched data:', data);

        // Set the state with the fetched data
        setJsonData(data);
        
        // Delay rendering by 1 second
        setTimeout(() => {
          setIsReady(true);
        }, 1000); // 1000 milliseconds = 1 second

      } catch (error) {
        // Log any errors that occur
        console.error("Error fetching dataset.json:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Add overflow: hidden to html element when component mounts
    document.documentElement.style.overflow = 'hidden';

    // Remove overflow: hidden from html element when component unmounts
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  const handleScan = (data) => {
    setScannedData(data);
    // Filter data based on scanned QR code
    const filteredData = jsonData && jsonData.filter((ele) => ele.qr_id === data);
    setFilterData(filteredData);
    setIsScanning(false); // Stop scanning when QR code is detected
    setShowPopup(true); // Show popup when QR code is scanned
  };

  const handleBack = () => {
    setScannedData('');
    setFilterData([]);
    setIsScanning(true); // Resume scanning
    setShowPopup(false); // Hide popup
  };

  if (!isReady) {
    return <LoadingAnimation/> // Render a loader while waiting
  }

  return (
    <div className='w-[100%] ' >
      <div className='top_header'>
        <QR_Header title="Qr Scan" />
      </div>

      <div className="main_Container">
        {scannedData && scannedData ? <QR_Static /> : <QRCodeScanner onScan={handleScan} isScanning={isScanning} setQrId={setQrId} />}
        {showPopup && (
          <div className="popupOverlay" onClick={handleBack}>
            <div className="popupContent" onClick={(e) => e.stopPropagation()}>
              {filterData.length > 0 ? (
                filterData.map((data) => (
                  <div key={data.qr_id}>
                    <p>{data.name}</p>
                  </div>
                ))
              ) : (
                <p>No data found</p>
              )}
              <div className="w-[35px] h-[35px] rounded-full bg-white flex justify-center items-center">
                <ArrowForwardIosIcon className="text-black !text-[15px]" onClick={() => navigate(`/qrDetails/${qrId}`)} />
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="mt-[0px]">
        <Footer color={fixedColor} />
      </section>
    </div>
  );
};

export default QRComponent;
