import { useState, useMemo } from "react";
import SideBar from "../../sidebar/sidebar";
import "./predicao.style.css"
import { FaFilePdf, FaPlus } from "react-icons/fa";
import jsPDF from "jspdf"



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
                recomendacao: "Consultar médico especializado"
            })
        }, 2000)
    }

    const resetPrediction = () => {
        setImage(null)
        setResult(null)
    }

    const imprimirRelatorio = () => {
        const doc = new jsPDF()
    
        // titulo
        doc.setFontSize(18)
        doc.text("Relatório de Predição", 20, 20);
    
        // resuultado
        doc.setFontSize(14);
        doc.text("Resultado:", 20, 40);
        doc.text(`Úlcera detectada (${result.probabilidade} de acurácia)`, 20, 50);
    
        // recomendação
        doc.setFontSize(14);
        doc.text("Recomendação:", 20, 70);
        doc.text(`${result.recomendacao}`, 20, 80);
    
        // dados do usuário
        doc.setFontSize(14);
        doc.text(`
            Solicitante: Enf.Valdson Silva de Macedo
            COREN: 1111111
            Data: 11-12-2025
            Instituição: UFPI
        `, 20, 100);
        doc.text(`
            Assinatura eletrônica: 
                2ju2bjs8s92qjsnsjs2w-2828wjwhwwjwwjh21920
        `, 20, 140);
    
        // salvar o pdf
        doc.save("relatório_predicao.pdf")
    }

    return (
        <>
            <SideBar/>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",padding: "20px", marginTop: "150px"}}>
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
                        <p><strong>Resultado:</strong> {
                            result.detectado ? `Úlcera detectada (${result.probabilidade}% de certeza)` : "Úlcera não detectada"
                        }</p>
                        <p><strong>Recomendação:</strong> {result.recomendação}</p>
                        <button id="new-prediction-btn" onClick={resetPrediction}>
                            Nova Predição{"\n"}
                            <FaPlus size={15}/>
                        </button>
                        <button id="new-prediction-btn" onClick={imprimirRelatorio}>
                            Imprimir{"\n"}
                            <FaFilePdf/>
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Predicao;