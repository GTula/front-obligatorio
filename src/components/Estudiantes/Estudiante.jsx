import React, { useState } from 'react';
import '../commonStyles/Card-style.css'
import BackendCaller from '../../backend-caller/Alumnos';

function Estudiante(props) {
    const { nombre, ci, fecha_nacimiento, apellido } = props;

    const [showModal, setShowModal] = useState(false);
    const [studentDetails, setStudentDetails] = useState(null);

    async function eliminarEstudiante(ci) {
        await BackendCaller.deleteStudentByCi(ci);
    }

    async function mostrarDetalles(ci) {
        const alumno = await BackendCaller.getStudentByCi(ci);
        if (alumno) {
            setStudentDetails(alumno); 
            setShowModal(true); 
        }
    }
    

    function cerrarModal() {
        setShowModal(false);
        setStudentDetails(null); 
    }

    return (
        <div className='box'>
            {nombre && apellido && <h2>{nombre + " " + apellido}</h2>}
            {fecha_nacimiento && <p>{fecha_nacimiento}</p>}
            <div className='card-options'>
                <button className='boton-card' onClick={() => mostrarDetalles(ci)}>Detalles</button>
                <button className='boton-card' onClick={() => eliminarEstudiante(ci)}>Eliminar</button>
            </div>

            {showModal && studentDetails && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h2>Detalles del Alumno</h2>
                        <p><strong>CI:</strong> {studentDetails.ci}</p>
                        <p><strong>Nombre:</strong> {studentDetails.nombre}</p>
                        <p><strong>Apellido:</strong> {studentDetails.apellido}</p>
                        <p><strong>Fecha de Nacimiento:</strong> {studentDetails.fecha_nacimiento}</p>
                        <button onClick={cerrarModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Estudiante;
