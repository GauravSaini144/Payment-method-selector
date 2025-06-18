import { useState, useEffect } from 'react'
import './App.css'
import Paymentselector from './components/Paymentselector'
import { Route, Routes } from 'react-router-dom'
import {Toaster} from "react-hot-toast"

function App() {
  
  

 

  return (
    <>
    <Toaster/>
    <Routes>
      <Route path='/' element={<Paymentselector/>} />
    </Routes>
     
    </>
  )
}

export default App
