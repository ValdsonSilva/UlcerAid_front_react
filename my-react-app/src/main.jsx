import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import Login from './components/pages/login/login.jsx'
import Predicao from './components/pages/area_logada_enf/predicao.jsx'
import Dashboard from './components/pages/dashboard/dashboard.jsx'
import Perfil from './components/pages/perfil/perfil.jsx'
import Error from './components/error/error.jsx'
import { AuthProvider } from './context/authContext.jsx'


const router = createBrowserRouter([
  {
    path : "/",
    element : <Login/>
  },
  {
    path : "/predicao",
    element : <AuthProvider><Predicao/></AuthProvider>
  },
  {
    path : "/dashboard",
    element : <AuthProvider><Dashboard/></AuthProvider>
  },
  {
    path : "/perfil",
    element : <AuthProvider><Perfil/></AuthProvider>
  },
  {
    errorElement : <Error/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    {/* <App /> */}
  </StrictMode>,
)
