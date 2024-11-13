import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import Estudiante from '../components/Estudiantes/Estudiante';
import './pagesStyles.css';
import BackendCaller from '../backend-caller/Alumnos';

function Student() {
    const [students, setStudents] = useState([]);

    async function fetchStudents() {
        const response = await BackendCaller.getAllStudents();

        if (response) { 
            setStudents(response.alumnos);

        }
    }

    useEffect(() => {
        fetchStudents();
    }, [])

    return (
        <div >
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
        </div>
    );
}

export default Student;
