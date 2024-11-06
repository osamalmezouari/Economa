import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { UploadAvatar as UploadAvatarbase } from '../../../base/upload';
import UploadAvatarProps from './interfaces.ts';

const UploadAvatar: React.FC<UploadAvatarProps> = ({
  file,
  setFile,
  helperText,
}) => {
  const handleDropAvatar = useCallback(
    (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        setFile(
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        );
      }
    },
    [setFile]
  );

  return (
    <Card>
      <CardHeader title="Upload Avatar" />
      <CardContent>
        <UploadAvatarbase
          file={file}
          onDrop={handleDropAvatar}
          helperText={helperText}
        />
      </CardContent>
    </Card>
  );
};

export default UploadAvatar;
