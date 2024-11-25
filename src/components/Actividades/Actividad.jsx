import React, { useContext, useState } from 'react';
import '../commonStyles/Card-style.css';
import BackendCallerActividad from '../../backend-caller/Actividades';
import { reloadContext } from '../commonContexts/ReloadPageProvider';
import axios from 'axios';

function Actividad(props) {
    const { id, nombre, costo } = props;

    const [showNewModal, setShowNewModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [info, setInfo] = useState({
        nombre: nombre || '',
        costo: costo || '',
    });

    const [reload, setReload] = useContext(reloadContext);
    const [loading, setLoading] = useState(false);


    
    function abrirNewModal() {
        setShowNewModal(true);
        setInfo({
            nombre,
            costo,
        });
    }

    function cerrarModal() {
        setShowNewModal(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value,
        });
    };
    async function modificarActividad() {
        setLoading(true);
        try{
            await BackendCallerActividad.putActividadById(id, info);
            setReload(!reload);
            setShowNewModal(false);
        }
        catch (err) {
            alert('Error al conectar con el servidor');
        }
        finally {
            setLoading(false); 
        }
    }

    async function eliminarActividad(){
        setLoading(true);
        try{
            await BackendCallerActividad.deleteActividadById(id);
            setReload(!reload);     
            setShowDetailsModal(false);
        }
        catch (err) {
            alert('Error al conectar con el servidor');
        }
        finally {
            setLoading(false);
        }
    }

    function abrirDetailsModal() {
        setShowDetailsModal(true);
    }
    function cerrarDetailsModal() {
        setShowDetailsModal(false);
    }

    return (
        <div className="box">
            <h2 className='titulooo'>{` ${nombre}`}</h2>
            <div className="card-options">
                <button className="boton-card" onClick={abrirNewModal}>Modificar</button>
                <button className="boton-card" onClick={abrirDetailsModal}>Detalles</button>    
            </div>

            {showNewModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Modificar Turno</h3>
                        <label>
                            Descripción:
                            <input
                                type="text"
                                name="nombre"
                                value={info.nombre}
                                onChange={handleInputChange}
                            />
                        </label><br/>
                        <label>
                            Costo:
                            <input
                                type="number"
                                name="costo"
                                value={info.costo}
                                onChange={handleInputChange}
                            />
                        </label><br/>
                        <button onClick={modificarActividad}>Guardar</button>
                        <button onClick={cerrarModal}>Cancelar</button>
                    </div>
                </div>
            )}
            {loading && (
                <div className="loading-modal">
                    <div className="loading-content">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Cargando...</p>
                    </div>
                </div>
            )}
            {showDetailsModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Detalles de la actividad</h3>
                        <p>Nombre: {nombre}</p>
                        <p>Costo: {costo}</p>
                        <button onClick={eliminarActividad}>Eliminar</button>
                        <button onClick={cerrarDetailsModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Actividad;
