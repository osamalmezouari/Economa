import React, { useCallback } from 'react';
import { Card, CardContent, Stack } from '@mui/material';
import { Upload } from '../../../base/upload';
import UploadMultiProps from './interfaces.ts';

const UploadMulti: React.FC<UploadMultiProps> = ({
  files,
  setFiles,
  preview = true,
}: UploadMultiProps) => {
  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        ),
      ]);
    },
    [files, setFiles]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter(
      (fileFiltered) => fileFiltered !== inputFile
    );
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Stack spacing={5}>
      <Card>
        <CardContent>
          <Upload
            multiple
            thumbnail={preview}
            files={files}
            onDrop={handleDropMultiFile}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
            onUpload={() => console.log('ON UPLOAD')}
          />
        </CardContent>
      </Card>
    </Stack>
  );
};

export default UploadMulti;
