import { createContext, useState } from 'react'
import './App.css'
import Register from './components/register'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Student from './pages/EstudiantePage'
import InstructorPage from './pages/InstructorPage'
import Login from './pages/Login'
import AgregarEstudiante from './components/Estudiantes/AgregarEstudiante'
import AgregarInstructor from './components/Instructores/AgregarInstructor'
import { ReloadPageProvider } from './components/commonContexts/ReloadPageProvider'
import ClasePage from './pages/ClasePage'
import AgregarClase from './components/Clases/AgregarClase'

export const authenticatedContext = createContext()

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <authenticatedContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
      <ReloadPageProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/instructor' element={
            isAuthenticated ? <InstructorPage /> : <Navigate to="/login" />
          } />

          <Route path='agregarEstudiante' element={
            isAuthenticated ? <AgregarEstudiante /> : <Navigate to="/login" />} />
          <Route path='agregarInstructor' element={
            isAuthenticated ? <AgregarInstructor /> : <Navigate to="/login" />} />

          {/* <Route path='/turno' element={
            isAuthenticated ? <Turno /> : <Navigate to="/login" />
          } /> */}
          <Route path='/estudiante' element={
            isAuthenticated ? <Student /> : <Navigate to="/login" />
          } />
          <Route path='/' element={
            isAuthenticated ? <Home /> : <Navigate to="/login" />
          } />
          <Route path='/clase' element={
            isAuthenticated ? <ClasePage /> : <Navigate to="/login" />
          } />
          <Route path='/agregarClase' element={
            isAuthenticated ? <AgregarClase /> : <Navigate to="/login" />
          } />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </BrowserRouter>
      </ReloadPageProvider>
    </authenticatedContext.Provider>
  )
}

export default App
