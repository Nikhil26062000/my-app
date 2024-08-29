// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
// import { MyContext } from '../context/accountProvider';

// const ItemList = () => {
//   const { regionId } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [regionName, setRegionName] = useState('');
//   const navigate = useNavigate();
//   const { token, setToken } = useContext(MyContext);
//   const [headerFooterColor, setHeaderFooterColor] = useState('#125B57');
//   const [num_of_species, setNumOfSpecies] = useState([]);
//   const [allItems, setAllItems] = useState([]);
//   const [filterItem, setFilterItem] = useState([]);
//   const [filteredValue, setFilterValue] = useState('All'); // 'All' selected by default

//   const fixedColor = '#125B57';

//   useEffect(() => {
//     const storedColor = sessionStorage.getItem('headerFooterColor') || fixedColor;
//     sessionStorage.setItem('headerFooterColor', storedColor);
//     setHeaderFooterColor(storedColor);
//   }, []);

//   useEffect(() => {
//     const checkToken = () => {
//       const storedToken = localStorage.getItem('token');
//       if (!storedToken) {
//         setToken(null);
//         navigate('/login');
//       }
//     };

//     checkToken();
//     window.addEventListener('storage', checkToken);

//     return () => {
//       window.removeEventListener('storage', checkToken);
//     };
//   }, [navigate, setToken]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (regionId) {
//           const response = await axios.post('https://farmersforforests.org/admin/acc/appdata/specieslistinfo', {
//             region_id: regionId,
//           });

//           setNumOfSpecies(response.data.species_list_name);
//           setAllItems(response.data.species_list_data);
//           setFilterItem(response.data.species_list_data); // Show all items initially

//           if (response.data.species_list_data.length > 0) {
//             setRegionName(response.data.species_list_data[0].region_name);
//           }
//         } else {
//           console.error('Region ID not found');
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [regionId]);

//   const handleButtonClick = (value) => {
//     setFilterValue(value);

//     if (value === 'All') {
//       setFilterItem(allItems); // Show all items when "All" is selected
//     } else {
//       const filteredData = allItems.filter(item => item.species_type === value);
//       setFilterItem(filteredData);
//     }
//   };

//   return (
//     <div className="mx-[20px]">
//       <Header title={regionName} color={headerFooterColor} />
//       <div className="mt-[120px]">
//         <div className="flex justify-start gap-5 py-2 overflow-x-scroll">
//           {/* Add the "All" button */}
//           <button
//             onClick={() => handleButtonClick('All')}
//             style={{
//               ...styles.button,
//               backgroundColor: filteredValue === 'All' ? headerFooterColor : 'transparent',
//               color: filteredValue === 'All' ? '#FFFFFF' : headerFooterColor,
//               borderColor: filteredValue === 'All' ? 'transparent' : headerFooterColor,
//             }}
//           >
//             All
//           </button>

//           {num_of_species && num_of_species.map(option => (
//             <button
//               key={option.species_type_id}
//               onClick={() => handleButtonClick(option.species_type)}
//               style={{
//                 ...styles.button,
//                 backgroundColor: option.species_type === filteredValue ? headerFooterColor : 'transparent',
//                 color: option.species_type === filteredValue ? '#FFFFFF' : headerFooterColor,
//                 borderColor: option.species_type === filteredValue ? 'transparent' : headerFooterColor,
//               }}
//             >
//               {option.species_type}
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <ul className="">
//             {filterItem.length > 0 ? (
//               filterItem.map((item, index) => (
//                 <Link to={`/item/${regionId}/${item.species_id}`} key={index} className="w-full">

//                 <li key={index} className="flex  py-2 border-b border-gray-300">
//                   <img
//                     src= 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'
//                     alt={item.species_common_name}
//                     className="w-32 h-32 object-cover mr-4"
//                   />
//                   <div className="flex flex-col justify-center">
//                     <p className="text-sm text-black">{item.species_type}</p>
//                     <h3 className="text-[16px] font-semibold">{item.species_common_name}</h3>
//                     <p className="text-xs text-gray-500">{item.region_name}</p>
//                   </div>
//                 </li>
//                 </Link>
//               ))
//             ) : (
//               <p>No items found</p>
//             )}
//           </ul>
//         )}
//       </div>

//       <div className="mt-20">
//         <Footer color={headerFooterColor} />
//       </div>
//     </div>
//   );
// };

// // Styles object
// const styles = {
//   button: {
//     padding: '10px 20px',
//     fontSize: '12px',
//     cursor: 'pointer',
//     border: '1px solid',
//     borderRadius: '10px',
//     transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
//     textAlign: 'center',
//   },
// };

