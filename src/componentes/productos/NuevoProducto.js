import React, {Fragment, useState} from 'react'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'

import axios from '../../config/axios'

function NuevoProducto(props){
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: '' })
  const [archivo, guardarArchivo] = useState('')

  const
    leerProducto = e=>{
      guardarProducto({
        ...producto, [e.target.name]: e.target.value })
    },//function

    leerArchivo = e=>{
      guardarArchivo(e.target.files[0])
    },//function

    crear = async e=>{
      e.preventDefault()

      const datos = new FormData()

      datos.append('nombre', producto.nombre)
      datos.append('precio', producto.precio)
      datos.append('imagen', archivo)

      try{
        const res = await axios.post('/productos', datos, {
          headers: {
            'Content-Type': 'multipart/form-data' } })

        if(res.status === 200)
          Swal.fire('Creado', res.data.mensaje, 'success')
        
        props.histoy.push('/productos') }

      catch(error){
        console.log(error)
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: 'Intentalo de nuevo' }) }
    }//function

  return(
    <Fragment>
      <h2>Nuevo Producto</h2>

      <form onSubmit={crear}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input 
            type="text" 
            placeholder="Nombre Producto" 
            name="nombre"
            onChange={leerProducto} />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input 
            type="number" 
            name="precio" 
            min="0.00" 
            step="0.01" 
            placeholder="Precio" 
            onChange={leerProducto} />
        </div>
      
        <div className="campo">
          <label>Imagen:</label>
          <input 
            type="file"  
            name="imagen" 
            onChange={leerArchivo} />
        </div>

        <div className="enviar">
          <input 
            type="submit" 
            className="btn btn-azul" 
            value="Agregar Producto" />
        </div>
      </form>
    </Fragment> )
}//function

export default withRouter(NuevoProducto)