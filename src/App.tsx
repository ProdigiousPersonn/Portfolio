import { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import BlogDisplay from './components/BlogDisplay';
import Home from './components/Home';

function App() {
  return (
    <>
      <Navbar />
      <div style={{paddingTop:'50px'}}></div>
      {/* <BlogDisplay fileName='test'/> */}
      <Home/>
    </>
  );
}

export default App;