// export default ItemList;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { MyContext } from "../context/accountProvider";
import LoadingAnimation from "../components/LoadingAnimation"; // Import the loading animation component
import { ShimmerCategoryItems, ShimmerDiv } from "shimmer-effects-react";

const ItemList = () => {
  const { regionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [regionName, setRegionName] = useState("");
  const navigate = useNavigate();
  const { token, setToken } = useContext(MyContext);
  const [headerFooterColor, setHeaderFooterColor] = useState("#125B57");
  const [num_of_species, setNumOfSpecies] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  const [filteredValue, setFilterValue] = useState("All"); // 'All' selected by default
  const [isImageLoaded, setIsImageLoaded] = useState(false); // State to manage image load

  const fixedColor = "#125B57";

  useEffect(() => {
    const storedColor =
      sessionStorage.getItem("headerFooterColor") || fixedColor;
    sessionStorage.setItem("headerFooterColor", storedColor);
    setHeaderFooterColor(storedColor);
  }, []);

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
    const fetchData = async () => {
      try {
        if (regionId) {
          const response = await axios.post(
            "https://farmersforforests.org/admin/acc/appdata/specieslistinfo",
            {
              region_id: regionId,
            }
          );
          console.log(response);
          setNumOfSpecies(response.data.species_list_name);
          setAllItems(response.data.species_list_data);
          setFilterItem(response.data.species_list_data); // Show all items initially

          if (response.data.species_list_data.length > 0) {
            setRegionName(response.data.species_list_data[0].region_name);
          }
        } else {
          console.error("Region ID not found");
        }
        // Delay setting loading to false by 1 second
        setTimeout(() => setLoading(false), 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [regionId]);

  const handleButtonClick = (value) => {
    setFilterValue(value);

    if (value === "All") {
      setFilterItem(allItems); // Show all items when "All" is selected
    } else {
      const filteredData = allItems.filter(
        (item) => item.species_type === value
      );
      setFilterItem(filteredData);
    }
  };

  if (loading) {
    return <LoadingAnimation />; // Show the loading animation
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true); // Set image loaded state to true when image is fully loaded
  };

  return (
    <div className="mx-[20px]">
      <Header title={regionName} color={headerFooterColor} />
      <div className="mt-[120px]">
        <div className="flex justify-start gap-5 py-2 overflow-x-scroll">
          {/* Add the "All" button */}
          <button
            onClick={() => handleButtonClick("All")}
            style={{
              ...styles.button,
              backgroundColor:
                filteredValue === "All" ? headerFooterColor : "transparent",
              color: filteredValue === "All" ? "#FFFFFF" : headerFooterColor,
              borderColor:
                filteredValue === "All" ? "transparent" : headerFooterColor,
            }}
          >
            All
          </button>

          {num_of_species &&
            num_of_species.map((option) => (
              <button
                key={option.species_type_id}
                onClick={() => handleButtonClick(option.species_type)}
                style={{
                  ...styles.button,
                  backgroundColor:
                    option.species_type === filteredValue
                      ? headerFooterColor
                      : "transparent",
                  color:
                    option.species_type === filteredValue
                      ? "#FFFFFF"
                      : headerFooterColor,
                  borderColor:
                    option.species_type === filteredValue
                      ? "transparent"
                      : headerFooterColor,
                }}
              >
                {option.species_type}
              </button>
            ))}
        </div>

        <ul className="">
          {filterItem.length > 0 ? (
            filterItem.map((item, index) => (
              
              <Link
                to={`/item/${regionId}/${item.species_id}`}
                key={index}
                className="w-full"
              >
              {!isImageLoaded && <ShimmerCategoryItems mode="light" />
}
                <li className="flex mb-2 mt-2 border-b gap-[16px] border-gray-300 shadow-lg rounded-md">
               
                  <img
                    src={`${process.env.PUBLIC_URL}/assests/${item.species_image_name}`}
                    alt={item.species_common_name}
                    className={`w-32 h-32 object-cover rounded-md ${isImageLoaded ? "":"hidden"}`}
                    onLoad={handleImageLoad}
                   
                  />
                  <div className={`flex flex-col justify-between py-5 ${isImageLoaded?"":"hidden"}`}>
                    <div>
                      <p className="text-sm text-black">{item.species_type}</p>
                      <h3 className="text-[16px] font-semibold">
                        {item.species_common_name}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500"></p>
                  </div>
                </li>
              </Link>
            ))
          ) : (
            <p>No items found</p>
          )}
        </ul>
      </div>

      <div className="mt-20">
        <Footer color={headerFooterColor} />
      </div>
    </div>
  );
};

// Styles object
const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "12px",
    cursor: "pointer",
    border: "1px solid",
    borderRadius: "10px",
    transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
    textAlign: "center",
  },
};

export default ItemList;
