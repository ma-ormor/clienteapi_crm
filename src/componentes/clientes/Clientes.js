import React, {useEffect, useState, Fragment, useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'

import cliente from '../../config/axios'
import Context from '../../context/Context'

import Cliente from './Cliente'
import Spinner from '../layout/Spinner'

function Clientes({history}){
  const 
    [clientes, guardar] = useState([]),
    [auth, guardarAutorizacion] = useContext(Context)
    
  /** Consulta los datos */
  useEffect(()=>{
    const consultar = async ()=>{
      try{
        const consulta = await cliente.get('/clientes', {
          headers: { Authorization: `Bearer ${auth.token}` } })
    
        guardar(consulta.data) }
      catch({response}){
        if(response.status = 500)
          history.push('/iniciar-sesion') } }

    if(auth.token === '')
      history.push('/iniciar-sesion')

    consultar()
  }, [clientes])

  if(!auth.auth)
    history.push('/iniciar-sesion')

  if(!clientes.length) return (<Spinner />)

  return(
    <Fragment>
      <h2>Clientes</h2>

      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
        <i className="fas fa-plus-circle"></i>Nuevo Cliente</Link>

      <ul className='listado-clientes'>
        {clientes.map(cliente => 
          <Cliente 
            key={cliente._id}
            cliente={cliente} />)}
      </ul>
    </Fragment> )
}//function

export default withRouter(Clientes)
