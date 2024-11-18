import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Turno from '../components/Turnos/Turno';
import './pagesStyles.css';
import BackendCallerTurno from '../backend-caller/Turnos';
import { reloadContext } from '../components/commonContexts/ReloadPageProvider';

function Turnos() {
    const [turnos, setTurnos] = useState([]);
    const [reload, setReload] = useContext(reloadContext);
    const [loading, setLoading] = useState(false);

    async function fetchTurnos() {
        setLoading(true); 
        try{
            const response = await BackendCallerTurno.getAllTurnos();
            if (response) {
                setTurnos(response);
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
        fetchTurnos();
    }, [reload]);

    return (
        <div>
            <Link to="/">
                <button className="boton-arriba-izquierda">🏠 Ir a Home</button>
            </Link>
            <h1 className="titulo">Lista de turnos</h1>
            <Link to="/AgregarTurno">
                <button className="botonAgregar">Agregar turno</button>
            </Link>
            <div className="container">
                {turnos &&
                    turnos.map((turno) => (
                        <Turno
                            key={turno.id} 
                            id={turno.id}
                            hora_inicio={turno.hora_inicio}
                            hora_final={turno.hora_final}
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

export default Turnos;
