import React from 'react';
import { Link } from 'react-router-dom';
import "./Card-style.css";
import axios from 'axios';

function Estudiante(props) {
    const { nombre, ci, fecha_nacimiento, apellido } = props;

    const eliminarJuego = () => {
        axios.delete(`http://localhost:3000/api/student/${gameId}`)
            .then((response) => {
                // Llamar a la función onDelete que viene como prop para actualizar la lista en el componente padre
                onDelete(gameId);
            })
            .catch((error) => {
                console.error('Hubo un error al eliminar el juego:', error);
            });
    };


    return (
        <div className='estudiante-box'>
            {nombre && apellido && <h2>{nombre+" "+ apellido}</h2>}
            {fecha_nacimiento && <p>{fecha_nacimiento}</p>}
            <div className='card-options'>
                <Link to={`/detalles/${ci}`}>
                    <button className='boton-card'>Detalles</button>
                </Link>
                <button className='boton-card' onClick={eliminarJuego}>Eliminar</button>
            </div>
        </div>
    );
}

export default Estudiante;
