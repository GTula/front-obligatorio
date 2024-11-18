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
import Turnos from './pages/Turnos'
import AgregarTurno from './components/Turnos/AgregarTurno'
import AgregarActividad from './components/Actividades/AgregarActividad'
import ActividadPage from './pages/ActividadPage'
import Reportes from './pages/ReportesPage'
import ActividadesAlumnos from './components/Reportes/ActividadesAlumnos'
import ActividadesIngresos from './components/Reportes/ActividadesIngresos'
import TurnosDictados from './components/Reportes/TurnosDictados'

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
          <Route path='/turno' element={
            isAuthenticated ? <Turnos /> : <Navigate to="/login" />
          } />
          <Route path='/agregarTurno' element={
            isAuthenticated ? <AgregarTurno /> : <Navigate to="/login" />
          } />
          <Route path='/actividad' element={
            isAuthenticated ? <ActividadPage /> : <Navigate to="/login" />
          } />
          <Route path='/agregarActividad' element={
            isAuthenticated ? <AgregarActividad /> : <Navigate to="/login" />
          } />
          <Route path='/reportes' element={
            isAuthenticated ? <Reportes /> : <Navigate to="/login" />
          } />
          <Route path='/actividades-mas-alumnos' element={
            isAuthenticated ? <ActividadesAlumnos /> : <Navigate to="/login" />
          } />
          <Route path='/actividades-mas-ingresos' element={
            isAuthenticated ? <ActividadesIngresos /> : <Navigate to="/login" />
          } />
          <Route path='/turnos-mas-dictados' element={
            isAuthenticated ? <TurnosDictados /> : <Navigate to="/login" />
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
