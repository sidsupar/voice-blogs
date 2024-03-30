import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/signup'
import SignIn from './pages/signin'
import Blog from './pages/blog'
import Blogs from './pages/blogs'
import axios from 'axios'
import Publish from './pages/publish'
import { RecoilRoot } from 'recoil'
import ProtectRoutes from './components/protectedRoutes'
import PaginatedBlogs from './pages/paginatedBlogs'

function App() {
  
  if(localStorage.getItem('token') != null){
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
  }

  return (
    <>
    <RecoilRoot>
        <BrowserRouter>
          <Routes>
              <Route index element={<SignUp />}/>
              <Route path="signup" element={<SignUp />}/>
              <Route path="signin" element={<SignIn />}/>                
                <Route path="blogs" element={
                  <ProtectRoutes>
                    <Blogs />
                  </ProtectRoutes>
                }/>
                <Route path="blog/:id" element={
                  <ProtectRoutes>
                    <Blog />
                  </ProtectRoutes>
                }/>
                <Route path="/publish" element={
                  <ProtectRoutes>
                    <Publish />
                  </ProtectRoutes>
                } />
                <Route path="/paginatedSearch" element={
                  <ProtectRoutes>
                    <PaginatedBlogs />
                  </ProtectRoutes>
                } />                 
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
