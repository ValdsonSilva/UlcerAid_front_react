import { useState, useRef } from "react";
import SideBar from "../../sidebar/sidebar";
import "./predicao.style.css"
import { FaFilePdf, FaPlus } from "react-icons/fa";
import imprimirRelatorio from "../../../services/imprimirPdf";
import upload from "../../../assets/upload.png"
import api from "../../../services/api.js"



function Predicao() {
    const [image, setImage] = useState(null)
    const fileInputRef = useRef(null)
    const [preview, setPreview] = useState('')
    const [prediction, setPrediction] = useState(false)

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

    return (
        <>
            <SideBar/>
            <form onSubmit={fetchPrediction} style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",padding: "20px", marginTop: "150px"}}>
                <p>Envie uma imagem da ferida para análise.</p>
                {!prediction ? (
                    <>
                        <div 
                            id="input-file" 
                            style={
                                    preview ? {backgroundImage: `url(${preview})`} 
                                            : {backgroundImage: `url(${upload})`}
                            }
                        >

                            <label htmlFor="file-upload" id="custom-file-upload">
                                Selecione um arquivo
                            </label>

                            <input
                                ref={fileInputRef}
                                id="file-upload"
                                type="file" 
                                accept="image/"
                                onChange={handleImageUpload}
                                style={{display: "none"}}
                                required
                            />

                            {preview && (
                                <>
                                    <button htmlFor="file-upload" id="custom-file-upload" type="submit">
                                        Enviar um arquivo
                                    </button>
                                    <p style={{fontWeight: 600}}>Processando imagem...</p>
                                </>
                            )}
                        </div>
                    </>
                ):(
                    <div id="report">
                        <h2 id="report-title">Relatório de Predição</h2>
                        <p><strong>Resultado:</strong> {
                            prediction ? `${prediction.prediction} (95% de certeza)` : `${prediction.prediction}`
                        }</p>
                        <p><strong>Recomendação:</strong>Procure um médico</p>
                        <button id="new-prediction-btn" onClick={resetPrediction} type="reset">
                            Nova Predição{"\n"}
                            <FaPlus size={15}/>
                        </button>
                        <button id="new-prediction-btn" onClick={imprimirRelatorio} type="button">
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