import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react';
import Navbar from '../components/Navbar';
import AudioEditor from '../components/AudioEditorNew';
import ReactDOM from 'react-dom';
import axios from 'axios';



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


  /* Upload the file to the server */

  // const onFileUpload = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   // TODO: Save to `/public`
  //   const url = 'http://localhost:5000/upload';
  //   const formData = new FormData();
  //   if (audioFile) {
  //   formData.append('file', audioFile);
  //   formData.append('fileName', audioFile.name);
  //   }
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //     },
  //   };
  //   console.log("FORM DATA", formData)
  //   axios.post(url, formData, config).then((response) => {
  //     console.log(response.data);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }

/* Client side only solution */
  const onFileUpload = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    //  const file = event.target.files?.[0];
    if (audioFile) {
      // setAudioFile(file);
      const url = URL.createObjectURL(audioFile);
      console.log('NEW URL', url);
      setAudioUrl(url);
    }
  }

  const centeredDivStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div>
      <Navbar />
      <div style={centeredDivStyle} className='h-64'></div>
      <div className='w-full max-w-lg mx-auto'>
      <  AudioEditor tempFile={audioFile === null}audioUrl={audioUrl} />
      </div>
      <div style={centeredDivStyle} className='py-10'>
        <form onSubmit={onFileUpload}>
          <input type="file" onChange={onFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div >
  );
};

export default EditPage;
