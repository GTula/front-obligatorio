import { createContext, useState } from 'react'
import './App.css'
import Register from './components/register'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Student from './pages/Student'
import Teacher from './components/Teacher'
import Shift from './components/Shift'
import Login from './pages/Login'
import AgregarEstudiante from './pages/AgregarEstudiante'

export const authenticatedContext = createContext()

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <authenticatedContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/shift' element={
            isAuthenticated ? <Shift /> : <Navigate to="/login" />
          } />

          <Route path='agregarEstudiante' element={
            isAuthenticated ? <AgregarEstudiante /> : <Navigate to="/login" />} />

          <Route path='/teacher' element={
            isAuthenticated ? <Teacher /> : <Navigate to="/login" />
          } />
          <Route path='/student' element={
            isAuthenticated ? <Student /> : <Navigate to="/login" />
          } />
          <Route path='/' element={
            isAuthenticated ? <Home /> : <Navigate to="/login" />
          } />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </BrowserRouter>
    </authenticatedContext.Provider>
  )
}

export default App
