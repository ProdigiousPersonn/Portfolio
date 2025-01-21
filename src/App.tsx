import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Navbar from './components/Navbar';
import BlogDisplay from './components/BlogDisplay';
import Home from './components/Home';
import About from './components/About';
import BlogList from './components/BlogList';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingTop: '50px' }}></div>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/blog" element={<BlogList/>} />
        <Route path="/blog/:postId" element={<BlogDisplayWrapper />}/>
      </Routes>
    </BrowserRouter>
  );
}

// Wrapper component for BlogDisplay to handle dynamic routing
function BlogDisplayWrapper() {
  const { postId } = useParams();

  // Construct the fileName dynamically based on postId
  console.log(postId);
  const fileName = `${postId}`;

  return <BlogDisplay fileName={fileName} />;
}

export default App;
