export default interface UploadSingleFileProps {
  file: string | File | null; // use selector the recive the file from the redux store
  setFile: (file: string | File | null) => void;
  /*
  example of usage
  const setFile = (newAvatar: File) => {
  dispatch(setState({ Avatar : newAvatar }));
  };
  */
}
