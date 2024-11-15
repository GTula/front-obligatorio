import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Clase from '../components/Clases/Clase';
import './pagesStyles.css';
import BackendCaller from '../backend-caller/Clases';
import { reloadContext } from '../components/commonContexts/ReloadPageProvider';
import { useNavigate } from 'react-router-dom';

function ClasePage() {
    const [clases, setClases] = useState([]);

    const [reload, setReload] = useContext(reloadContext)
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    }

    async function fetchClases() {
        const response = await BackendCaller.getAllClases();
        console.log(response)
        if (response) { 
            setClases(response);

        }
    }

    useEffect(() => {
        fetchClases();
    }, [reload])

    return (
        <div >
                <h1 className='titulo'>Lista de clases</h1>
                <Link to={"/AgregarClase"}>
                <button className='botonAgregar'>Agregar clase</button>
                </Link>
                <button onClick={handleBack}>Volver</button>
                <div className='container'>
                    {clases && clases.map((clase) => (
                        <Clase
                        key={clase.id_clase} 
                        id={clase.id_clase} 
                        nombreInstructor={clase.nombre_instructor}  
                        instructor={clase.apellido_instructor}
                        actividad={clase.descripcion_actividad}
                        turno={`${clase.hora_inicio} - ${clase.hora_final}`} 
                        dictada={clase.dictada}
                        />                    
                    ))}
                </div>
        </div>
    );
}

export default ClasePage;
