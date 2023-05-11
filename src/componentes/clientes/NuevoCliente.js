import React, {Fragment, useState, useContext} from 'react'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'

import Context from '../../context/Context'
import axios from '../../config/axios'

function NuevoCliente({history}){
  const [sesion, guardarSesion] = useContext(Context)

  const [cliente, guardar] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: '' })

  const 

    actualizar = e=>{
      guardar({
        ...cliente, [e.target.name]: e.target.value }) },

    validarCliente = ()=>{
      const {nombre, apellido, empresa, email, telefono}
        = cliente

      return 
        nombre.length ||
        apellido.length ||
        empresa.length ||
        email.length ||
        telefono.length },
    
    crearCliente = e=>{
      e.preventDefault()
      axios.post('/clientes', cliente).then(res=>{
       
        if(res.data.code === 11000)
          Swal.fire({
            type: 'error',
            title: 'Error', 
            text: 'El cliente existe' })
        else Swal.fire(
          'Creaste un Cliente', res.data.mensaje, 'success')
          
        history.push('/')
       }) }

  if(!sesion.auth) return history.push('/iniciar-sesion')

  return(
    <Fragment>
      <h2>Nuevo Cliente</h2>

      <form onSubmit={crearCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
            <label>Nombre:</label>
            <input 
              type="text" 
              placeholder="Nombre Cliente" 
              name="nombre"
              onChange={actualizar} />
        </div>

        <div className="campo">
            <label>Apellido:</label>
            <input 
              type="text" 
              placeholder="Apellido Cliente" 
              name="apellido" 
              onChange={actualizar} />
        </div>
            
        <div className="campo">
            <label>Empresa:</label>
            <input 
              type="text"
              placeholder="Empresa Cliente" 
              name="empresa" 
              onChange={actualizar} />
        </div>

        <div className="campo">
            <label>Email:</label>
            <input 
              type="email"
              placeholder="Email Cliente" 
              name="email" 
              onChange={actualizar} />
        </div>

        <div className="campo">
            <label>Teléfono:</label>
            <input 
              type="tel" 
              placeholder="Teléfono Cliente" 
              name="telefono" 
              onChange={actualizar} />
        </div>

        <div className="enviar">
          <input 
            type="submit" 
            className="btn btn-azul" 
            value="Agregar Cliente" 
            disabled={!validarCliente()} />
        </div>
      </form>
    </Fragment> )
}//function

export default withRouter(NuevoCliente)