import { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./login_form.style.css"

function Login_form() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nome : "",
        senha : "",
    })
    const [submitState, setSubmitState] = useState(false)

    function handleNavigate() {
        navigate("/predicao")
    }

    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData({...formData, [id]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Dados: ", formData)
        setSubmitState(!submitState)
        handleNavigate()
    }


    return (
        <div id="lado-formulario">
            <div>{submitState ? JSON.stringify(formData) : ""}</div>
            <h1>UlcerAid</h1>
            <form action="" id="formulario" onSubmit={handleSubmit}>
                <h1>Olá, Enfermeiro(a) :)</h1>
                <input 
                    type="text" 
                    placeholder="nome" 
                    id="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                />

                <input 
                    type="password" 
                    placeholder="senha" 
                    id="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                />
                <button type="submit" id="botao-form">Vamos lá</button>
                <a href="#">Esqueci minha senha</a>
            </form>
        </div>
    )
}

export default Login_form;