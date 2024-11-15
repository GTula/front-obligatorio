import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './home.css';

function Home(){
    const navigate = useNavigate();
    const HandlerInstructor = () =>{
        navigate('/instructor')
    }
    const HandlerShift = () =>{
        navigate('/turno')
    }
    const HandlerStudent = () =>{
        navigate('/estudiante')
    }
    const HandlerClass = () =>{
        navigate('/clase')
    }
    return(
        <div>
            <h1>Menu</h1>
            <h3>Deportes de nieve</h3>
            <div className="opciones-menu">
                <button className="boton-opciones-menu" onClick={HandlerInstructor}>Modificar instructor</button>
                <button className="boton-opciones-menu" onClick={HandlerShift}>Modificar Turno</button>
                <button className="boton-opciones-menu" onClick={HandlerStudent}>Modificar Alumno</button>
                <button className="boton-opciones-menu" onClick={HandlerClass}>Clases</button>

            </div>
        </div>
    )
}

export default Home;