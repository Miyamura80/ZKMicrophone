import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react';
import Navbar from '../components/Navbar';
import AudioEditor from '../components/AudioEditorNew';
import ReactDOM from 'react-dom';
import axios from 'axios';
import IPFSCard from '@/components/IPFSCard';


const EditPage = () => {
  const [query, setQuery] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);


  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files && event.target.files.length > 0) {
      console.log("FILE", event.target.files[0])
      setAudioFile(event.target.files[0])
    }
  }

  /* Client side only solution */
  // const onFileUpload = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   if (event && event.target && event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files?.[0];
  //     setAudioFile(file);
  //     // const url = URL.createObjectURL(audioFile);
  //     // console.log('NEW URL', url);
  //     // setAudioUrl(file);
  //   }
  // }

  const centeredDivStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div>
      <Navbar />
      <IPFSCard imageSrc='' audioSrc='' username='' />
      <div style={centeredDivStyle} className='h-64'></div>
      {audioFile &&
        <div className='w-full max-w-lg mx-auto'>
          <  AudioEditor audioFile={audioFile} />
        </div>
      }
      {!audioFile &&
        <div style={centeredDivStyle} className='py-10'>
          <form>
            {/* <form >onSubmit={onFileUpload}> */}
            <input type="file" onChange={onFileChange} />
            {/* <button type="submit">Upload</button> */}
          </form>
        </div>
      }
    </div >
  );
};

export default EditPage;
