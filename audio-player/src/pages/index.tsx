import { useState } from 'react';
import Navbar from '../components/Navbar';
import Browse from '../components/Browse';

const HomePage = () => {
  const [query, setQuery] = useState('');

  return (
    <div>
      <Navbar/>
      {/* <Browse /> */}
    </div>
  );
};

export default HomePage;
