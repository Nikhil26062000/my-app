// import React, { useEffect, useState,useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSession } from '../components/SessionContext'; 
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../styles/DetailedSummary.css';
// import { MyContext } from '../context/accountProvider';

// const DetailedSummary = () => {
//   const { regionId } = useParams();
//   const navigate = useNavigate();
//   const [regionData, setRegionData] = useState(null);
//   const [error, setError] = useState(null);

//   const { session } = useSession();
//   const {setToken} = useContext(MyContext)
//   // const headerFooterColor = session.headerFooterColor || '#000'; 


//   const [headerFooterColor, setHeaderFooterColor] = useState('#125B57'); // Sta
//   const fixedColor = '#125B57';
//   useEffect(() => {
//     const storedColor = sessionStorage.getItem('headerFooterColor') || fixedColor;
//     sessionStorage.setItem('headerFooterColor', storedColor);
//     setHeaderFooterColor(storedColor);
//   }, []);


//   useEffect(() => {
//     console.log('Fetching data for regionId:', regionId);

//     fetch('https://farmersforforests.org/admin/acc/appdata/summarypage', {
//       method: 'POST',
//       body: JSON.stringify({ region_id: regionId }),
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Network response was not ok: ${response.statusText}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Fetched data:', data);

//         if (data && data.region_id === regionId) {
//           setRegionData({
//             title: data.title,
//             description: data.discription, 
//             region_name: data.region_name,
//           });
//         } else {
//           setError('No data found for the specified region');
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching region data:', error);
//         setError('Error fetching region data');
//       });
//   }, [regionId]);

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

//   const handleButtonClick = () => {
//     navigate(`/region/${regionId}/itemlist`);
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!regionData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="detailed-summary">
//       <Header title={regionData.region_name} color={headerFooterColor} />
//       <div className="DSbody">
//       <h2 className="RegionOverview text-[16px]">{regionData.title}</h2>
//       <p className="shortdescripiton text-justify text-[14px] ">{regionData.description}</p>
//       <button 
//         className="detailed-info-button" 
//         onClick={handleButtonClick}
//         style={{
//           backgroundColor: headerFooterColor, 
//           color: '#FFFFFF', 
//           border: 'none',
//           padding: '10px 20px',
//           fontSize: '16px',
//           cursor: 'pointer',
//           borderRadius: '20px',
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//           marginTop:'50px',
//           marginBottom:'50px',
          
//         }}
//       >
//         Detailed Information
//       </button>
//       </div>
//       <Footer color={headerFooterColor} />
//     </div>
//   );
// };

// export default DetailedSummary;


import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSession } from '../components/SessionContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/DetailedSummary.css';
import { MyContext } from '../context/accountProvider';
import LoadingAnimation from '../components/LoadingAnimation'; // Import the loading animation component

const DetailedSummary = () => {
  const { regionId } = useParams();
  const navigate = useNavigate();
  const [regionData, setRegionData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading

  const { session } = useSession();
  const { setToken } = useContext(MyContext);

  const [headerFooterColor, setHeaderFooterColor] = useState('#125B57');
  const fixedColor = '#125B57';

  useEffect(() => {
    const storedColor = sessionStorage.getItem('headerFooterColor') || fixedColor;
    sessionStorage.setItem('headerFooterColor', storedColor);
    setHeaderFooterColor(storedColor);
  }, []);

  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setToken(null);
        navigate('/');
      }
    };

    checkToken();
    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, [navigate, setToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://farmersforforests.org/admin/acc/appdata/summarypage', {
          method: 'POST',
          body: JSON.stringify({ region_id: regionId }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        if (data && data.region_id === regionId) {
          setRegionData({
            title: data.title,
            description: data.discription,
            region_name: data.region_name,
          });
        } else {
          setError('No data found for the specified region');
        }
      } catch (error) {
        console.error('Error fetching region data:', error);
        setError('Error fetching region data');
      } finally {
        // Set loading to false after data fetch, but keep animation for 1 second
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchData();
  }, [regionId]);

  const handleButtonClick = () => {
    navigate(`/region/${regionId}/itemlist`);
  };

  if (loading) {
    return <LoadingAnimation />; // Show the loading animation
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="detailed-summary">
      <Header title={regionData.region_name} color={headerFooterColor} />
      <div className="DSbody">
        <h2 className="RegionOverview text-[16px]">{regionData.title}</h2>
        <p className="shortdescripiton text-justify text-[14px]">{regionData.description}</p>
        <button 
          className="detailed-info-button" 
          onClick={handleButtonClick}
          style={{
            backgroundColor: headerFooterColor, 
            color: '#FFFFFF', 
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            marginTop: '50px',
            marginBottom: '50px',
          }}
        >
          Detailed Information
        </button>
      </div>
      <Footer color={headerFooterColor} />
    </div>
  );
};

export default DetailedSummary;
