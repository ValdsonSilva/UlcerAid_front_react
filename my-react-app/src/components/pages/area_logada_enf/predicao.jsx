import { useState, useMemo } from "react";
import SideBar from "../../sidebar/sidebar";
import "./predicao.style.css"
import { FaFilePdf, FaPlus } from "react-icons/fa";


function Predicao() {
    const [image, setImage] = useState(null)
    const [result, setResult] = useState(null)


    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        setImage(file);

        setTimeout(() => {
            setResult({
                detectado: true,
                probabilidade: 95,
                recomendação: "Consultar médico especializado"
            })
        }, 2000)
    }

    const resetPrediction = () => {
        setImage(null)
        setResult(null)
    }

    const imprimirRelatorio = () => {
        alert("Imprimindo relatório da imagem")
    }

    return (
        <>
            <SideBar/>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",padding: "20px"}}>
                <h1 style={{textAlign: "center"}}>Predição</h1>
                <p>Envie uma imagem da ferida para análise.</p>
                {!result ? (
                    <>
                        <div id="input-file">
                            {/* <img src={Upload} alt="Imagem" id="imagem-upload"/> */}
                            <label htmlFor="file-upload" id="custom-file-upload">
                                Selecione um arquivo
                            </label>

                            <input
                                id="file-upload"
                                type="file" 
                                accept="image/"
                                onChange={handleImageUpload}
                                style={{display: "none"}}
                            />

                            {image && <p style={{fontWeight: 600}}>Processando imagem...</p>}
                        </div>
                    </>
                ):(
                    <div id="report">
                        <h2 id="report-title">Relatório de Predição</h2>
                        <p><strong>Resultado:</strong> Úlcera detectada (95% de certeza)</p>
                        <p><strong>Recomendação:</strong> Consultar médico especializado</p>
                        <button id="new-prediction-btn" onClick={resetPrediction}>
                            Nova Predição{"\n"}
                            <FaPlus size={15}/>
                        </button>
                        <button id="new-prediction-btn" onClick={imprimirRelatorio}>
                            Gerar relatório{"\n"}
                            <FaFilePdf/>
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Predicao;