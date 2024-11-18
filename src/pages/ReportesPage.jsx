import { useContext, useState } from "react";
import { authenticatedContext } from "../App";
import { useNavigate } from "react-router-dom";
import './pagesStyles.css';

function Reportes(){

    const navigate = useNavigate();

    const HandlerMasAlumnos = () =>{
        navigate('/actividades-mas-alumnos')
    }
    const HandlerMasIngresos = () =>{
        navigate('/actividades-mas-ingresos')
    }
    const HandlerTurnosDictados = () =>{
        navigate('/turnos-mas-dictados')
    }
    return (
        <div>
            <h1>Menu</h1>
            <div className="opciones-menu">
            <button onClick={HandlerMasAlumnos}>Actividades con mas alumnos</button>
            <button onClick={HandlerMasIngresos}>Actividades con mas ingresos</button>
            <button onClick={HandlerTurnosDictados}>Turnos más dictados</button>
            </div>
        </div>
        
    );


}

export default Reportes;