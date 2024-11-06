import React from 'react';

export default interface UploadAvatarProps {
  file: string | File | null; // use selector the recive the file from the redux store
  setFile: (file: string | File | null) => void;
  /*
  example of usage
  const setfiles = (newAvatar: File) => {
  dispatch(setState({ Avatar : newAvatar }));
  };
  */
  helperText: React.ReactNode;
}
