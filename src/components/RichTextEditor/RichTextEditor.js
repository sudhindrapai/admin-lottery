import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyEditor = ({onValueChange}) => {
  const [value, setValue] = useState('');

  const setEditorValue = (value) => {
    onValueChange(value);
    setValue(value)
  }

  onValueChange(value);

  return (
    <ReactQuill theme="snow" value={value} onChange={setValue}/>
  );
}

export default MyEditor