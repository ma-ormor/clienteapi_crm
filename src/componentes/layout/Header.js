import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'

import {Context} from '../../context/Context'

function Header({history}){
  const [sesion, guardar] = useContext(Context)

  const cerrarSesion = ()=>{
    guardar({token: '', auth: false})
    localStorage.setItem('token', '')
    history.push('/iniciar-sesion')
  }//function

  return(
    <header className="barra">
      <div className="contenedor">
        <div className="contenido-barra">
          <h1>CRM - Administrador de Clientes</h1>
          
          {sesion.auth ? (
            <button
              type="button"
              className="btn btn-rojo"
              onClick={cerrarSesion} >

              <i className="far far-times-circle"></i>Salir
            </button> ) : null}
          
        </div>
      </div>
    </header> )
}//function

export default withRouter(Header)