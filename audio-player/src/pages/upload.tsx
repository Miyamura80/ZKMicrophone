import IPFSCard from '../components/IPFSCard';
import React, { useState } from 'react';

const FileUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Send the formData to your backend for further processing
      // For example, you can use axios to make a POST request to your server
      // axios.post('/upload', formData)
      //   .then((response) => {
      //     // Handle success
      //   })
      //   .catch((error) => {
      //     // Handle error
      //   });

      // Note: The actual backend handling depends on your server-side technology (Node.js, PHP, etc.)
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUploader;
