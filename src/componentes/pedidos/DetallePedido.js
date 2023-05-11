import React from 'react'

function DetallePedido({pedido}){
  const {cliente, productos} = pedido

  return (
    <li className="pedido">
      <div className="info-pedido">
        <p className="id">ID: 0192019201291201</p>
        <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

        <div className="articulos-pedido">
          <p className="productos">Artículos Pedido: </p>
          <ul>
            {productos.map(producto=>(
              <li key={pedido._id+producto._id}>
                <p>{articulos.producto.nombre}</p>
                <p>Precio: {articulos.producto.precio}</p>
                <p>Cantidad: {articulos.cantidad}</p>
              </li> ))}
          </ul>
        </div>
        <p className="total">Total: ${pedido.total} </p>
      </div>

      <div className="acciones">
        <button type="button" className="btn btn-rojo btn-eliminar">
          <i className="fas fa-times"></i>
          Eliminar Pedido
        </button>
      </div>
    </li> )
}//function

export default DetallePedido