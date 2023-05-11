import React, {useEffect, useState, Fragment} from 'react'
import axios from '../../config/axios'

function BuscarProducto(props){
  return (
    <form onSubmit={props.buscar}>
      <legend>Busca un Producto y agrega una cantidad</legend>

      <div className="campo">
        <label>Productos:</label>

        <input 
          type="text" 
          placeholder="Nombre Productos" 
          name="productos"
          onChange={props.leerBusqueda} />
      </div>

      <input 
        type="submit"
        className="btn btn-azul btn-block"
        value="Buscar" />
    </form> )
}//function

export default BuscarProducto