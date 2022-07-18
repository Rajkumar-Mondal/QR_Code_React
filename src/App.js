import React, { useState, useRef } from 'react';
import './App.css';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader'

function App() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [startScan, setStartScan] = useState(false);
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const qrRef = useRef(null);




  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      console.log(response);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
    alert(result);
    if (result) {
      alert(result);
      setScanResultFile(result);
    }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
    // qrRef.current?.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  }




  return (
    <div className="App">
      <div className='container1'>
        <div>
          <input onChange={(e) => setText(e.target.value)} />
          <button onClick={() => generateQrCode()}>Generate</button>
        </div>
        <div>
          {imageUrl ? (
            <a href={imageUrl} download>
              <img src={imageUrl} alt="img" />
            </a>) : null}
        </div>
      </div>

      <div className='container2'>
        <button onClick={() => onScanFile()}>Scan Qr Code</button>
        <QrReader
          ref={qrRef}
          delay={300}
          style={{ width: '100%' }}
          onError={handleErrorFile}
          onScan={handleScanFile}
          legacyMode
        />
        <h3>Scanned Code: {scanResultFile}</h3>
      </div>
      <div className='container3'>
        <button
          onClick={() => {
            setStartScan(!startScan);
          }}
        >
          {startScan ? "Stop Scan" : "Start Scan"}
        </button>
        {startScan && (
          <>
            <QrReader
              delay={100}
              style={{ width: '100%' }}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
            />
            <h3>Scanned by Camera: {scanResultWebCam}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
