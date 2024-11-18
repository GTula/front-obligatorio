import { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackendCallerTurno from '../../backend-caller/Turnos';
import '../commonStyles/agregarPersona.css'
import { reloadContext } from '../commonContexts/ReloadPageProvider';

function AgregarTurno() {

    const navigate = useNavigate();
    const [reload, setReload] = useContext(reloadContext);
    const [loading, setLoading] = useState(false);


    async function postTurno(info) {
        setLoading(true);
        try{
            navigate('/turno')
            await BackendCallerTurno.addTurno(info);
            setReload(!reload)
        }
        catch (err) {
            alert('Error al conectar con el servidor');
        }
        finally {
            setLoading(false); 
        }
    }

    const [info, setInfo] = useState({
        hora_inicio: '',
        hora_final: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    };

    const cancelarAgregar = () =>{
        navigate('/turno')
    }

    return (
        <div className='agregar-container'>
            <div className='container-inputs'>
                <input
                    type="time"
                    name="hora_inicio"
                    value={info.hora_inicio}
                    onChange={handleInputChange}
                />
                <input
                    type="time"
                    name="hora_final"
                    value={info.hora_final}
                    onChange={handleInputChange}
                />
                
            </div>
            <button className='boton-agregar' onClick={() => postTurno(info)}>AGREGAR TURNO</button>
            <button className='boton-agregar' onClick={cancelarAgregar}>CANCELAR</button>

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


export default AgregarTurno;
