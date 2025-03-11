import { useEffect, useState, useContext } from "react"
// import "./sidebar.style.css"
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
            <div id="container" className="flex justify-center flex-col bg-white">  
                <div id="navbar" className="flex justify-center items-center border-b-2 border-solid border-[--main-bg] bg-white w-full h-[50px]">
                    <h1 className="font-bold text-xl">Área do profissional de Enfermagem</h1>
                </div>
                <div id="sidebar" className="fixed top-0 left-0 h-svh w-52 bg-white boder-r-2 border-solid border-r-cyan-300 flex flex-col justify-between items-center z-10">
                    <ul id="lista-links" className="flex items-start flex-col w-fit m-0 pt-28 pb-0.5 gap-16">

                        <li className=" list-none flex justify-center items-center gap-3 w-full">
                            <Link to={"/"} style={{color: "#000"}} onClick={logout}>Sair</Link>
                            <FaSignInAlt size={25}/> 
                        </li>
                        <li className=" list-none flex justify-center items-center gap-3 w-full">
                            <Link to={"/predicao"} style={{color: predicaoState ? "var(--main-bg)" : "#000"}}>Predição</Link>   
                            <FaGlobe size={25} style={{color: predicaoState ? "var(--main-bg)" : "#000"}}/> 
                        </li>
                        <li className=" list-none flex justify-center items-center gap-3 w-full">
                            <Link to={"/dashboard"} style={{color: dashboardState ? "var(--main-bg)" : "#000"}}>Dashboard</Link>
                            <FaChartBar size={25} style={{color: dashboardState ? "var(--main-bg)" : "#000"}}/> 
                        </li>
                        <li className=" list-none flex justify-center items-center gap-3 w-full">
                            <Link to={"/perfil"} style={{color: perfilState ? "var(--main-bg)" : "#000"}}>Perfil</Link>
                            <FaUser size={25} style={{color: perfilState ? "var(--main-bg)" : "#000"}}/> 
                        </li>

                    </ul>
                    <h1 id="logo-nome" className="text-center m-auto pt-14 font-semibold text-lg">UlcerAid</h1>
                </div>
            </div>
        </>
    )
}

export default SideBar;