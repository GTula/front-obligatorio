import React, { useContext, useState } from 'react';
import '../commonStyles/Card-style.css';
import BackendCallerTurno from '../../backend-caller/Turnos';
import { reloadContext } from '../commonContexts/ReloadPageProvider';

function Turno(props) {
    const { id, hora_inicio, hora_final } = props;

    const [showNewModal, setShowNewModal] = useState(false);
    const [info, setInfo] = useState({
        hora_inicio: hora_inicio || '',
        hora_final: hora_final || '',
    });

    const [reload, setReload] = useContext(reloadContext);
    const [loading, setLoading] = useState(false);

    async function eliminarTurno(id) {
        setLoading(true); 
        try {
            const response = await BackendCallerTurno.deleteTurnoById(id);
            
            if (response && response.mensaje) {
                alert(response.mensaje); 
            } else if (response) {
                alert(response); 
            } else {
                alert('El turno ha sido eliminado');
            }
        } catch (err) {
            alert('Error al conectar con el servidor');
        } finally {
            setLoading(false); 
        }
        setReload(!reload);
    }
    
    
    async function modificarTurno() {
        setLoading(true);
        try{
            await BackendCallerTurno.putTurnoById(id, info);
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

    function abrirNewModal() {
        setShowNewModal(true);
        setInfo({
            hora_inicio,
            hora_final,
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
            <h2>{`Inicio: ${hora_inicio}, Fin: ${hora_final}`}</h2>
            <div className="card-options">
                <button className="boton-card" onClick={abrirNewModal}>Modificar</button>
                <button className="boton-card" onClick={() => eliminarTurno(id)}>Eliminar</button>
            </div>

            {showNewModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Modificar Turno</h3>
                        <label>
                            Hora Inicio:
                            <input
                                type="time"
                                name="hora_inicio"
                                value={info.hora_inicio}
                                onChange={handleInputChange}
                            />
                        </label><br/>
                        <label>
                            Hora Final:
                            <input
                                type="time"
                                name="hora_final"
                                value={info.hora_final}
                                onChange={handleInputChange}
                            />
                        </label><br/>
                        <button onClick={modificarTurno}>Guardar</button>
                        <button onClick={cerrarModal}>Cancelar</button>
                    </div>
                </div>
            )}
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

export default Turno;
