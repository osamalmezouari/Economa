import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Upload } from '../../../base/upload'; // Assuming Upload is a custom component
import UploadSingleFileProps from './interfaces';

const UploadSingleFile: React.FC<UploadSingleFileProps> = ({
  file,
  setFile,
}) => {
  const handleDropSingleFile = useCallback(
    (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0]; // Since it's single file, we take the first file
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
    },
    [setFile]
  );

  return (
    <Card>
      <CardHeader title="Upload Single File" />
      <CardContent>
        <Upload
          file={file}
          onDrop={handleDropSingleFile}
          onDelete={() => setFile(null)} // Reset the file when deleted
        />
      </CardContent>
    </Card>
  );
};

export default UploadSingleFile;
