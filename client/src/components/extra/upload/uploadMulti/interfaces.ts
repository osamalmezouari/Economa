export default interface UploadMultiProps {
  files: (File | string)[]; // use selector the recive the files from the redux store
  setFiles: (files: (File | string)[]) => void;
  /*
  example of usage
  const updateFiles = (newFiles: File[]) => {
  dispatch(setState({ files: newFiles }));
  };
  */
  preview?: boolean;
}
