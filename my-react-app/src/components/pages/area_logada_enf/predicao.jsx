import { useState, useRef } from "react";
import SideBar from "../../sidebar/sidebar";
// import "./predicao.style.css"
import { FaFilePdf, FaPlus } from "react-icons/fa";
import imprimirRelatorio from "../../../services/imprimirPdf";
import upload from "../../../assets/upload.png"
import api from "../../../services/api.js"
import SuccessPopup from "../../popups/success/successPopup.jsx";



function Predicao() {

    const [image, setImage] = useState(null)
    const fileInputRef = useRef(null)
    const [preview, setPreview] = useState('')
    const [prediction, setPrediction] = useState(false)
    const [popup, setPopup] = useState(false)

    const fetchPrediction = async (event) => {

        event.preventDefault()

        const formData = new FormData()

        formData.append("image", image)

        try {
            const response = await api.post('/api/v1/predict', formData)

            console.log("disparou")

            if (!response) {
                throw new Error(response.status)
            }

            setPrediction(response.data.result)
            setPopup(true)
            console.log("predição:", response.data)

        } catch (error) {
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
    }, 3000)

    return (
        <>
            <SideBar/>
            <form onSubmit={fetchPrediction} style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",padding: "20px", marginTop: "150px"}}>
                {popup ? <SuccessPopup/> : ""}
                <p>Envie uma imagem da ferida para análise.</p>
                {!prediction ? (
                    <>
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
                                    <p style={{fontWeight: 600}}>Processando imagem...</p>
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
                            prediction ? `${prediction.prediction} (95% de certeza)` : `${prediction.prediction}`
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
                            onClick={imprimirRelatorio} 
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