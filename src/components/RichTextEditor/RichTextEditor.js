import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyEditor = () => {
  const [value, setValue] = useState('');

  console.log(value,"richtext editor")

  return (
    <ReactQuill theme="snow" value={value} onChange={setValue}/>
  );
}

export default MyEditor