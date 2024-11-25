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

    const [loading, setLoading] = useState(false);


    async function fetchClases() {
        setLoading(true); 
        try{
            const response = await BackendCaller.getAllClases();
            if (response) { 
                setClases(response);
    
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
        fetchClases();
    }, [reload])

    return (
        <div >
            <Link to="/">
                <button className="boton-arriba-izquierda">🏠 Ir a Home</button>
            </Link>
                <h1 className='titulo'>Lista de clases</h1>
                <Link to={"/AgregarClase"}>
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

export default ClasePage;
