import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import Login from './components/pages/login/login.jsx'
import Enfermeiro_area_logada from './components/pages/area_logada_enf/enfermeiro_area_logada.jsx'


const router = createBrowserRouter([
  {
    path : "/",
    element : <Login/>
  },
  {
    path : "/enfermeiro_area_logada",
    element : <Enfermeiro_area_logada/>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    {/* <App /> */}
  </StrictMode>,
)
