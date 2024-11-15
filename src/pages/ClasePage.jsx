import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import Clase from '../components/Clases/Clase';
import './pagesStyles.css';
import BackendCaller from '../backend-caller/Clases';
import { reloadContext } from '../components/commonContexts/ReloadPageProvider';

function ClasePage() {
    const [clases, setClases] = useState([]);

    const [reload, setReload] = useContext(reloadContext)


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
                <Link to={"/AgregarEstudiante"}>
                <button className='botonAgregar'>Agregar clase</button>
                </Link>
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
