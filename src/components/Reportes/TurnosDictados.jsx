import { useContext, useState, useEffect } from "react";
import './ReportesStyles.css';
import BackendCallerReportes from "../../backend-caller/Reportes";
import { reloadContext } from "../commonContexts/ReloadPageProvider";
import { Link } from "react-router-dom";

function TurnosDictados(){
    const [turnos, setTurnos] = useState([]);
    const [reload, setReload] = useContext(reloadContext);
    const [loading, setLoading] = useState(false);

    async function fetchTurnos() {
        setLoading(true);
        try {
            const response = await BackendCallerReportes.getTurnosMasDictados();
            if (response) {
                setTurnos(response);
            }
        } catch (err) {
            alert('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTurnos();
    }, [reload]);

    return (
        <div className="page-container">
            <Link to="/">
                <button className="boton-arriba-izquierda">🏠 Ir a Home</button>
            </Link>
            <h1 className="titulo">Lista de turnos con más clases dictadas</h1>
            <div className="actividades-container">
                {turnos && turnos.map((turno, index) => (
                    <div className="actividad-card" key={index}>
                        <p className="actividad-index">{index + 1}.</p>
                        <div className="actividad-info">
                        <p className="actividad-nombre">TURNO: </p>
                            <p className="actividad-nombre">Hora de inicio: {turno.inicio.substring(0, 5)}</p>
                            <p className="actividad-nombre">Hora de fin: {turno.fin.substring(0, 5)}</p>
                            <p className="actividad-ingresos">Cantidad de clases: {turno.clases_totales}</p>
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

export default TurnosDictados;