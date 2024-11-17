import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Actividad from '../components/Actividades/Actividad';
import './pagesStyles.css';
import BackendCallerActividad from '../backend-caller/Actividades';
import { reloadContext } from '../components/commonContexts/ReloadPageProvider';

function ActividadPage() {
    const [actividades, setActividades] = useState([]);
    const [reload, setReload] = useContext(reloadContext);
    const [loading, setLoading] = useState(false);

    async function fetchActividades() {
        setLoading(true); 
        try{
            const response = await BackendCallerActividad.getAllActividades();
            if (response) {
                setActividades(response);
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
        fetchActividades();
    }, [reload]);

    return (
        <div>
            <h1 className="titulo">Lista de actividades</h1>
            <Link to="/AgregarActividad">
                <button className="botonAgregar">Agregar actividad</button>
            </Link>
            <div className="container">
                {actividades &&
                    actividades.map((actividad) => (
                        <Actividad
                            key={actividad.id} 
                            id={actividad.id}
                            nombre={actividad.nombre}
                            costo={actividad.costo}
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

export default ActividadPage;
