import React, { useContext, useState } from 'react';
import '../commonStyles/Card-style.css';
import BackendCallerActividad from '../../backend-caller/Actividades';
import { reloadContext } from '../commonContexts/ReloadPageProvider';

function Actividad(props) {
    const { id, nombre, costo } = props;

    const [showNewModal, setShowNewModal] = useState(false);
    const [info, setInfo] = useState({
        nombre: nombre || '',
        costo: costo || '',
    });

    const [reload, setReload] = useContext(reloadContext);

    async function eliminarActividad(id) {
        await BackendCallerActividad.deleteActividadById(id);
        setReload(!reload);
    }

    async function modificarActividad() {
        await BackendCallerActividad.putActividadById(id, info);
        setReload(!reload);
        setShowNewModal(false);
    }

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

    return (
        <div className="box">
            <h2>{`Descripcion: ${nombre}, Costo: ${costo}`}</h2>
            <div className="card-options">
                <button className="boton-card" onClick={abrirNewModal}>Modificar</button>
                <button className="boton-card" onClick={() => eliminarActividad(id)}>Eliminar</button>
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
        </div>
    );
}

export default Actividad;
