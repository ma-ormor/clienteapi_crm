import React, {useContext} from 'react'
import {Link} from 'react-router-dom'

import {Context} from '../../context/Context'

function Navegacion(){
  const [sesion, guardar] = useContext(Context)

  if(!sesion.auth) return null

  return(
    <aside className="sidebar col-3">
    <h2>Administración</h2>

    <nav className="navegacion">
        <Link to={"/"} className="clientes">Clientes</Link>
        <Link to={"/productos"} className="productos">Productos</Link>
        <Link to={"/pedidos"} className="pedidos">Clientes</Link>
    </nav>
    </aside> )
}//function

export default Navegacion