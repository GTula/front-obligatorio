import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import BackendCallerActividad from '../../backend-caller/Actividades';
import '../commonStyles/agregarPersona.css'
import { reloadContext } from '../commonContexts/ReloadPageProvider';

function AgregarActividad() {

    const navigate = useNavigate();
    const [reload, setReload] = useContext(reloadContext);


    async function postActividad(info) {
        navigate('/actividad')
        await BackendCallerActividad.addActividad(info);
        setReload(!reload)
    }

    const [info, setInfo] = useState({
        nombre: '',
        costo: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    };

    const cancelarAgregar = () =>{
        navigate('/actividad')
    }

    return (
        <div className='agregar-container'>
            <div className='container-inputs'>
                <input
                    type="text"
                    name="nombre"
                    value={info.nombre}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="costo"
                    value={info.costo}
                    onChange={handleInputChange}
                />
                
            </div>
            <button className='boton-agregar' onClick={() => postActividad(info)}>AGREGAR ACTIVIDAD</button>
            <button className='boton-agregar' onClick={cancelarAgregar}>CANCELAR</button>

        </div>
    );
}


export default AgregarActividad;
