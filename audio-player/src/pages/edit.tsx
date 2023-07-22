import { useState } from 'react';
import Navbar from '../components/Navbar';
import AudioEditor from '../components/AudioEditor';

const EditPage = () => {
  const [query, setQuery] = useState('');

 return (
    <div>
    <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-screen">
      </div>
      <AudioEditor/>
    </div>
  );
};

export default EditPage;
