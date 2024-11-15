import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackendCallerAlumno from '../../backend-caller/Alumnos';
import '../commonStyles/agregarPersona.css'

function AgregarEstudiante() {

    const navigate = useNavigate();


    async function postEstudiante(info) {
        navigate('/estudiante')
        await BackendCallerAlumno.addStudent(info);
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
        </div>
    );
}

export default AgregarEstudiante;
