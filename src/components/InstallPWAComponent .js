import React, { useEffect, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';

const InstallPWAComponent = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    console.log("Working......");
    window.addEventListener('beforeinstallprompt', (event) => {
        console.log('beforeinstallprompt event fired');
      event.preventDefault(); // Prevent the mini-infobar from appearing
      setDeferredPrompt(event); // Save the event for triggering later
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null); // Reset the deferred prompt
      });
    }
  };

  return (
    <div>
      {deferredPrompt && (
        <div className="w-full flex justify-center">
        <button onClick={handleInstallClick} className="px-[25px] py-[10px] ro bg-[#125b57] rounded-[20px] text-[12px] tracking-[1.5px] leading-[19.36px] font-[700] text-white mt-5 " style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}>INSTALL APP <DownloadIcon/></button>
        </div>
      )}
    </div>
  );
};

export default InstallPWAComponent;
