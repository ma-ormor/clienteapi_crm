import React from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

import axios from '../../config/axios'

function Cliente({cliente}){
  const {_id: id, nombre, apellido, empresa, email, telefono}
    = cliente
  const eliminarCliente = id=>{
    const alerta = {
      title: '¿Quieres Eliminarlo?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancelar' }

    Swal.fire(alerta).then((result) => {
      if (result.isConfirmed) 
        axios
          .delete(`/clientes/${id}`)
          .then(respuesta=>console.log(respuesta))
    })
  }//function

  return(
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">{nombre} {apellido}</p>
        <p className="empresa">{empresa}</p>
        <p>{email}</p>
        <p>Tel: {telefono}</p>
      </div>

      <div className="acciones">
        <Link 
          to={`/clientes/editar/${id}`} 
          className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Cliente </Link>

        <Link 
          to={`/pedidos/nuevo/${id}`} 
          className="btn btn-azul">
            <i className="fas fa-plus"></i>
            Nuevo Pedido </Link>

        <button 
          type="button" 
          className="btn btn-rojo btn-eliminar"
          onClick={()=>eliminarCliente(id)}>
            <i className="fas fa-times"></i>
            Eliminar Cliente
        </button>
      </div>
    </li> )
}//function

export default Cliente