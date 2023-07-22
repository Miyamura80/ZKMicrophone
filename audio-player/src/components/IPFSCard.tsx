import React, { useState, useEffect } from 'react';
const { Web3Storage, getFilesFromPath } = require("web3.storage");

interface IPFSCardProps {
  imageSrc: string;
  audioSrc: string;
  username: string;
}

const onRootCidReady = cid => {
  console.log('uploading files with cid:', cid)
}

const onStoredChunk = size => {
  uploaded += size
  const pct = totalSize / uploaded
  console.log(`Uploading... ${pct.toFixed(2)}% complete`)
}


async function uploadFile() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdFMzEyNEJFODczMmY4Yzc2YjAyOTM5M2Y5YzExQkViMkRDRjNkQjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTAwMzUyNTg2ODMsIm5hbWUiOiJ6a21pY3JvcGhvbmUifQ.iJh3ArLHtg_jbL-JqfhSapdKANq9Iu-Cn-cbMWLabMU";

  const storage = new Web3Storage({ token });

  const finalContent = JSON.stringify({ hello: 123});
  const file = new File([finalContent], "hello.json", {
    type: 'text/plain',
  });

  const cid = await storage.put([file]);
  console.log("uploaded file");
}

const IPFSCard: React.FC<IPFSCardProps> = ({ imageSrc, audioSrc, username }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  
  const fetchData = async () => {
      // replace with your own async function
      // fetch data, call API, etc
      console.log("Button was clicked, fetching data...");
      await uploadFile();
  };

  useEffect(() => {
      if (buttonClicked) {
          fetchData();
          setButtonClicked(false); // Reset the button click state
      }
  }, [buttonClicked]);

  return (
      <div>

        djlkadjkjwsaldkasjldkajdsalkaslk
        <button onClick={() => setButtonClicked(true)}>
            Fetch Data
        </button>
      </div>
  );
};


export default IPFSCard;
