import React, {useState, useEffect, Fragment} from 'react'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'

import axios from '../../config/axios'

import Spinner from '../layout/Spinner'

function EditarProducto(props){
  const {id} = props.match.params

  const [producto, guardar] = useState({
    nombre: '',
    precio: '',
    imagen: '' })
  const [archivo, guardarArchivo] = useState('')
    
  const

  consultar = async ()=>{
    const producto = await axios.get(`/productos/${id}`)
    guardar(producto.data)
  },//function

  leerProducto = e=>{
    guardarProducto({
      ...producto, [e.target.name]: e.target.value })
  },//function

  leerArchivo = e=>{
    guardarArchivo(e.target.files[0])
  },//function
  
  editar = async e=>{
      e.preventDefault()

      const datos = new FormData()

      datos.append('nombre', producto.nombre)
      datos.append('precio', producto.precio)
      datos.append('imagen', archivo)

      try{
        const res = await axios.put(`/productos/${id}`, datos, {
          headers: {
            'Content-Type': 'multipart/form-data' } })

        if(res.status === 200)
          Swal.fire('Actualizado', res.data.mensaje, 'success')
        
        props.histoy.push('/productos') }

      catch(error){
        console.log(error)
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: 'Intentalo de nuevo' }) }
  }//function

  // Cuando el componente carga
  useEffect(()=>consultar(), [])

  const {nombre, precio, imagen} = producto

  if(!nombre) return (<Spinner />)
    
  return(
    <Fragment>
      <h2>Editar Producto</h2>

      <form onSubmit={editar}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input 
            type="text" 
            placeholder="Nombre Producto" 
            name="nombre"
            defaultValue={nombre}
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
            defaultValue={precio}
            onChange={leerProducto} />
        </div>
      
        <div className="campo">
          <label>Imagen:</label>
          
          {imagen ? <img 
            src={`${process.env.REACT_BACKEND_URL}/${imagen}`}
            width="300" /> : null}

          <input 
            type="file"  
            name="imagen" 
            onChange={leerArchivo} />
        </div>

        <div className="enviar">
          <input 
            type="submit" 
            className="btn btn-azul" 
            value="Guardar" />
        </div>
      </form>
    </Fragment> )
}//function

export default withRouter(EditarProducto)
