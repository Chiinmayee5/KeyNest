import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import './App.css'
import { ToastContainer } from 'react-toastify';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>  {/* This renders your navbar */}
      <div className='min-h-[87vh]'><Manager/></div>
      <ToastContainer/>
      <Footer/>
      
    </>
  )
}

export default App
