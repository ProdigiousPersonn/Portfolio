import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import Navbar from './components/Navbar';
import BlogDisplay from './components/BlogDisplay';
import Home from './components/HomePage/Home';
import About from './components/HomePage/About';
import BlogList from './components/BlogList';
import Resume from './components/Resume.tsx';
import Footer from './components/Footer.tsx'
import Divider from './components/Divider.tsx'
import ScrollTop from './components/ScrollTop.tsx'

import Cursor from "./components/Cursor.tsx"
import Projects from "./components/HomePage/Projects.tsx";

function App() {
  return (
    <>
      <Cursor/>
      <BrowserRouter>
        <Navbar />
        <div style={{ paddingTop: '50px' }}></div>
        <ScrollTop/>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/blog" element={<BlogList/>} />
          <Route path="/blog/:postId" element={<BlogDisplayWrapper />}/>
          <Route path="/resume" element={<Resume/>} />
        </Routes>
        <Divider text = "Aiden Tran" duration = { 15 }/>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

function BlogDisplayWrapper() {
  const { postId } = useParams();

  console.log(postId);
  const fileName = `${postId}`;

  return <BlogDisplay fileName={fileName} />;
}

export default App;
