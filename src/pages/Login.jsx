import { useContext } from "react";
import { authenticatedContext } from "../App";
import { Navigate } from "react-router-dom";7
import { useNavigate } from "react-router-dom";

function Login(){
    const [isAuthenticated, setIsAuthenticated] = useContext(authenticatedContext);

    const navigate = useNavigate();

    const HandlerLogin = () =>{
        setIsAuthenticated(true)
        navigate('/')
    }

    return(
        <div>
            <p>Usuario</p>
            <input></input>
            <p>Contraseña</p>
            <input></input><br/>
            <button onClick={HandlerLogin}>Entrar</button>
        </div>
    )
}

export default Login;