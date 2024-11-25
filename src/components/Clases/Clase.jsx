import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BackendCallerActividad from '../../backend-caller/Actividades';
import BackendCallerInstructor from '../../backend-caller/Instructores';
import BackendCallerTurno from '../../backend-caller/Turnos';
import { reloadContext } from '../commonContexts/ReloadPageProvider';
import '../commonStyles/Card-style.css'


function Clase(props) {
    const { id, nombreInstructor, instructor, actividad, turno, dictada } = props;

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [alumnos, setAlumnos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useContext(reloadContext);

    const [info, setInfo] = useState({
        ci_instructor: '',
        id_actividad: '',
        id_turno: '',
        dictada,
    });

    const [instructores, setInstructores] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [turnos, setTurnos] = useState([]);

    const mostrarDetalles = () => setShowModal(true);
    const cerrarModal = () => setShowModal(false);

    const verAlumnos = async () => {
        setShowModal2(true);
        setIsLoading(true);
        setError(null);
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/alumno-clase/${id}`);
            setAlumnos(response.data);
        } catch (err) {
            setError("Error al obtener la lista de alumnos.");
        } finally {
            setIsLoading(false);
            setLoading(false); 
        }
        
    };

    const quitarAlumno = async (ci) => {
        setLoading(true);
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/api/alumno-clase/${ci}/${id}`);
            setAlumnos(response.data);
        } catch (err) {
            setError("Error al eliminar el alumno de la clase.");
        }
        finally {
            setLoading(false); 
        }
    };

    const cerrarModal2 = () => {
        setShowModal2(false);
        setAlumnos([]);
    };

    const mostrarEditModal = () => {
        setShowEditModal(true);
        fetchOptions();
    };

    const cerrarEditModal = () => setShowEditModal(false);

    const fetchOptions = async () => {
        setLoading(true);
        try {
            const instructoresResponse = await BackendCallerInstructor.getAllInstructores();
            const actividadesResponse = await BackendCallerActividad.getAllActividades();
            const turnosResponse = await BackendCallerTurno.getAllTurnos();

            setInstructores(instructoresResponse.instructores || []);
            setActividades(actividadesResponse || []);
            setTurnos(turnosResponse || []);

            setInfo({
                ci_instructor: nombreInstructor || '',
                id_actividad: actividad || '',
                id_turno: turno || '',
                dictada,
            });
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
        finally {
            setLoading(false); 
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    };

    const modificarClase = async () => {
        setLoading(true);
        try {
            await axios.put(`http://127.0.0.1:5000/api/clases/${id}`, info);
            alert("Clase modificada exitosamente.");
            cerrarEditModal();
            setReload(!reload)
        } catch (error) {
            console.error("Error al ingresar clase:", error.message);
            if (error.message.includes("400")) {
                alert("Error: Instructor ya tiene una clase en este turno.");
            } else {
                alert("Error al conectar con el servidor o procesar la solicitud.");
            }
    
            throw error;
        }
        finally {
            setLoading(false); 
        }
    };

    const eliminarClase = async () => {
        setLoading(true);
        await axios.delete(`http://127.0.0.1:5000/api/clases/${id}`);
        setReload(!reload);
        setLoading(false);
        cerrarModal();
    };


    return (
        <div>
            <div className='box'>
                {id && actividad && <h2>{actividad}</h2>}
                <h2>{"Id: " + id}</h2>
                <div className='card-options'>
                    <button className='boton-card' onClick={mostrarDetalles}>Detalles</button>
                    <button className='boton-card' onClick={mostrarEditModal}>Modificar</button>
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
                        <button className='boton-eliminar' onClick={eliminarClase}>Eliminar</button>
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
                                        <strong>CI:</strong> {alumno.ci}, <strong>Nombre:</strong> {alumno.nombre}, <strong>Apellido:</strong> {alumno.apellido}, <strong>Equipamiento:</strong> {alumno.id_equipamiento}
                                        <button onClick={() => quitarAlumno(alumno.ci)}>Quitar</button>
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

            {/* Modal de modificar */}
            {showEditModal && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h2>Modificar Clase</h2>
                        <div className='container-inputs'>
                            <select name="ci_instructor" value={info.ci_instructor} onChange={handleInputChange}>
                                <option value="">Seleccione un instructor</option>
                                {instructores.map((instructor) => (
                                    <option key={instructor.ci} value={instructor.ci}>
                                        {instructor.nombre} {instructor.apellido}
                                    </option>
                                ))}
                            </select>

                            <select name="id_actividad" value={info.id_actividad} onChange={handleInputChange}>
                                <option value="">Seleccione una actividad</option>
                                {actividades.map((actividad) => (
                                    <option key={actividad.id} value={actividad.id}>
                                        {actividad.nombre}
                                    </option>
                                ))}
                            </select>

                            <select name="id_turno" value={info.id_turno} onChange={handleInputChange}>
                                <option value="">Seleccione un turno</option>
                                {turnos.map((turno) => (
                                    <option key={turno.id} value={turno.id}>
                                        {turno.hora_inicio} - {turno.hora_final}
                                    </option>
                                ))}
                            </select>

                            <input type="date" name="dictada" value={info.dictada} onChange={handleInputChange} />
                        </div>
                        <button className='boton-agregar' onClick={modificarClase}>Guardar Cambios</button>
                        <button className='boton-cancelar' onClick={cerrarEditModal}>Cancelar</button>
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

export default Clase;


