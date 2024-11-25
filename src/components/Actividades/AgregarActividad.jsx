import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import BackendCallerActividad from '../../backend-caller/Actividades';
import '../commonStyles/agregarPersona.css'
import { reloadContext } from '../commonContexts/ReloadPageProvider';

function AgregarActividad() {

    const navigate = useNavigate();
    const [reload, setReload] = useContext(reloadContext);
    const [loading, setLoading] = useState(false);


    async function postActividad(info) {
        navigate('/actividad')
        setLoading(true);
        try{
            await BackendCallerActividad.addActividad(info);
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
                    placeholder='Nombre de la actividad'
                />
                <input
                    type="number"
                    name="costo"
                    value={info.costo}
                    onChange={handleInputChange}
                    placeholder='Costo de la actividad'
                />
                
            </div>
            <button className='boton-agregar' onClick={() => postActividad(info)}>AGREGAR ACTIVIDAD</button>
            <button className='boton-agregar' onClick={cancelarAgregar}>CANCELAR</button>
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


export default AgregarActividad;
