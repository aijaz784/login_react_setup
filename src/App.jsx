import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Forget from './components/Forget.jsx'
import Home from './components/Home.jsx'
import Dashboard from './components/Dashboard.jsx';
const App = () => {
  return (
    <>
  <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/SignUp' element={<SignUp/>}></Route>
    <Route path='/Forget' element={<Forget/>}></Route>
    <Route path='/Home' element={<Home/>}></Route>
    <Route path='/Dashboard' element={<Dashboard/>}></Route>
  </Routes>
    </>
  )
}
export default App