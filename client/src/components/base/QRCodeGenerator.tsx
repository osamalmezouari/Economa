import { QRCodeCanvas } from 'qrcode.react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useRef } from 'react';

const QRCodeGenerator = ({ orderId }: { orderId: string }) => {
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
    <>
      <Typography className="!font-Inria capitalize my-2 text-center bg-primary-main text-white p-2 rounded">
        Your order is ready for pickup. Please bring the QR code below with you
        to the store.
      </Typography>
      <Divider className="!my-2" />
      <Box className="flex flex-col items-center gap-4 p-4 bg-white rounded-xl shadow-md">
        <QRCodeCanvas
          ref={qrRef}
          value={orderId}
          size={300}
          bgColor={'#ffffff'}
          fgColor={'#000000'}
          includeMargin
        />
        <Button onClick={handleDownload} variant="contained" color="primary">
          Download QR Code
        </Button>
      </Box>
    </>
  );
};

export default QRCodeGenerator;
