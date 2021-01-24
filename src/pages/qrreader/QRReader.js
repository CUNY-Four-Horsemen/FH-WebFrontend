import React, { useEffect, useState } from "react";
import QrReader from 'react-qr-scanner'

export default function QRReader() {
  const previewStyle = {
    height: 240,
    width: 320,
  }

  const delay = 100;
  const [result, setResult] = useState();

  const handleScan = (data) => {
    console.log(data);
  }

  const handleError = (err) => {
    console.error(err)
  }

  useEffect(() => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {
          video: true
        },
        function (localMediaStream) { },
        function (err) {
          alert('The following error occurred when trying to access the camera: ' + err);
        }
      );
    } else {
      alert('Sorry, browser does not support camera access');
    }
  }, []);

  return (
    <div>
      <QrReader
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <p>{result}</p>
    </div>
  )
}
