import { useEffect, useState } from "react"
import "./sidebar.style.css"
import {FaUser, FaGlobe, FaChartBar, FaSignInAlt} from "react-icons/fa"
import { Link } from "react-router-dom"


function SideBar() {
    const [predicaoState, setPredicaoState] = useState(false)
    const [dashboardState, setDashboardState] = useState(false)
    const [perfilState, setPerfilState] = useState(false)

    useEffect(() => {

        if (window.location.href === "predicao") {
            setPredicaoState(!predicaoState)

        } else if (window.location.href === "dashboard") {
            setDashboardState(!dashboardState)

        } else if (window.location.href === "perfil") {
            setPerfilState(!perfilState)
        }

    }, [])
    
    return (
        <>
            <div id="container">  
                <div id="navbar">
                    <h1>Area logado enfermeiro</h1>
                </div>
                <div id="sidebar">
                    <ul id="lista-links">
                        <li>
                            <Link to={"/"} style={{color: "#000"}}>Sair</Link>
                            <FaSignInAlt size={25}/> 
                        </li>
                        <li>
                            <Link to={"predicao"} style={{color: predicaoState ? "blue" : "#000"}}>Predição</Link>   
                            <FaGlobe size={25}/> 
                        </li>
                        <li>
                            <Link to={"/dashboard"} style={{color: dashboardState ? "blue" : "#000"}}>Dashboard</Link>
                            <FaChartBar size={25}/> 
                        </li>
                        <li>
                            <Link to={"/perfil"} style={{color: perfilState ? "blue" : "#000"}}>Perfil</Link>
                            <FaUser size={25}/> 
                        </li>
                    </ul>
                    <h1 id="logo-nome">UlcerAid</h1>
                </div>
            </div>
        </>
    )
}

export default SideBar;