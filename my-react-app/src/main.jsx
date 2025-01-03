import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import Login from './components/pages/login/login.jsx'
import Predicao from './components/pages/area_logada_enf/predicao.jsx'
import Dashboard from './components/pages/dashboard/dashboard.jsx'
import Perfil from './components/pages/perfil/perfil.jsx'


const router = createBrowserRouter([
  {
    path : "/",
    element : <Login/>
  },
  {
    path : "/predicao",
    element : <Predicao/>
  },
  {
    path : "/dashboard",
    element : <Dashboard/>
  },
  {
    path : "/perfil",
    element : <Perfil/>
  },
  {
    errorElement : "<Error/>"
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    {/* <App /> */}
  </StrictMode>,
)
