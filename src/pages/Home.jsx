import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
                <button onClick={HandlerInstructor}>Modificar instructor</button>
                <button onClick={HandlerShift}>Modificar Turno</button>
                <button onClick={HandlerStudent}>Modificar Alumno</button>
                <button onClick={HandlerClass}>Clases</button>

            </div>
        </div>
    )
}

export default Home;