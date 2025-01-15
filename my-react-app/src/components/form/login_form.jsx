import { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./login_form.style.css"

function Login_form() {

    const [formData, setFormData] = useState({
        nome : "",
        senha : ""
    })

    const handleChange = (event) => {
        /**
         * "event.target" É o elemento HTML que disparou
         * o evento, como um input.
         * Abaixo há uma desestruturação do objeto "event.target"
         * ou seja, quero apenas o campo "id" e "value" do element.
         */
        const {id, value} = event.target;
        setFormData({...formData, [id]:value})
        /**
         * ...formData é o spread operator, ele traz uma cópia
         * do estado atual do formData, [id] notação de chave 
         * computada. É como se fosse "formData["nome"] = value"
         */
    }

    const navigate = useNavigate()

    function handleNavigate() {
        navigate("/predicao")
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleNavigate()
    }       


    return (
        <div id="lado-formulario">
            <h1>UlcerAid</h1>
            <form onSubmit={handleSubmit} id="formulario">
                <h1>Olá, Enfermeiro(a) :)</h1>
                <input 
                    type="text" 
                    placeholder="nome" 
                    value={formData.nome}
                    onChange={handleChange}
                    id="nome"
                    required
                />

                <input 
                    type="password" 
                    placeholder="senha" 
                    value={formData.senha}
                    onChange={handleChange}
                    id="senha"
                    required
                />
                <button type="submit" id="botao-form">Vamos lá</button>
                <a href="#">Esqueci minha senha</a>
            </form>
        </div>
    )
}

export default Login_form;