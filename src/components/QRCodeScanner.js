
// import React, { useRef, useEffect } from "react";
// import QrScanner from "qr-scanner"; // Import the qr-scanner library
// import "qr-scanner/qr-scanner-worker.min"; // Import the worker script
// import Footer from "./Footer";

// const QRCodeScanner = ({ onScan, isScanning,setQrId }) => {
  

//   const videoRef = useRef(null);
//   const scannerRef = useRef(null);
//     const fixedColor = '#125B57';

//   useEffect(() => {
//     if (!scannerRef.current) {
//       scannerRef.current = new QrScanner(videoRef.current, (result) => {
//         if (result) {
//           console.log("QR Code detected:", result);
//           setQrId(result)
//           onScan(result);
//         }
//       });
//     }

//     if (isScanning) {
//       scannerRef.current.start();
//     } else {
//       scannerRef.current.stop();
//     }

//     return () => {
//       if (scannerRef.current) {
//         scannerRef.current.destroy();
//         scannerRef.current = null;
//       }
//     };
//   }, [onScan, isScanning]);

//   return (
//     <>
//     <div className="qrContainer h-full">
//       <video ref={videoRef} className="videoFullHeight" />
//     </div>
//     <section className="mt-10">
//     <Footer color={fixedColor} /> 
//     </section>
//     </>
//   );
// };

// export default QRCodeScanner;



import React, { useRef, useEffect } from "react";
import QrScanner from "qr-scanner"; // Import the qr-scanner library
import "qr-scanner/qr-scanner-worker.min"; // Import the worker script
import Footer from "./Footer";

const QRCodeScanner = ({ onScan, isScanning, setQrId }) => {
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const fixedColor = '#125B57';

  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new QrScanner(videoRef.current, (result) => {
        if (result) {
          console.log("QR Code detected:", result);
          setQrId(result);
          onScan(result);
        }
      });
    }

    if (isScanning) {
      scannerRef.current.start();
    } else {
      scannerRef.current.stop();
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.destroy();
        scannerRef.current = null;
      }
    };
  }, [onScan, isScanning]);

  return (
    <>
      <div className="qrContainer h-full w-full flex items-center justify-center">
        <video ref={videoRef} className="videoFullHeight w-full h-full" />
      </div>
      <section className="mt-10">
        <Footer color={fixedColor} />
      </section>
    </>
  );
};

export default QRCodeScanner;
