import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import { Html5Qrcode } from "html5-qrcode";

export default function QRScannerModal({ isOpen, onClose, onScanSuccess }) {
  const qrRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (isOpen && qrRef.current) {
      scannerRef.current = new Html5Qrcode("qr-reader");
console.log("Scanner initialized");
      scannerRef.current
        .start(
          { facingMode: "environment" }, // use back camera
          {
            fps: 10,
            qrbox: 250,
          },
          (decodedText) => {
            console.log("Scanned code:", decodedText);
            onScanSuccess(decodedText); // send value back to parent
            handleClose(); // auto-close modal
          },
          (error) => {
            // console.warn("QR Scan error", error); // you can suppress this
            console.log("QR Scan error", error); // you can suppress this
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
