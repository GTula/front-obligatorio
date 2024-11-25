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

    const [loading, setLoading] = useState(false);

    async function fetchInstructores() {
        setLoading(true); 
        try{
            const response = await BackendCallerInstructor.getAllInstructores();
            if (response) { 
                setInstructores(response.instructores);
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
        fetchInstructores();
    }, [reload])

    return (
        <div >
            <Link to="/">
                <button className="boton-arriba-izquierda">🏠 Ir a Home</button>
            </Link>
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
                {loading && (
                <div class="loading-modal">
                    <div class="loading-content">
                        <div class="loading-spinner"></div>
                        <p class="loading-text">Cargando...</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InstructorPage;
