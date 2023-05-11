import React, {useState, useContext} from 'react'
import {withRouter} from 'react-router-dom'  

import axios from '../../config/axios'
import Context from '../../context/Context'
//import Context from '../../context/config'

function Login({history}){
  const 
  [auth, guardarAuth] = useContext(Context),
  [credenciales, guardar] = useState({
    email: '',
    password: '' })

  const leerDatos = e=>{
    guardar({
      ...credenciales, [e.target.name]: e.target.value })
  }//function

  const iniciarSesion = async e=>{
    e.preventDefault()

    try{
      const respuesta = 
        await axios.post('/iniciar-sesion', credenciales)

      const {token} = respuesta.data
      localStorage.setItem('token', token)

      guardarAuth({token, auth: true})

      Swal.fire( 'Iniciaste Sesión', 'Tudo bene', 'success' )
      history.push('/') }
      
    catch(error){
      if(error.response)
        Swal.fire({
          type: 'error',
          title: 'Error', 
          text: error.response.data.mensaje })
      else Swal.fire({
        type: 'error',
        title: 'Error', 
        text:'Hay un error' }) }
  }//function

  return (
    <div>
      <h2>Login</h2>

      <div className="contenedor-formulario">
        <form onSubmit={iniciarSesion}>
          <div className="campo">
            <label>Email</label>
            <input 
              type="text" 
              name="email" 
              placeholder="Email"
              required
              onChange={leerDatos} />
          </div>
          
          <div className="campo">
            <label>Contraseña</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Contraseña"
              required
              onChange={leerDatos} />
          </div>

          <input 
            type="submit" 
            value="Entrar"
            className="btn btn-verde btn-block" />
        </form>
      </div>

    </div> )
}//function

export default withRouter(Login)