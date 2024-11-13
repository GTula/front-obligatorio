import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BackendCaller from '../../backend-caller/Instructores';
import '../commonStyles/agregarPersona.css'

function AgregarInstructor() {

    const navigate = useNavigate();


    async function postInstructor(info) {
        navigate('/instructor')
        await BackendCaller.addInstructor(info);
    }

    const [info, setInfo] = useState({
        ci: '',
        nombre: '',
        apellido: '',
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
                    placeholder="CI del instructor"
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
            </div>
            <button className='boton-agregar' onClick={() => postInstructor(info)}>AGREGAR INSTRUCTOR</button>
        </div>
    );
}

export default AgregarInstructor;
