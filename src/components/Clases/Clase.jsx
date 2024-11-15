import React from 'react'
import { useState } from 'react';

function Clase(props) {
    const { id, nombreInstructor, instructor, actividad, turno, dictada } = props;
    const [showModal, setShowModal] = useState(false)

    const mostrarDetalles = (id) =>{
        setShowModal(true)
    }

    const cerrarModal = () =>{
        setShowModal(false)
    }
    return (
        <div>
            <div className='box'>
                {id && actividad && <h2>{actividad}</h2>}
                <h2>{"Id: " + id}</h2>
                <div className='card-options'>
                    <button className='boton-card' onClick={() => mostrarDetalles(id)}>Detalles</button>
                    {/* <button className='boton-card' onClick={abrirNewModal}>Modificar</button> */}
                    <button className='boton-card' onClick={() => eliminarEstudiante(ci)}>Eliminar</button>
                </div> 
                
            </div>
            {showModal && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h2>Detalles de la clase</h2>
                        <p><strong>Id:</strong> {id}</p>
                        <p><strong>Actividad:</strong> {actividad}</p>
                        <p><strong>Instructor:</strong> {nombreInstructor + " " + instructor}</p>
                        <p><strong>Turno:</strong> {turno}</p>
                        <p><strong>Dictada:</strong> {dictada}</p>
                        <button onClick={cerrarModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Clase;