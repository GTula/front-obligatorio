import React, { useContext, useState } from 'react';
import '../commonStyles/Card-style.css';
import BackendCallerInstructor from '../../backend-caller/Instructores';
import { reloadContext } from '../commonContexts/ReloadPageProvider';

function Instructor(props) {
    const { nombre, ci, apellido } = props;

    const [showModal, setShowModal] = useState(false);
    const [showNewModal, setShowNewModal] = useState(false);
    const [instructorDetails, setInstructorDetails] = useState(null);

    const [reload, setReload] = useContext(reloadContext)
    const [loading, setLoading] = useState(false);

    const [info, setInfo] = useState({
        nombre: nombre || '',
        apellido: apellido || '',
    });

    async function eliminarInstructor(ci) {
        setLoading(true);
        try {
            const response = await BackendCallerInstructor.deleteInstructorByCi(ci);
            
            if (response && response.mensaje) {
                alert(response.mensaje); 
                setReload(!reload);
            } else if (response) {
                alert(response); 
            } else {
                alert('Instructor eliminado correctamente');
            }
        } catch (err) {
            alert('Error al conectar con el servidor');
        } finally {
            setLoading(false); 
        }
        setReload(!reload)
    }
    

    async function mostrarDetalles(ci) {
        setLoading(true);
        try{
            const instructor = await BackendCallerInstructor.getInstructorByCi(ci);
            if (instructor) {
                setInstructorDetails(instructor); 
                setShowModal(true); 
            }
        }
        catch (err) {
            alert('Error al conectar con el servidor');
        }
        finally {
            setLoading(false); 
        }
    }

    async function modificarInstructor() {
        await BackendCallerInstructor.putInstructorByCi(ci, info);
        setReload(!reload);
        setShowNewModal(false);
        mostrarDetalles(ci);
    }

    function abrirNewModal() {
        setShowNewModal(true);
        setInfo({
            nombre: nombre,
            apellido: apellido
        });
    }

    function cerrarModal() {
        setShowModal(false);
        setShowNewModal(false);
        setInstructorDetails(null);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value 
        });
    };

    return (
        <div className='box'>
            {nombre && apellido && <h2>{nombre + " " + apellido}</h2>}
            <div className='card-options'>
                <button className='boton-card' onClick={() => mostrarDetalles(ci)}>Detalles</button>
                <button className='boton-card' onClick={abrirNewModal}>Modificar</button>
                <button className='boton-card' onClick={() => eliminarInstructor(ci)}>Eliminar</button>
            </div>

            {showModal && instructorDetails && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h2>Detalles del Instructor</h2>
                        <p><strong>CI:</strong> {instructorDetails.ci}</p>
                        <p><strong>Nombre:</strong> {instructorDetails.nombre}</p>
                        <p><strong>Apellido:</strong> {instructorDetails.apellido}</p>
                        <button onClick={cerrarModal}>Cerrar</button>
                    </div>
                </div>
            )}

            {showNewModal && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h2>Ingrese los nuevos valores</h2>
                        <p>Nombre:</p>
                        <input
                            type="text"
                            name="nombre" 
                            placeholder='Nombre'
                            value={info.nombre}
                            onChange={handleInputChange}
                        />
                        <p>Apellido:</p>
                        <input
                            type="text"
                            name="apellido" 
                            placeholder='Apellido'
                            value={info.apellido}
                            onChange={handleInputChange}
                        />
                        <button onClick={modificarInstructor}>Guardar</button>
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

export default Instructor;
