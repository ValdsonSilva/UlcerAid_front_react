import { useEffect, useState, useContext } from "react"
import "./sidebar.style.css"
import {FaUser, FaGlobe, FaChartBar, FaSignInAlt} from "react-icons/fa"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/authContext.jsx"


function SideBar() {
    
    const {logout} = useContext(AuthContext)
    const [predicaoState, setPredicaoState] = useState(false)
    const [dashboardState, setDashboardState] = useState(false)
    const [perfilState, setPerfilState] = useState(false)


    useEffect(() => {

        if (location.href.includes("predicao")) {
                setPredicaoState(!predicaoState)
    
        } else if (location.href.includes("dashboard")) {
                setDashboardState(!dashboardState)
    
        } else if (location.href.includes("perfil")) {
    
                setPerfilState(!perfilState)
        }

        console.log("executou")
    
    }, [])
    
    return (
        <>
            <div id="container">  
                <div id="navbar">
                    <h1>Área do profissional de Enfermagem</h1>
                </div>
                <div id="sidebar">
                    <ul id="lista-links">
                        <li>
                            <Link to={"/"} style={{color: "#000"}} onClick={logout}>Sair</Link>
                            <FaSignInAlt size={25}/> 
                        </li>
                        <li>
                            <Link to={"/predicao"} style={{color: predicaoState ? "var(--main-bg)" : "#000"}}>Predição</Link>   
                            <FaGlobe size={25} style={{color: predicaoState ? "var(--main-bg)" : "#000"}}/> 
                        </li>
                        <li>
                            <Link to={"/dashboard"} style={{color: dashboardState ? "var(--main-bg)" : "#000"}}>Dashboard</Link>
                            <FaChartBar size={25} style={{color: dashboardState ? "var(--main-bg)" : "#000"}}/> 
                        </li>
                        <li>
                            <Link to={"/perfil"} style={{color: perfilState ? "var(--main-bg)" : "#000"}}>Perfil</Link>
                            <FaUser size={25} style={{color: perfilState ? "var(--main-bg)" : "#000"}}/> 
                        </li>
                    </ul>
                    <h1 id="logo-nome">UlcerAid</h1>
                </div>
            </div>
        </>
    )
}

export default SideBar;