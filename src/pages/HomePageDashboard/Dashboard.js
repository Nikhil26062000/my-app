import React,{useContext, useEffect} from 'react'
import Top_Header from '../../components/components/Common_Components/Top_Header'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyIcon from '@mui/icons-material/Key';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import MenuList from './MenuList';
import LastList from './LastList';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/accountProvider';

const Dashboard = () => {
  const fixedColor = '#125B57';
  const navigate = useNavigate()
  const {setToken} = useContext(MyContext)
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

  const handleLogout = () => {
    localStorage.removeItem('userid')
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    navigate("/")
    setToken("")
  }
  return (
    <div className='w-[100%] box-border'>
        <Top_Header title="Settings"/>
        <section className='w-full h-[396px] mt-[28px] box-border px-5  rounded-[10px]'>
        <MenuList title='Address' isTopBorder={true}  Icon={LocationOnIcon}/>
        <MenuList title='Account' isTopBorder={false} Icon={PersonIcon}/>
        <MenuList title='Notification' isTopBorder={false} Icon={NotificationsIcon}/>
        <MenuList title='Passwords' isTopBorder={false} Icon={KeyIcon}/>
        <MenuList title='Language' isTopBorder={false} Icon={ChatRoundedIcon}/>
        <MenuList title='Citizen Scientist kit' isTopBorder={false} Icon={HomeRepairServiceRoundedIcon}/>
        <LastList title='Logout'  Icon={PowerSettingsNewRoundedIcon} onClick={handleLogout}/>
        </section>
        
       
        <section className="mt-20">
    <Footer color={fixedColor} /> 
    </section>
    </div>
  )
}

export default Dashboard