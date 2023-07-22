import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react';
import Navbar from '../components/Navbar';
import AudioEditor from '../components/AudioEditorNew';
import ReactDOM from 'react-dom';


const EditPage = () => {
  const [query, setQuery] = useState('');
  const [audioFile, setFile] = useState<File | null>(null);


  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files && event.target.files.length > 0) {
      console.log("FILE", event.target.files[0])
      setFile(event.target.files[0])
    }
  }


  const onFileUpload = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: Save to `/public`
    // const url = 'http://localhost:3000/uploadFile';
    // const formData = new FormData();
    // formData.append('file', audioFile);
    // formData.append('fileName', audioFile.name);
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // };
    // axios.post(url, formData, config).then((response) => {
    //   console.log(response.data);
    // });

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
      <  AudioEditor audioFile={
        audioFile == null ? "example.wav" : audioFile.name } />
      </div>
      <div style={centeredDivStyle} className='py-10'>
        <form onSubmit={onFileUpload}>
          <input type="file" onChange={onFileChange} />
          {/* <button type="submit">Upload</button> */}
        </form>
      </div>
    </div >
  );
};

export default EditPage;
