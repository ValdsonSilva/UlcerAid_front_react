import { useState } from "react";
import {useNavigate} from "react-router-dom"
import api from "../../services/api.js"

function Login_form() {

    const [formData, setFormData] = useState({
        name : "",
        password : ""
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

        if (!formData.name || !formData.password) {
            alert('Por favor, preencha os campos de nome e senha.');
            return;
        }

        try {
            const response = await api.post('/api/v1/login', {
                username: formData.name,
                password: formData.password
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
            setFormData({name: "", password: ""})
            setLoading(false)
        }
    }       


    return (
        <div id="lado-formulario" className="w-1/2 h-auto flex content-center items-center flex-col m-0 p-5">
            <h1 className="font-semibold">UlcerAid</h1>
            <form onSubmit={handleSubmit} id="formulario" className="bg-white flex items-center flex-col w-1/2 h-fit gap-12 mt-0 pb-7">
                <h1 className="font-bold mt-5">Olá, Enfermeiro(a) :)</h1>
                <input 
                    type="text" 
                    placeholder="nome" 
                    value={formData.name}
                    onChange={handleChange}
                    id="nome"
                    className="w-4/5 h-10 p-1 size-3 border-solid border-2 border-[--secondary-bg] rounded-xl cursor-pointer"
                    required
                />

                <input 
                    type="password" 
                    placeholder="senha" 
                    value={formData.password}
                    onChange={handleChange}
                    id="senha"
                    className="w-4/5 h-10 p-1 size-3 border-solid border-2 border-[--secondary-bg] rounded-xl cursor-pointer"
                    required
                />
                <button 
                    type="submit" 
                    id="botao-form"
                    className="w-4/5 h-10 p-1 size-3 border-none shadow-black rounded-xl cursor-pointer bg-[--main-bg] text-white"
                >
                    {loading ? "Carregando..." : "Vamos lá"}
                </button>
                <a href="#">Esqueci minha senha</a>
            </form>
        </div>
    )
}

export default Login_form;