import { useEffect, useState } from "react";
import SideBar from "../../sidebar/sidebar";
import "./predicao.style.css"
import { useAsyncError } from "react-router-dom";


function Predicao() {

    return (
        <>
            <SideBar/>
            <h1 style={{textAlign: "center"}}>Predição</h1>
        </>
    )
}

export default Predicao;