import React, { useState } from 'react';
import axios from 'axios';

function Clase(props) {
    const { id, nombreInstructor, instructor, actividad, turno, dictada } = props;

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [alumnos, setAlumnos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const mostrarDetalles = () => {
        setShowModal(true);
    };

    const cerrarModal = () => {
        setShowModal(false);
    };

    const verAlumnos = async () => {
        setShowModal2(true);
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/alumno-clase/${id}`);
            setAlumnos(response.data);
        } catch (err) {
            setError("Error al obtener la lista de alumnos.");
        } finally {
            setIsLoading(false);
        }
    };

    const cerrarModal2 = () => {
        setShowModal2(false);
        setAlumnos([]);
    };

    return (
        <div>
            <div className='box'>
                {id && actividad && <h2>{actividad}</h2>}
                <h2>{"Id: " + id}</h2>
                <div className='card-options'>
                    <button className='boton-card' onClick={mostrarDetalles}>Detalles</button>
                    <button className='boton-card' onClick={verAlumnos}>Ver alumnos</button>
                </div>
            </div>

            {/* Modal de detalles */}
            {showModal && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h2>Detalles de la clase</h2>
                        <p><strong>Id:</strong> {id}</p>
                        <p><strong>Actividad:</strong> {actividad}</p>
                        <p><strong>Instructor:</strong> {nombreInstructor + " " + instructor}</p>
                        <p><strong>Turno:</strong> {turno}</p>
                        <p><strong>Dictada:</strong> {dictada}</p>
                        <button onClick={cerrarModal}>Cerrar</button>
                    </div>
                </div>
            )}

            {/* Modal de alumnos */}
            {showModal2 && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h2>Alumnos inscritos</h2>
                        {isLoading ? (
                            <p>Cargando...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : alumnos.length > 0 ? (
                            <ul>
                                {alumnos.map((alumno) => (
                                    <li key={alumno.ci}>
                                        <strong>CI:</strong> {alumno.ci},
                                        <strong> Nombre:</strong> {alumno.nombre},
                                        <strong> Apellido:</strong> {alumno.apellido},
                                        <strong> Equipamiento:</strong> {alumno.id_equipamiento}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay alumnos inscritos en esta clase.</p>
                        )}
                        <button onClick={cerrarModal2}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Clase;
