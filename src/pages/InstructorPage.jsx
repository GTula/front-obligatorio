import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Instructor from '../components/Instructores/Instructor';
import './pagesStyles.css';
import BackendCallerInstructor from '../backend-caller/Instructores';
import { reloadContext } from '../components/commonContexts/ReloadPageProvider';
import { useNavigate } from 'react-router-dom';

function InstructorPage() {
    const [instructores, setInstructores] = useState([]);

    const [reload, setReload] = useContext(reloadContext)

    async function fetchInstructores() {
        const response = await BackendCallerInstructor.getAllInstructores();
        if (response) { 
            setInstructores(response.instructores);
            console.log(response)
        }
    }
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    }

    useEffect(() => {
        fetchInstructores();
    }, [reload])

    return (
        <div >
                <h1 className='titulo'>Lista de instructores</h1>
                <Link to={"/AgregarInstructor"}>
                <button className='botonAgregar'>Agregar instructor</button>
                </Link>
                <button onClick={handleBack}>Volver</button>
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
