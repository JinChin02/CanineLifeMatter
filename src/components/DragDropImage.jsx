import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

const DragDrop = (props) => {
  // const [file, setFile] = useState(props.passData);
  const handleChange = (file) => {
    props.passData(URL.createObjectURL(file));
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
}

export default DragDrop;