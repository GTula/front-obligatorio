import { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackendCallerAlumno from '../../backend-caller/Alumnos';
import '../commonStyles/agregarPersona.css'
import { reloadContext } from '../commonContexts/ReloadPageProvider';

function AgregarEstudiante() {
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useContext(reloadContext)

    const navigate = useNavigate();


    async function postEstudiante(info) {
        setLoading(true);
        try{
            navigate('/estudiante')
            await BackendCallerAlumno.addStudent(info);
        }
        catch (err) {
            alert('Error al conectar con el servidor');
        }
        finally {
            setLoading(false); 
        }
        setReload(!reload)
    }

    const [info, setInfo] = useState({
        ci: '',
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
    });

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
                <input
                    type="text"
                    name="ci"
                    placeholder="CI del estudiante"
                    value={info.ci}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={info.nombre}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={info.apellido}
                    onChange={handleInputChange}
                />
                <input
                    type="date"  
                    name="fecha_nacimiento"
                    placeholder="Fecha de Nacimiento"
                    value={info.fecha_nacimiento}
                    onChange={handleInputChange}
                />
            </div>
            <button className='boton-agregar' onClick={() => postEstudiante(info)}>AGREGAR ESTUDIANTE</button>
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

export default AgregarEstudiante;
