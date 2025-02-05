import "./perfil.style.css"
import SideBar from "../../sidebar/sidebar"
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../../context/authContext.jsx";
import useGetUserData from "../../../services/userHooks/useGetUserData.js";

const toFormattedCpf = (cpf) => {
  
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function Perfil() {

    const {isAuthenticated, decodeToken, protectedRoute} = useContext(AuthContext);
    const [token_decodificado] = useState(decodeToken())
    const [userData, setUserData] = useState({
        nome : "Carregando...",
        cpf : "Carregando...",
        contato : "Carregando...",
        endereco : "Carregando...",
        coren: "Carregando...",
        area : "Carregando...",
        instituicao : "Carregando...",
        data_cadastro : "Carregando..."
    })

    useEffect(() => {
        protectedRoute()
    }, [isAuthenticated])

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await useGetUserData(token_decodificado)
            setUserData({
                nome : data.username,
                cpf : data.cpf,
                contato : data.contact,
                endereco : data.adress,
                coren: data.coren,
                area : data.area,
                instituicao : data.institution,
                data_cadastro : data.createdAt
            })
        }

        fetchUserData()

    }, [])

    console.log("Dados certo: ", userData)
    
    return (
        <>
            <SideBar/>
            <div id="perfil-container">
                <div id="dados-container">
                    <figure id="figure">
                    <img 
                        style={{width:"100%", height:"180px", borderRadius: "8px"}}
                        src="data:image/jpeg;base64,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" alt="Imagem de perfil"/>
                    </figure>

                    <div id="dados-pessoais-user-container">
                        <h3>Informações pessoais</h3>
                        <div>
                            <div id="d1">
                                <span>Nome</span>
                                <div>{userData.nome ? userData.nome : "Sem registro"}</div>
                                <span>Cadastrado em</span>
                                <div>{userData.data_cadastro ? userData.data_cadastro : "Sem registro"}</div>
                                <span>Contato</span>
                                <div>{userData.contato ? userData.contato : "Sem registro"}</div>
                                <span>Nascimento</span>
                                <div>11-12-2002</div>
                            </div>
                            <div id="d2">
                                <span>CPF/RG</span>
                                <div>{userData.cpf ? toFormattedCpf(userData.cpf) : "Sem registro"}</div>
                                <span>Endereço</span>
                                <div>{userData.endereco ? userData.endereco : "Sem registro"}</div>
                            </div>
                        </div> 
                    </div>
                    <div id="informacao-profissional-user-container">
                        <h3>Informações profissionais</h3>
                        <div id="d1-p">
                            <div>
                                <span>COREN</span>
                                <div>{userData.coren ? userData.coren : "Sem registro"}</div>
                            </div>
                            <div>
                                <span>Formação</span>
                                <div>{userData.area ? userData.area : "Sem registro"}</div>
                            </div>
                            <div>
                                <span>Instituição</span>
                                <div>{userData.instituicao ? userData.instituicao : "Sem registro"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>      
        </>
    )
}

export default Perfil;