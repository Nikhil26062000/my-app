import React, { useEffect, useState } from 'react';

const InstallPWAComponent = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (event) => {
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
        <button onClick={handleInstallClick}>Install App</button>
      )}
    </div>
  );
};

export default InstallPWAComponent;
