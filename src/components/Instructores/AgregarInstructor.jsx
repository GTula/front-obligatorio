import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import BackendCallerInstructor from '../../backend-caller/Instructores';
import '../commonStyles/agregarPersona.css'
import { reloadContext } from '../commonContexts/ReloadPageProvider';

function AgregarInstructor() {
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useContext(reloadContext)

    const navigate = useNavigate();


    async function postInstructor(info) {
        setLoading(true);
        try{
            navigate('/instructor')
            await BackendCallerInstructor.addInstructor(info);
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

export default AgregarInstructor;
