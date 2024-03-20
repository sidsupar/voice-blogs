import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/signup'
import SignIn from './pages/signin'
import Blog from './pages/blog'
import Blogs from './pages/blogs'
import axios from 'axios'
import Publish from './pages/publish'
import { RecoilRoot } from 'recoil'

function App() {
  const [count, setCount] = useState(0);
  
  if(localStorage.getItem('token') != null){
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
  }

  return (
    <>
    <RecoilRoot>
        <BrowserRouter>
          <Routes>
              <Route path="signup" element={<SignUp />}/>
              <Route path="signin" element={<SignIn />}/>
              <Route path="blogs" element={<Blogs />}/>
              <Route path="blog/:id" element={<Blog />}/>
              <Route path="/publish" element={<Publish />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
