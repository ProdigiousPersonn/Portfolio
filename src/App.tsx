import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import BlogDisplay from './components/BlogDisplay';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingTop: '50px' }}></div>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/blog" element={<BlogDisplay fileName='test'/>} />
        {/* Optional: Add a wildcard route for unmatched paths */}
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
