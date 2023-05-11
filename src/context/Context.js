import React, {useState} from 'react'

const Context = React.createContext([{}, ()=>{}])

const Provider = props=>{
  const [auth, guardar] = useState({
    token: '',
    auth: false })

  return (
    <Context.Provider
      value={[auth, guardar]}> {props.children} </Context.Provider> )
}//function

export {Context, Provider}