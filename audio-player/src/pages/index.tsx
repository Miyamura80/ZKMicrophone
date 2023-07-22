import { useState } from 'react';
import Navbar from '../components/Navbar';
import MainContent from '../components/MainContent';
import '../styles/globals.css'

const HomePage = () => {
  const [query, setQuery] = useState('');

  return (
    <div>
      <Navbar/>
      <MainContent query={query} />
    </div>
  );
};

export default HomePage;
