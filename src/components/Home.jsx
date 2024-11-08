import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
    const HandlerInstructor = () =>{
        navigate('/teacher')
    }
    const HandlerShift = () =>{
        navigate('/shift')
    }
    const HandlerStudent = () =>{
        navigate('/student')
    }
    return(
        <div>
            <button onClick={HandlerInstructor}>Modificar instructor</button>
            <button onClick={HandlerShift}>Modificar Turno</button>
            <button onClick={HandlerStudent}>Modificar Alumno</button>
        </div>
    )
}

export default Home;