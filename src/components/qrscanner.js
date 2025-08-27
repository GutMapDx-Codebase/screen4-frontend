import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

export default function QRScannerModal({ isOpen, onClose, onScanSuccess }) {
  const qrRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (isOpen && qrRef.current) {
      scannerRef.current = new Html5Qrcode("qr-reader");
console.log("Scanner initialized");
      scannerRef.current
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: 250,
            formatsToSupport: [
              Html5QrcodeSupportedFormats.QR_CODE,
              Html5QrcodeSupportedFormats.CODE_128,
              Html5QrcodeSupportedFormats.CODE_39,
              Html5QrcodeSupportedFormats.EAN_13,
              Html5QrcodeSupportedFormats.EAN_8,
              Html5QrcodeSupportedFormats.UPC_A,
              Html5QrcodeSupportedFormats.UPC_E,
              Html5QrcodeSupportedFormats.ITF
            ],
          },
          (decodedText) => {
            console.log("Scanned code:", decodedText);
            onScanSuccess(decodedText);
            handleClose();
          },
          (error) => {
            console.log("QR/Barcode Scan error", error);
          }
        )
        .catch((err) => {
          console.error("Camera start failed", err);
        });
    }

    return () => {
      scannerRef.current?.stop().then(() => {
        scannerRef.current?.clear();
      });
    };
  }, [isOpen]);

//   const handleClose = () => {
//     scannerRef.current?.stop().then(() => {
//       scannerRef.current?.clear();
//       onClose(); // Close modal in parent
//     });
//   };

const handleClose = () => {
    if (scannerRef.current && scannerRef.current._isScanning) {
      scannerRef.current
        .stop()
        .then(() => {
          scannerRef.current.clear();
          onClose(); // Close modal
        })
        .catch((err) => {
          console.warn("Scanner stop error:", err);
          onClose(); // Still close the modal
        });
    } else {
      onClose();
    }
  };
  

  return (
    <Modal open={isOpen} footer={null} onCancel={handleClose} width={360}>
      <div id="qr-reader" ref={qrRef} style={{ width: "100%" }} />
    </Modal>
  );
}
