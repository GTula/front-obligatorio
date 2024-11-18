import { useContext, useState, useEffect } from "react";
import './ReportesStyles.css';
import BackendCallerReportes from "../../backend-caller/Reportes";
import { reloadContext } from "../commonContexts/ReloadPageProvider";
import { Link } from "react-router-dom";

function ActividadesAlumnos(){
    const [actividades, setActividades] = useState([]);
    const [reload, setReload] = useContext(reloadContext);
    const [loading, setLoading] = useState(false);

    async function fetchActividades() {
        setLoading(true);
        try {
            const response = await BackendCallerReportes.getActividadesConMasAlumnos();
            if (response) {
                setActividades(response);
            }
        } catch (err) {
            alert('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchActividades();
    }, [reload]);

    return (
        <div className="page-container">
            <Link to="/">
                <button className="boton-arriba-izquierda">🏠 Ir a Home</button>
            </Link>
            <h1 className="titulo">Lista de actividades con más alumnos</h1>
            <div className="actividades-container">
                {actividades && actividades.map((actividad, index) => (
                    <div className="actividad-card" key={index}>
                        <p className="actividad-index">{index + 1}.</p>
                        <div className="actividad-info">
                            <p className="actividad-nombre">{actividad.actividad}</p>
                            <p className="actividad-ingresos">Cantidad alumnos: {actividad.alumnos_totales}</p>
                        </div>
                    </div>
                ))}
            </div>
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

export default ActividadesAlumnos;