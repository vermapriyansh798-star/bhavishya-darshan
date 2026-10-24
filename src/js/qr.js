/**
 * Bhavishya Darshan — QR Code Generator & Downloader Module
 * Generates clear, scannable QR codes for WhatsApp consultation and website sharing.
 */
import QRCode from 'qrcode';
import { CONFIG, waLink } from '../config.js';

export function initQRCode() {
  const qrCanvas = document.getElementById('whatsapp-qr-canvas');
  const downloadBtn = document.getElementById('download-qr-btn');

  if (!qrCanvas) return;

  // Generate WhatsApp greeting link
  const targetUrl = waLink(CONFIG.greetings.cardQr);

  // Render QR Code with high-contrast Vedic maroon and parchment/white colors
  QRCode.toCanvas(qrCanvas, targetUrl, {
    width: 240,
    margin: 2,
    color: {
      dark: '#2A070B', // Deep temple maroon
      light: '#FFFFFF'
    },
    errorCorrectionLevel: 'M'
  }, (error) => {
    if (error) {
      console.error("QR Code generation error:", error);
    }
  });

  // Enable direct PNG download for printable cards or social sharing
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Render higher resolution canvas for print download (600x600)
      const printCanvas = document.createElement('canvas');
      QRCode.toCanvas(printCanvas, targetUrl, {
        width: 600,
        margin: 3,
        color: {
          dark: '#2A070B',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      }, (err) => {
        if (!err) {
          const link = document.createElement('a');
          link.download = `Bhavishya-Darshan-WhatsApp-QR.png`;
          link.href = printCanvas.toDataURL('image/png');
          link.click();
        }
      });
    });
  }
}
