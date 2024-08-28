import React,{useContext, useEffect} from 'react'
import Top_Header from "../../components/components/Common_Components/Top_Header";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/accountProvider';
import CTA from "../../components/components/Common_Components/CTA";

const NotificationToggle = ({ isNotificationOn }) => {

  const navigate = useNavigate()
  const {setToken} = useContext(MyContext)

  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setToken(null);
        navigate('/login');
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

  return (
    <div className="w-[100%] box-border">
      <Top_Header title="Notification" />
      <section className="w-full mt-[134px] box-border px-10 flex justify-center">
        <CTA btn_name={isNotificationOn ? "Turn Off Notification" : "Turn On Notification"} />
      </section>
    
    </div>
  );
};

export default NotificationToggle;
