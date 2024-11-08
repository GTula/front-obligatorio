import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importar Link
import Estudiante from '../components/estudiante';
import './students.css';


function Student() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/alumnos')
            .then(res => {
                console.log('Lista de estudiantes:', res.data);
                setStudents(res.data.alumnos); // Acceder a la lista correcta en la respuesta
            })
            .catch(err => {
                console.error('Error al obtener estudiantes:', err);
            });
    }, []);

    return (
        <div >
                <h1 className='titulo'>Lista de estudiantes</h1>
                <Link to={"/AgregarEstudiante"}>
                <button className='botonAgregar'>Agregar estudiante</button>
                </Link>
                <div className='estudiantes-container'>
                    {students && students.map((estudiante) => (
                        <Estudiante
                            key={estudiante.ci} // Añadir una key única para cada elemento
                            nombre={estudiante.nombre}
                            ci={estudiante.ci}
                            apellido={estudiante.apellido}
                            fecha_nacimiento={estudiante.fecha_nacimiento} // Acceder al valor en estudiante
                        />
                    ))}
                </div>
        </div>
    );
}

export default Student;
