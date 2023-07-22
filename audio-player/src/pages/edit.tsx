import { useState } from 'react';
import Navbar from '../components/Navbar';
import Browse from '../components/Browse';

const EditPage = () => {
  const [query, setQuery] = useState('');

  return (
    <div>
      <Navbar/>
      <Browse />
    </div>
  );
};

export default EditPage;
