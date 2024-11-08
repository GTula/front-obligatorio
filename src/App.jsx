import { createContext, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/register'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Home from './components/Home'
import Student from './components/Student'
import Teacher from './components/Teacher'
import Shift from './components/Shift'
import Login from './components/Login'

export const authenticatedContext = createContext()

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/alumnos')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
    <authenticatedContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/shift' element={
              isAuthenticated ? <Shift /> : <Navigate to="/login" element={<Login/>}/>
            }/>
          <Route path='/teacher' element={
              isAuthenticated ? <Teacher /> : <Navigate to="/login" element={<Login/>}/>
            }/>
          <Route path='/student' element={
              isAuthenticated ? <Student /> : <Navigate to="/login" element={<Login/>}/>
            }/>
          <Route path='/' element={
              isAuthenticated ? <Home /> : <Navigate to="/login" element={<Login/>}/>
            }/>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </BrowserRouter>
    </authenticatedContext.Provider>
    <div>
      <h1>Mensaje desde Flask:</h1>
      <p>{message}</p>
    </div>
    </>
  )
}

export default App
