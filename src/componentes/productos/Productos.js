import React, {useEffect, useState, Fragment} from 'react'
import {Link} from 'react-router-dom'

import axios from '../../config/axios'

import Producto from './Producto'
import Spinner from '../layout/Spinner'

function Productos(){
  const [productos, guardar] = useState([])

  useEffect(()=>{
    const consultar = async ()=>{
      const productos = await axios.get('/productos')

      guardar(productos.data) }
    consultar() }, [productos])

  if(!productos.length) return (<Spinner />)

  return(
    <Fragment>
      <h2>Productos</h2>

      <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> 
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map(producto=>(
          <Producto 
            key={producto._id}
            producto={producto} /> ))}        
      </ul>
    </Fragment> )
}//function

export default Productos
