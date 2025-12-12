import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Toaster position="top-right" />
      <Navbar />
      <Hero />
      <FileUpload />
    </div>
  );
}

export default App;