import React, {Fragment, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'

import axios from '../../config/axios'

function EditarCliente(props){
  const {id} = props.match.params

  const [cliente, guardar] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: '' })

  const usarApi = async ()=>{
    const consulta = axios.get(`/clientes/${id}`)

    guardar(consulta.data)
  }//function

  useEffect(()=>{
    usarApi()
  }, [])

  const 

    actualizar = e=>{
      guardar({
        ...cliente, [e.target.name]: e.target.value }) },

    actualizarCliente = e=>{
      e.preventDefault()
      axios.put(`/clientes/${cliente.id}`, cliente)
        .then(res=>{

          if(res.data.code === 11000)
            return Swal.fire({
              type: 'error',
              title: 'Error', 
              text: 'El cliente existe' })
          Swal.fire(
            'Editado', res.data.mensaje, 'success')
          props.history.push('/')
        })
     },

    validarCliente = ()=>{
      const {nombre, apellido, empresa, email, telefono}
        = cliente

      return 
        nombre.length ||
        apellido.length ||
        empresa.length ||
        email.length ||
        telefono.length }

  return(
    <Fragment>
      <h2>Editar Cliente</h2>

      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input 
            type="text" 
            placeholder="Nombre Cliente" 
            name="nombre"
            onChange={actualizar}
            value={cliente.nombre} />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input 
            type="text" 
            placeholder="Apellido Cliente" 
            name="apellido" 
            onChange={actualizar} 
            value={cliente.apellido} />
        </div>
          
        <div className="campo">
          <label>Empresa:</label>
          <input 
            type="text"
            placeholder="Empresa Cliente" 
            name="empresa" 
            onChange={actualizar} 
            value={cliente.empresa} />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input 
            type="email"
            placeholder="Email Cliente" 
            name="email" 
            onChange={actualizar} 
            value={cliente.email} />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input 
            type="tel" 
            placeholder="Teléfono Cliente" 
            name="telefono" 
            onChange={actualizar} 
            value={cliente.telefono} />
        </div>

        <div className="enviar">
          <input 
          type="submit" 
          className="btn btn-azul" 
          value="Guardar" 
          disabled={!validarCliente()} />
        </div>
      </form>
    </Fragment> )
}//function

export default withRouter(EditarCliente)