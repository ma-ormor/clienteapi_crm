import React, {useEffect, useState, Fragment} from 'react'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'

import axios from '../../config/axios'

import BuscarProducto from './BuscarProducto'
import CantidadProducto from './CantidadProducto'

function NuevoPedido(props){
  const {id} = props.match.params
  const [cliente, guardarCliente] = useState({})
  const [busqueda, guardarBusqueda] = useState('')
  const [productos, guardar] = useState([])
  const [total, guardarTotal] = useState(0)

  useEffect(()=>{
    const consultar = async ()=>{
      const resultado = axios.get(`/clientes/${id}`)

      guardarCliente(resultado.data)}
    consultar()
    cambiarTotal()
  }, [productos])

  const buscar = async e=>{
    e.preventDefault()

    const resultado = await axios.post(`/productos/busqueda/${busqueda}`)

    if(!resultado.data[0])
      return Swal.fire({
        type: 'error',
        title: 'Error',
        text: 'Sin resultados'
      })
    
    let producto = resultado.data[0]

    producto.producto = producto._id
    producto.cantidad = 0

    /* let producto = {
      producto: resultado.data[0]._id,
      cantidad: 0
    } */

    guardar(...productos, producto)
  }//function

  const leerBusqueda = e=>{
    guardarBusqueda(e.target.value) }
  
  const quitarProducto = index=>{
    const copia = [...productos]

    if(copia[index].cantidad === 0) 
      return
    copia[index].cantidad --

    guardar(copia) 
  }//function
  
  const sumarProducto = index=>{
    const copia = [...productos]

    copia[index].cantidad ++
    guardar(copia) 
  }//function
  
  const cambiarTotal = ()=>{
    let nuevo = 0

    if(productos.length === 0){
      guardarTotal(0); return }
    
    productos.forEach(producto => 
      nuevo += producto.precio * producto.cantidad)
    guardarTotal(nuevo)
  }//function
  
  const eliminarProducto = id=>{
    const todos = productos.filter(
      producto => producto.producto !== id)
    guardar(todos)
  }//function

  const hacerPedido = async e=>{
    e.preventDefault()

    const {id} = props.match.params

    const pedido = {
      cliente: id,
      productos,
      total }

    const resultado = await axios.post(`/pedidos`, pedido)

    if(resultado.status !== 200)
      return Swal.fire({
        type: 'error', title: 'Error', text: 'Intentalo de nuevo' })

    Swal.fire({
      type: 'success',
      title: 'Correcto',
      text: resultado.data.mensaje })
    props.history.push('/pedidos')
  }//function

  return (
    <Fragment>
    <h2>Nuevo Pedido</h2>

    <div className="ficha-cliente">
      <h3>Datos de Cliente</h3>
      <p>{cliente.nombre} {cliente.apellido}</p>
      <p>{cliente.telefono}</p>
    </div>

    <BuscarProducto
      buscar={buscar} 
      leerBusqueda={leerBusqueda} />

    <ul className="resumen">
      {productos.map((producto, index)=>( 

        <CantidadProducto 
          key={producto.producto} 
          producto={producto} 
          sumarProducto={sumarProducto} 
          quitarProducto={quitarProducto} 
          eliminarProducto={eliminarProducto} 
          index={index} /> 
      ))}
    </ul>

    <p className='total'>Total <span>$ {total}</span></p>
    
    {total > 0 ? (
      <form onSubmit={hacerPedido}>
        <input 
          type="submit"
          className="btn btn-verde btn-block"
          value="Crear"/>
      </form>
    ) : null}

    </Fragment> )
}//function

export default withRouter(NuevoPedido)