import React, { useState } from 'react';
import { BarcodeScanner } from 'react-barcode-scanner';
import 'react-barcode-scanner/polyfill';

const BarcodeImageScanner = () => {
  const [scannedCode, setScannedCode] = useState('');
  const [scanning, setScanning] = useState(false);

  const handleDetected = (barcodes) => {
    if (barcodes.length > 0) {
      const code = barcodes[0].rawValue;
      setScannedCode(code);
      setScanning(false); // stop scanning after successful scan
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>📦 Barcode Scanner</h1>

      {scanning ? (
        <div>
          <BarcodeScanner
            onDetected={handleDetected}
            width={400}
            height={300}
            constraints={{ facingMode: 'environment' }}
          />
          <p>📷 Scanning... Point the camera at a barcode</p>
          <button onClick={() => setScanning(false)}>❌ Stop Scanner</button>
        </div>
      ) : (
        <div>
          <button
            style={{
              backgroundColor: '#80c209',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
            onClick={() => {
              setScannedCode('');
              setScanning(true);
            }}
          >
            📷 Start Scanning
          </button>

          {scannedCode && (
            <div style={{ fontSize: '18px', marginTop: '10px' }}>
              ✅ <strong>Scanned Code:</strong> {scannedCode}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BarcodeImageScanner;
