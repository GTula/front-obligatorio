import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import Instructor from '../components/Instructores/Instructor';
import './pagesStyles.css';
import BackendCaller from '../backend-caller/Instructores';

function InstructorPage() {
    const [instructores, setInstructores] = useState([]);

    async function fetchInstructores() {
        const response = await BackendCaller.getAllInstructores();
        if (response) { 
            setInstructores(response.instructores);
            console.log(response)
        }
    }

    useEffect(() => {
        fetchInstructores();
    }, [])

    return (
        <div >
                <h1 className='titulo'>Lista de instructores</h1>
                <Link to={"/AgregarInstructor"}>
                <button className='botonAgregar'>Agregar instructor</button>
                </Link>
                <div className='container'>
                    {instructores && instructores.map((instructor) => (
                        <Instructor
                            key={instructor.ci} 
                            nombre={instructor.nombre}
                            ci={instructor.ci}
                            apellido={instructor.apellido}
                        />
                    ))}
                </div>
        </div>
    );
}

export default InstructorPage;
