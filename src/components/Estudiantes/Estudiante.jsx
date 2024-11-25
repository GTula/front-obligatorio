import React, { useContext, useState } from 'react';
import '../commonStyles/Card-style.css'
import BackendCallerAlumno from '../../backend-caller/Alumnos';
import { reloadContext } from '../commonContexts/ReloadPageProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Estudiante(props) {
    const { nombre, ci, fecha_nacimiento, apellido } = props;
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [showNewModal, setShowNewModal] = useState(false);
    const [studentDetails, setStudentDetails] = useState(null);

    const [reload, setReload] = useContext(reloadContext)
    const [loading, setLoading] = useState(false);

    const [info, setInfo] = useState({
        nombre: nombre || '',
        apellido: apellido || '',
    });

    const [showLinkModal, setShowLinkModal] = useState(false);
    const [clasesDisponibles, setClasesDisponibles] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [equipamiento, setEquipamiento] = useState('');
    const [equipamientosDisponibles, setEquipamientosDisponibles] = useState([]);

    async function eliminarEstudiante(ci) {
        setLoading(true);
        try{
            await BackendCallerAlumno.deleteStudentByCi(ci);
            setReload(!reload);
        }
        catch (err) {
            alert('Error al conectar con el servidor');
        }
        finally {
            setLoading(false); 
        }
    }

    async function mostrarDetalles(ci) {
        setLoading(true);
        try{
            const alumno = await BackendCallerAlumno.getStudentByCi(ci);
            if (alumno) {
                setStudentDetails(alumno); 
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
    

    function cerrarModal() {
        setShowModal(false);
        setStudentDetails(null); 
        setShowNewModal(false);
    }

    async function modificarAlumno() {
        await BackendCallerAlumno.putAlumnoByCi(ci, info);
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

    const abrirModalVinculacion = () => {
        setLoading(true);
        axios.all([
            axios.get('http://127.0.0.1:5000/api/clases'),
            axios.get('http://127.0.0.1:5000/api/equipamiento')
        ])
        .then(axios.spread((clasesResponse, equipamientosResponse) => {
            setClasesDisponibles(clasesResponse.data);
            setEquipamientosDisponibles(equipamientosResponse.data);
            setShowLinkModal(true);
        }))
        .catch(error => {
            alert("Error al cargar los datos disponibles.");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const confirmarVinculacion = async () => {
        if (!selectedClass) {
            alert("Debe seleccionar una clase.");
            return;
        }
        if (!equipamiento) {
            alert("Debe seleccionar un equipamiento.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/alumno-clase', {
                ci_alumno: ci,
                id_clase: selectedClass,
                id_equipamiento: equipamiento
            });

            alert(`Éxito: ${response.data.mensaje}`);
            setShowLinkModal(false);
            setSelectedClass('');
            setEquipamiento('');
        } catch (error) {
            if (error.response) {
                alert(`Error del servidor: ${error.response.data.error}`);
            } else {
                alert("Error al conectar con el servidor.");
            }
        } finally {
            setLoading(false);
        }
    };

    


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
                        <button onClick={abrirModalVinculacion}>Vincular clase</button>
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
                        <button className='boton-card' onClick={modificarAlumno}>Guardar</button>
                        <button className='boton-card' onClick={cerrarModal}>Cancelar</button>
                    </div>
                </div>
            )}
            {showLinkModal && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h2>Vincular a Clase</h2>
                        <div className='container-inputs'>
                            <label>Clase:</label>
                            <select 
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <option value="">Seleccione una clase</option>
                                {clasesDisponibles.map((clase) => (
                                    <option key={clase.id_clase} value={clase.id_clase}>
                                        {`${clase.descripcion_actividad} - ${clase.hora_inicio} a ${clase.hora_final}`}
                                    </option>
                                ))}
                            </select>

                            <label>Equipamiento:</label>
                            <select
                                value={equipamiento}
                                onChange={(e) => setEquipamiento(e.target.value)}
                            >
                                <option value="">Seleccione un equipamiento</option>
                                {equipamientosDisponibles.map((equip) => (
                                    <option key={equip.id} value={equip.id}>
                                        {`${equip.descripcion} - Estado: ${equip.estado}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='modal-buttons'>
                            <button className='boton-confirmar' onClick={confirmarVinculacion}>Confirmar</button>
                            <button className='boton-cancelar' onClick={() => {
                                setShowLinkModal(false);
                                setSelectedClass('');
                                setEquipamiento('');
                            }}>Cancelar</button>
                        </div>
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
        </div>
    );
}

export default Estudiante;