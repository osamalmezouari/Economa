import { QRCodeCanvas } from 'qrcode.react';
import { Box, Button, Divider, Typography, Modal, Paper, IconButton } from '@mui/material';
import { useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface QRCodeGeneratorProps {
  orderId: string;
  open: boolean;
  onClose: () => void;
}

const QRCodeGenerator = ({ orderId, open, onClose }: QRCodeGeneratorProps) => {
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current;
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'OrderQrcode.png';
      link.click();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="qr-code-modal"
      className="flex items-center justify-center"
    >
      <Paper className="max-w-md w-full mx-auto p-6 relative">
        <IconButton 
          onClick={onClose}
          className="absolute right-2 top-2"
          size="small"
        >
          <CloseIcon />
        </IconButton>
        
        <Typography variant="h6" className="!font-Inria text-center mb-4">
          Order QR Code
        </Typography>
        
        <Typography className="!font-Inria capitalize my-2 text-center bg-primary-main text-white p-2 rounded-lg">
          Your order is ready for pickup. Please bring the QR code below with you
          to the store.
        </Typography>
        
        <Divider className="!my-4" />
        
        <Box className="flex flex-col items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-100">
          <Box className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
            <QRCodeCanvas
              ref={qrRef}
              value={orderId}
              size={250}
              bgColor={'#ffffff'}
              fgColor={'#000000'}
              level="H"
              includeMargin
            />
          </Box>
          
          <Typography variant="caption" className="text-gray-500 text-center">
            Order ID: {orderId.substring(0, 8)}...
          </Typography>
          
          <Button 
            onClick={handleDownload} 
            variant="contained" 
            color="primary"
            fullWidth
            className="mt-2"
          >
            Download QR Code
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default QRCodeGenerator;
