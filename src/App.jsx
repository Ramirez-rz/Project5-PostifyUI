import { useState } from 'react'
import { Outlet } from "react-router";
import Navbar from "./components/navbar.jsx";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
      <Navbar/>
        <Outlet /> 
  </>
  )
}

export default App
