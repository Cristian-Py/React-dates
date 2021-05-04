import React, { Fragment, useState, useEffect } from "react";
import Formulario from './components/Formulario'
import Citas from './components/Citas'
function App() {

  //citas local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [] ;
  }
  //arreglo de citas
  const [citas, guardarcitas] = useState(citasIniciales)

  //hacer ciertas operaciones cuando el state cambia
  useEffect( () => {
      if(citasIniciales){
        localStorage.setItem('citas', JSON.stringify(citas))
      }else{
        localStorage.setItem('citas', JSON.stringify([]))
      }
  }, [citas] );
  
  const crearCitas = cita =>{
    guardarcitas([
      ...citas, 
      cita
    ])
  }

  //eliminar Citas
  const eliminarCita = id =>{
      const nuevaCita = citas.filter(cita => cita.id !== id);
      guardarcitas(nuevaCita);
  }

  const titulo = citas.length === 0 ? 'No hay citas ' : 'administra tus citas'

  return (
    <Fragment>
      <h1>Administración de Pacientes</h1>
        <div className="container">
          <div className="row">
            <div className="one-half column">
              <Formulario 
                crearCitas={crearCitas}
              />
            </div>
            <div className="one-half column"> 
              <h2>{titulo}</h2>
              {citas.map(cita =>(
                <Citas 
                  key={cita.ida}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}
            </div>
          </div>
        </div>
    </Fragment>

  );
}

export default App;
