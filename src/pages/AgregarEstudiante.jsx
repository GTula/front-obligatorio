import { useState } from 'react'
import axios from 'axios';
import "./agregarJuego.css"
import { useNavigate } from 'react-router-dom';

function AgregarEstudiante() {
    const baseURL = "http://localhost:5000/api/alumnos"  // Cambié la URL para apuntar a tu backend

    const navigate = useNavigate();

    const postEstudiante = () => {
        axios.post(baseURL, info)
            .then((response) => {
                console.log('Estudiante agregado:', response.data);
                navigate('/student');  
            })
            .catch((error) => {
                console.error('Error al agregar el estudiante:', error);
            });
    };

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
                    type="date"  // Asumí que `fecha_nacimiento` es una fecha
                    name="fecha_nacimiento"
                    placeholder="Fecha de Nacimiento"
                    value={info.fecha_nacimiento}
                    onChange={handleInputChange}
                />
            </div>
            <button className='boton-agregar' onClick={postEstudiante}>AGREGAR ESTUDIANTE</button>
        </div>
    );
}

export default AgregarEstudiante;
