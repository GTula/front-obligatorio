import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackendCallerInstructor from '../../backend-caller/Instructores';
import BackendCallerClase from '../../backend-caller/Clases';
import BackendCallerTurno from '../../backend-caller/Turnos';
import BackendCallerActividad from '../../backend-caller/Actividades';
import '../commonStyles/agregarPersona.css';

function AgregarClase() {
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        ci_instructor: '',
        id_actividad: '',
        id_turno: '',
        dictada: '',
    });

    const [instructores, setInstructores] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchOptions() {
            setLoading(true);
            try {
                const instructoresResponse = await BackendCallerInstructor.getAllInstructores();
                const actividadesResponse = await BackendCallerActividad.getAllActividades();
                const turnosResponse = await BackendCallerTurno.getAllTurnos();
    
                setInstructores(instructoresResponse.instructores || []);
                console.log(instructoresResponse);
                setActividades(actividadesResponse || []);
                console.log(actividadesResponse );

                setTurnos(turnosResponse || []);
                console.log(turnosResponse );

            } catch (error) {
                console.error("Error al cargar los datos:", error);
                setInstructores([]); 
                setActividades([]);
                setTurnos([]);
            }
            finally {
                setLoading(false); 
            }
        }
        fetchOptions();
    }, []);
    

    async function postClase(info) {
        setLoading(true);
        try{
            await BackendCallerClase.addClase(info);
            navigate('/clase');
        }
        catch (err) {
            alert('Error al conectar con el servidor');
        }
        finally {
            setLoading(false); 
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    };

    return (
        <div className='agregar-container'>
            <div className='container-inputs'>
                <select
                    name="ci_instructor"
                    value={info.ci_instructor}
                    onChange={handleInputChange}
                >
                    <option value="">Seleccione un instructor</option>
                    {instructores.map(instructor => (
                        <option key={instructor.ci} value={instructor.ci}>
                            {instructor.nombre} {instructor.apellido}
                        </option>
                    ))}
                </select>

                <select
                    name="id_actividad"
                    value={info.id_actividad}
                    onChange={handleInputChange}
                >
                    <option value="">Seleccione una actividad</option>
                    {actividades.map(actividad => (
                        <option key={actividad.id} value={actividad.id}>
                            {actividad.nombre} 
                        </option>
                    ))}
                </select>


                <select
                    name="id_turno"
                    value={info.id_turno}
                    onChange={handleInputChange}
                >
                    <option value="">Seleccione un turno</option>
                    {turnos.map(turno => (
                        <option key={turno.id} value={turno.id}>
                            {turno.hora_inicio} - {turno.hora_final}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    name="dictada"
                    value={info.dictada}
                    onChange={handleInputChange}
                />
            </div>
            <button className='boton-agregar' onClick={() => postClase(info)}>AGREGAR CLASE</button>
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

export default AgregarClase;