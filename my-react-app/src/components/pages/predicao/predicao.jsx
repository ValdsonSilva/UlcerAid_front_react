import { useState, useRef, useContext, useEffect } from "react";
import SideBar from "../../sidebar/sidebar.jsx";
import { FaFilePdf, FaPlus } from "react-icons/fa";
import imprimirRelatorio from "../../../services/imprimirPdf.js";
import upload from "../../../assets/upload.png"
import api from "../../../services/api.js"
import SuccessPopup from "../../popups/success/successPopup.jsx";
import ErrorPopup from "../../popups/error/errorPopup.jsx";
import { AuthContext } from "../../../context/authContext.jsx";
import useGetUserData from "../../../services/userHooks/useGetUserData.js";



function Predicao() {
    const {decodeToken} = useContext(AuthContext)
    const [image, setImage] = useState(null)
    const fileInputRef = useRef(null)
    const [preview, setPreview] = useState('')
    const [prediction, setPrediction] = useState(false)
    const [popup, setPopup] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        name : "Carregando...",
        cpf : "Carregando...",
        contact : "Carregando...",
        adress : "Carregando...",
        coren: "Carregando...",
        area : "Carregando...",
        instituicao : "Carregando...",
        createdAt : "Carregando..."
    })

    const token_decodificado = decodeToken()
    
    useEffect(() => {
        const fetchUserData = async () => {
            const data = await useGetUserData(token_decodificado)
            setUserData({
                name : data.username,
                cpf : data.cpf,
                contact : data.contact,
                adress : data.adress,
                coren: data.coren,
                area : data.area,
                instituicao : data.institution,
                createdAt : data.createdAt
            })
        }

        fetchUserData()

    }, [])

    const fetchPrediction = async (event) => {

        event.preventDefault()

        const formData = new FormData()

        formData.append("image", image)

        setLoading(!loading)

        try {
            const response = await api.post('/api/v1/predict', formData)

            console.log("disparou")

            if (!response) {
                throw new Error(response.status)
            }

            setPrediction(response.data.result)
            setPopup(!popup)
            console.log("predição:", response.data)

        } catch (error) {
            setError(true)
            console.log(error)
    
            if (error.status == 400) {
                console.log("Erro:", error.response.data.error)
                alert(`${error.response.data.error}`)
            }
            if (error.status == 401) {
                console.log("Erro:", error.response.data.error)
                alert(`${error.response.data.error}`)
            }
            if (error.status == 403) {
                console.log("Erro:", error.response.data.error)
                alert(`${error.response.data.error}`)
            }
            if (error.status == 500) {
                console.log("Erro:", error.response.data.error)
                alert(`${error.response.data.error}`)
            }
        }  finally {
            setPreview('')
            setLoading(false)
        }
    }

    console.log("predição:", prediction)


    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            setPreview(URL.createObjectURL(file)) // Cria uma URL temporária para o preview
        }

        setImage(file);
    }

    const resetPrediction = () => {
        setImage(null)
        setPreview('')
        setPrediction(false)
    }

    setTimeout(() => {
        setPopup(false)
        setError(false)
    }, 3000)

    return (
        <>
            <SideBar/>
            <form onSubmit={fetchPrediction} style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",padding: "20px", marginTop: "150px"}}>
                {popup ? <SuccessPopup/> : ""}
                {error ? <ErrorPopup/> : ""}
                
                {!prediction ? (
                    <>
                        {loading ? <p style={{fontWeight: 600}}>Processando imagem...</p> : <p>Envie uma imagem da ferida para análise.</p>}
                        <div 
                            id="input-file" 
                            style={
                                    preview ? {backgroundImage: `url(${preview})`} 
                                            : {backgroundImage: `url(${upload})`}
                            }
                            className={`
                                    flex justify-center 
                                    items-center flex-col 
                                    border-2 border-dashed 
                                    border-gray-500 rounded-xl 
                                    w-96 h-80
                                    bg-no-repeat bg-center
                                    bg-cover
                            `}
                        >

                            <label 
                                htmlFor="file-upload" 
                                id="custom-file-upload"
                                className={`
                                    mt-56 cursor-pointer
                                    p-3 bg-[--secondary-bg]
                                    text-white rounded-md
                                    text-base transition-colors
                                    text-center 
                                    hover:bg-[--main-bg]
                                `}
                            >
                                Selecione um arquivo
                            </label>

                            <input
                                ref={fileInputRef}
                                id="file-upload"
                                type="file" 
                                accept="image/"
                                onChange={handleImageUpload}
                                style={{display: "none"}}
                                className=""
                                required
                            />

                            {preview && (
                                <>
                                    <button 
                                            htmlFor="file-upload" 
                                            id="custom-file-upload"
                                            type="submit" 
                                            className={`
                                                mt-56 cursor-pointer
                                                p-3 bg-[--secondary-bg]
                                                text-white rounded-md
                                                text-base transition-colors
                                                text-center 
                                                hover:bg-[--main-bg]
                                            `}
                                    >
                                        Enviar o arquivo
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                ):(
                    <div 
                        id="report" 
                        className={`
                            w-2/4 my-auto
                            p-5 bg-white
                            border-spacing-1 border-solid
                            border-#ccc rounded-xl
                            shadow-black
                        `}
                    >
                        <h2 
                            id="report-title"
                            className={`
                                text-center text-xl
                                mb-5 uppercase
                                font-bold text-#333
                            `}
                        >
                            Relatório de Predição
                        </h2>
                        <p className="m-5 text-base"><strong>Resultado: </strong>{
                            prediction ? `${prediction.prediction.classe} (${prediction.prediction.probabilidade}%)` : `${prediction.prediction.classe}`
                        }</p>
                        <p className="m-5 text-base"><strong>Recomendação: </strong>Procure um médico</p>
                        <button 
                            id="new-prediction-btn" 
                            onClick={resetPrediction} 
                            type="reset"
                            className={`
                                w-max h-max
                                flex m-5
                                justify-center items-center
                                gap-1
                                py-2 px-7
                                size-4 text-white
                                bg-[--secondary-bg] border-none
                                rounded-md cursor-pointer
                                font-bold hover:bg-[--main-bg]
                            `}
                        >
                            Nova Predição{"\n"}
                            <FaPlus size={15}/>
                        </button>
                        <button 
                            id="new-prediction-btn" 
                            onClick={() => imprimirRelatorio(userData.name, prediction.prediction.classe, prediction.prediction.probabilidade)} 
                            type="button"
                            className={`
                                w-max h-max
                                flex m-5
                                justify-center items-center
                                gap-1
                                py-2 px-7
                                size-4 text-white
                                bg-[--secondary-bg] border-none
                                rounded-md cursor-pointer
                                font-bold hover:bg-[--main-bg]
                            `}
                        >
                            Imprimir{"\n"}
                            <FaFilePdf/>
                        </button>
                    </div>
                )}
            </form>
        </>
    )
}

export default Predicao;