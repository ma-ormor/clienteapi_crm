import React from 'react'
import {Link} from 'react-router-dom'

import axios from '../../config/axios'

function Producto({producto}){
  const {_id: id, nombre, precio, imagen} = producto

  const eliminar = id=>{
    const alerta = {
      title: '¿Eliminar?',
      text: "No se restauran los cambios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar' }

    Swal.fire(alerta).then((result) => {
      if (result.isConfirmed) 
        axios
          .delete(`/productos/${id}`)
          .then(res=>{
            if(res.status === 200) console.log(res) })
    })
  }//function

  return (
    <li className="producto">
      <div className="info-producto">
        <p className="nombre">{nombre}</p>
        <p className="precio">$ {precio}</p>
        {imagen ? (<img src={`${process.env.REACT_BACKEND_URL}/${imagen}`} />) : null}
      </div>
      
      <div className="acciones">
        <Link to={`productos/editar/${id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto 
        </Link>

        <button 
          type="button" 
          className="btn btn-rojo btn-eliminar"
          onClick={()=>eliminar(id)} >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li> )
}//function

export default Producto
