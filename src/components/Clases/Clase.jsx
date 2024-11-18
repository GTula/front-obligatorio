import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BackendCallerActividad from '../../backend-caller/Actividades';
import BackendCallerInstructor from '../../backend-caller/Instructores';
import BackendCallerTurno from '../../backend-caller/Turnos';
import { reloadContext } from '../commonContexts/ReloadPageProvider';

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

    return (
        <div>
            <div className='box'>
                {id && actividad && <h2>{actividad}</h2>}
                <h2>{"Id: " + id}</h2>
                <div className='card-options'>
                    <button className='boton-card' onClick={() => mostrarDetalles(id)}>Detalles</button>
                    {/* <button className='boton-card' onClick={abrirNewModal}>Modificar</button> */}
                    <button className='boton-card' onClick={() => eliminarEstudiante(ci)}>Eliminar</button>
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
        </div>
    );
}

export default Clase;