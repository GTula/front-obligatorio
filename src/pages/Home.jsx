import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './home.css';

function Home(){
    const navigate = useNavigate();
    const HandlerInstructor = () =>{
        navigate('/instructor')
    }
    const HandlerTurno = () =>{
        navigate('/turno')
    }
    const HandlerStudent = () =>{
        navigate('/estudiante')
    }
    const HandlerClass = () =>{
        navigate('/clase')
    }
    const HandlerActividad = () =>{
        navigate('/actividad')
    }
    const HandlerReportes = () =>{
        navigate('/reportes')
    }
    return(
        <div>
            <h1>Menu</h1>
            <h3>Deportes de nieve</h3>
            <div className="opciones-menu">
                <button onClick={HandlerInstructor}>Modificar instructor</button>
                <button onClick={HandlerTurno}>Modificar Turno</button>
                <button onClick={HandlerStudent}>Modificar Alumno</button>
                <button onClick={HandlerClass}>Clases</button>
                <button onClick={HandlerActividad}>Actividades</button>
                <button onClick={HandlerReportes}>Reportes</button>

            </div>
        </div>
    )
}

export default Home;