import { useState } from 'react'
import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';



import Navbar from './conponents/navbar/navbar.jsx'
import Main from './conponents/main/main.jsx'
import News from './conponents/news/news.jsx'
import Top from './conponents/top/top-release.jsx'
import Free from './conponents/free/free.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <> <Navbar /><Main/></>
    },
    {
      path: "/news",
      element: <> <Navbar /><News/></>
    },
    {
      path: "/top-release",
      element: <> <Navbar /><Top/></>
    },
    {
      path: "/free",
      element: <> <Navbar /><Free/></>
    },
  ])

return (
  <>
    <RouterProvider router = {router}/>
  </>
)
}

export default App
