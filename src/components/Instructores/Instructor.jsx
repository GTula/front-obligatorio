import React, { useState } from 'react';
import '../commonStyles/Card-style.css';
import BackendCaller from '../../backend-caller/Instructores';

function Instructor(props) {
    const { nombre, ci, apellido } = props;

    const [showModal, setShowModal] = useState(false);
    const [showNewModal, setShowNewModal] = useState(false);
    const [instructorDetails, setInstructorDetails] = useState(null);

    const [info, setInfo] = useState({
        nombre: nombre || '',
        apellido: apellido || '',
    });

    async function eliminarInstructor(ci) {
        await BackendCaller.deleteInstructorByCi(ci);
    }

    async function mostrarDetalles(ci) {
        const instructor = await BackendCaller.getInstructorByCi(ci);
        if (instructor) {
            setInstructorDetails(instructor); 
            setShowModal(true); 
        }
    }

    async function modificarInstructor() {
        await BackendCaller.putInstructorByCi(ci, info);
        console.log(ci, info)
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
                        <input
                            type="text"
                            name="nombre" 
                            placeholder='Nombre'
                            value={info.nombre}
                            onChange={handleInputChange}
                        />
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
        </div>
    );
}

export default Instructor;