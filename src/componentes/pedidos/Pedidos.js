import React, {useState, useEffect, Fragment} from 'react'

import axios from '../../config/axios'

import DetallePedido from './DetallePedido'

function Pedidos(){
  const [pedidos, guardar] = useState([])

  useEffect(()=>{
    const consultar = async ()=>{
      const resultado = axios.get('/pedidos')

      guardar(resultado.data) }
    consultar()
  }, [])

  return(
    <Fragment>
      <h2>Pedidos</h2>

      <ul className="listado-pedidos">
        {pedidos.map(pedido=>{(
          <DetallePedido
            key={pedido._id} 
            pedido={pedido} /> )} ) }
      </ul>
    </Fragment> )
}

export default Pedidos
