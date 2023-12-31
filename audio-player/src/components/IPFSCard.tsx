import React, { useState, useEffect } from 'react';
import { fromBytes } from 'viem';
const { Web3Storage, getFilesFromPath } = require("web3.storage");
const custom_button = {
  "background-color": "#007bff",
  /* Set the background color */
  "color": "#ffffff",
  /* Set the text color */
  "border": "none",
  //   /* Remove default border */
  //   padding: 10px 20px;
  //   /* Add padding around the text */
  //   border - radius: 5px;
  // /* Rounded corners */
  // cursor: pointer;
  // /* Show pointer cursor on hover */
  // font - size: 16px;
  //   /* Set the font size */
}

//   .custom - button: hover {
//     background - color: #0056b3;
//   /* Change background color on hover */
// }

function base64ToFile(base64String: string, filename: string, contentType: string) {
  var byteCharacters = atob(base64String);
  var byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    let slice = byteCharacters.slice(offset, offset + 512);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  var file = new File([blob], filename, { type: contentType });

  return file;
}

const IPFSCard = ({ setIPFSCID, editedAudio }: { setIPFSCID: any, editedAudio: string }) => {
  const editedAudioFile = base64ToFile(editedAudio, "edited.wav", "audio/wav");

  async function uploadFile(file: File) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdFMzEyNEJFODczMmY4Yzc2YjAyOTM5M2Y5YzExQkViMkRDRjNkQjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTAwMzUyNTg2ODMsIm5hbWUiOiJ6a21pY3JvcGhvbmUifQ.iJh3ArLHtg_jbL-JqfhSapdKANq9Iu-Cn-cbMWLabMU";

    const storage = new Web3Storage({ token });

    const cid = await storage.put([file]);
    console.log("uploaded file");
    setIPFSCID(cid);
  }

  return (
    <div>
      <button className="custom_button" onClick={() => uploadFile(editedAudioFile)}>
        Upload to IPFS
      </button>
    </div>
  );
};

export default IPFSCard;
