import React, { useContext, useState } from 'react';
import '../commonStyles/Card-style.css'
import BackendCaller from '../../backend-caller/Alumnos';
import { reloadContext } from '../commonContexts/ReloadPageProvider';

function Estudiante(props) {
    const { nombre, ci, fecha_nacimiento, apellido } = props;

    const [showModal, setShowModal] = useState(false);
    const [showNewModal, setShowNewModal] = useState(false);
    const [studentDetails, setStudentDetails] = useState(null);

    const [reload, setReload] = useContext(reloadContext)

    const [info, setInfo] = useState({
        nombre: nombre || '',
        apellido: apellido || '',
    });

    async function eliminarEstudiante(ci) {
        await BackendCaller.deleteStudentByCi(ci);
        setReload(!reload);
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
        setShowNewModal(false);
    }

    async function modificarAlumno() {
        await BackendCaller.putAlumnoByCi(ci, info);
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
            {fecha_nacimiento && <p>{fecha_nacimiento}</p>}
            <div className='card-options'>
                <button className='boton-card' onClick={() => mostrarDetalles(ci)}>Detalles</button>
                <button className='boton-card' onClick={abrirNewModal}>Modificar</button>
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
                        <button onClick={modificarAlumno}>Guardar</button>
                        <button onClick={cerrarModal}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Estudiante;
