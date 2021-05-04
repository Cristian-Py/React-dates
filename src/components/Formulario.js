import React, { Fragment, useState } from "react";
import {v4 as uuidv4} from 'uuid';


const Formulario = ({crearCitas}) => {
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  });

const [error, actualizarError] = useState(false)

  // funcion que ejecuta cuando el usuario escribe en los inputs
  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value
    })
  };
  //extraer los datos 
  const {mascota, propietario, fecha, hora, sintomas} = cita;

  //cuando usuario presiona agregar cita
  const submitCita = e =>{
    e.preventDefault();

    //validar
    if(mascota.trim()=== '' || propietario.trim === '' || fecha.trim() === '' || hora.trim() === '' 
      || sintomas.trim()=== ''){
        actualizarError(true)
        return;
      }


    //Eliminar mesaje de error
    actualizarError(false)
    
    //asigar un ID
    cita.id = uuidv4();
    console.log(cita)

    //crearCita
    crearCitas(cita)

    //Reinicio de form
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: ""
    })
  }
  return (
    <Fragment>
      <h2>Desde formulario</h2>
      {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
      <form
        onSubmit ={submitCita}
      > 
        <label>Nombre de la mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre de la mascota"
          onChange={actualizarState}
          value={mascota}
        />
        <label>Nombre del dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre del dueño de la mascota"
          onChange={actualizarState}
          value={propietario}
        />
        <label>Fecha</label>
        <input 
          type="date" 
          name="fecha" 
          className="u-full-width" 
          onChange={actualizarState}
          value={fecha}
          />
        <label>Hora</label>  
        <input 
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label>Sintomas</label>
        <textarea 
          className="u-full-width" 
          name="sintomas"
          onChange={actualizarState} 
          value={sintomas}
        />
        <button 
          type="submit"
          className="u-full-width button-primary"
        >
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;
