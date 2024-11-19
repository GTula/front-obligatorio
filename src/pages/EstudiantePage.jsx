import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import Estudiante from '../components/Estudiantes/Estudiante';
import './pagesStyles.css';
import BackendCallerAlumno from '../backend-caller/Alumnos';
import { reloadContext } from '../components/commonContexts/ReloadPageProvider';

function Student() {
    const [students, setStudents] = useState([]);

    const [reload, setReload] = useContext(reloadContext)

    const [loading, setLoading] = useState(false);

    async function fetchStudents() {
        setLoading(true); 
        try{
            const response = await BackendCallerAlumno.getAllStudents();
            if (response) { 
                setStudents(response.alumnos);
            }
        }
        catch (err) {
            alert('Error al conectar con el servidor');
        }
        finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        fetchStudents();
    }, [reload])

    return (
        <div >
            <Link to="/">
                <button className="boton-arriba-izquierda">🏠 Ir a Home</button>
            </Link>
                <h1 className='titulo'>Lista de estudiantes</h1>
                <Link to={"/AgregarEstudiante"}>
                <button className='botonAgregar'>Agregar estudiante</button>
                </Link>
                <div className='container'>
                    {students && students.map((estudiante) => (
                        <Estudiante
                            key={estudiante.ci} 
                            nombre={estudiante.nombre}
                            ci={estudiante.ci}
                            apellido={estudiante.apellido}
                            fecha_nacimiento={estudiante.fecha_nacimiento} 
                        />
                    ))}
                </div>
                {loading && (
                <div className="loading-modal">
                    <div className="loading-content">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Cargando...</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Student;
