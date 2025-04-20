import React, { useState } from 'react';
import { Box, Typography, Paper, Alert } from '@mui/material';
import { QrReader } from 'react-qr-reader';

interface QRCodeScannerProps {
  onScan: (result: string) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScan }) => {
  const [error, setError] = useState<string | null>(null);

  const handleScan = (result: any) => {
    if (result) {
      onScan(result?.text);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    setError(
      'Failed to access camera. Please make sure you have granted camera permissions.'
    );
  };

  return (
    <Paper elevation={3} className="p-4">
      <Typography variant="h6" className="mb-4 text-center">
        Scan Order QR Code
      </Typography>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <Box className="w-full max-w-md mx-auto">
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={handleScan}
          scanDelay={500}
          className="w-full"
          videoStyle={{ borderRadius: '8px' }}
        />
        <Typography variant="body2" className="mt-4 text-center text-gray-600">
          Position the QR code within the frame to scan
        </Typography>
      </Box>
    </Paper>
  );
};

export default QRCodeScanner;
