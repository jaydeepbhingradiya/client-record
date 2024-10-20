import React from "react";

const FileUpload = ({ onFileUpload }) => {
  return (
    <div>
      <input type="file" accept=".json" onChange={onFileUpload} />
    </div>
  );
};

export default FileUpload;
