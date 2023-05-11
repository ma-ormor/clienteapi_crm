import React, {Fragment, useContext} from 'react'
// Rutas
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// Layout
import Header from './componentes/layout/Header'
import Navegacion from './componentes/layout/Navegacion'
// Componentes
import Clientes from './componentes/clientes/Clientes'
import NuevoCliente from './componentes/clientes/NuevoCliente'
import EditarCliente from './componentes/clientes/EditarCliente'

import Productos from './componentes/productos/Productos'
import NuevoProducto from './componentes/productos/NuevoProducto'
import EditarProducto from './componentes/productos/EditarProducto'

import Pedidos from './componentes/pedidos/Pedidos'
import NuevoPedido from './componentes/pedidos/NuevoPedido'

import Login from './componentes/auth/Login'

import {Context, Provider} from './context/config'

function App(){
  const [auth, guardar] = useContext(Context)

  return(
    <Router>
      <Fragment> <Provider value={[auth, guardar]}>
        <Header />

        <div className="grid contenedor contenido-principal">
          <Navegacion />

          <main className="caja-contenido col-9">

            <Switch>
              <Route exact path="/" component={Clientes} />
              <Route exact path="/clientes/nuevo" component={NuevoCliente} />
              <Route exact path="/clientes/editar/:id" component={EditarCliente} />

              <Route exact path="/productos" component={Productos} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route exact path="/productos/editar/:id" component={EditarProducto} />

              <Route exact path="/pedidos" component={Pedidos} />
              <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />

              <Route exact path="/iniciar-sesion" component={Login} />
            </Switch>

          </main>
        </div>
      </Provider> </Fragment>
    </Router>
  )
}

export default App;
