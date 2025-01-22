import { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./login_form.style.css"
import api from "../../services/api.js"

function Login_form() {

    const [formData, setFormData] = useState({
        nome : "",
        senha : ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    console.log("Dados:", formData)

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
         * computada. É como se fosse "formData["nome"] = 'Valdson'"
         */
    }

    function handleNavigate() {
        navigate("/predicao")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setLoading(!loading)

        if (!formData.nome || !formData.senha) {
            alert('Por favor, preencha os campos de nome e senha.');
            return;
        }

        try {
            const response = await api.post('/api/v1/login', {
                username: formData.nome,
                password: formData.senha
            })

            if (!response) {
                throw new Error("Erro ao efetuar login" + response.error)
            }

            localStorage.setItem("token", response.data.token)

            handleNavigate()
        } catch (error) {

            if (error.status == 400) {
                console.log("Erro:", error.response.data.details)
                alert(`${error.response.data.message}`)
            }
            if (error.status == 401) {
                console.log("Erro:", error.response.data.details)
                alert(`${error.response.data.message}`)
            }
            if (error.status == 500) {
                console.log("Erro:", error.response.data.details)
                alert(`${error.response.data.message}`)
            }
        } finally {
            setFormData({nome: "", senha: ""})
            setLoading(false)
        }
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
                <button type="submit" id="botao-form">
                    {loading ? "Carregando..." : "Vamos lá"}
                </button>
                <a href="#">Esqueci minha senha</a>
            </form>
        </div>
    )
}

export default Login_form;