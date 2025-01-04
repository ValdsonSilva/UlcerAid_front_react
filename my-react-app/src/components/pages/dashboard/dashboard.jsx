import { useEffect, useMemo, useRef } from "react";
import SideBar from "../../sidebar/sidebar";
import "./dashboard.style.css"
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController, LineController, PointElement } from 'chart.js';

// Registrando os componentes necessários
Chart.register(BarElement, BarController, PointElement, CategoryScale, LineController, LinearScale, Title, Tooltip, Legend);

function Dashboard() {
    const chartRef = useRef(null)
    const chartInstance = useRef(null)

    // Memoriza os dados para evitar recriações desnecessárias
    const data = useMemo(() => ({
        labels: ['Predição 1', 'Predição 2', 'Predição 3'],
        datasets: [
            {
                label: "Acurácia (%)",
                data: [85, 90, 78],
                backgroundColor: ['#4caf50', '#ff9800', '#f44336']
            }
        ]
    }), []);

    useEffect(() => {
        const canvas = chartRef.current;
        if (!canvas) {
            console.error('Canvas não encontrado!');
            return;
        }

        const ctx = canvas.getContext('2d'); // Agora acessando o contexto 2D corretamente
        if (!ctx) {
            console.error('Falha ao adquirir o contexto do canvas.');
            return;
        }

        // Destruir gráfico anterior se existir
        if (chartInstance.current) {
            chartInstance.current.destroy();
            console.log("destruiu gráfico anterior");
        }

        // Criando o gráfico corretamente usando um <canvas>
        chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Destruir o gráfico ao desmontar o componente
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
                console.log("destruiu ao desmontar");
            }
        };
    }, [data]); 

    return (
        <>
            <SideBar />
            <h1 style={{ textAlign: "center" }}>Dashboard de Predições</h1>
            <div style={{
                display: "flex", justifyContent: "center", alignItems: "center", 
                width: '60%', height: '400px', margin: '0 auto' 
            }}>
                {/* Corrigido para usar <canvas> */}
                <canvas ref={chartRef}></canvas>
            </div>
        </>
    )
}

export default Dashboard;