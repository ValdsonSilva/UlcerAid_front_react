import { useEffect, useMemo, useRef } from "react";
import SideBar from "../../sidebar/sidebar";
import "./dashboard.style.css"
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController, LineController, PointElement, LineElement, PieController, ArcElement } from 'chart.js';

// Registrando os componentes necessários
Chart.register(
        BarElement, BarController, PointElement, CategoryScale, 
        LineController, LinearScale, Title, Tooltip, Legend, LineController, 
        LineElement, PieController, ArcElement,
);

function Dashboard() {
    const chartRef = useRef(null)
    const lineChartRef = useRef(null)
    const pieChartRef = useRef(null)
    const chartInstances = useRef([])

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

    const pieData = useMemo(() => ({
        labels: ['Alta', 'Média', 'Baixa'],
        datasets: [{
            data: [40, 35, 25],
            backgroundColor: ['#4caf50', '#ff9800', '#f44336']
        }]
    }), []);

    useEffect(() => {
        const destryCharts = () => {
            chartInstances.current.forEach(instance => {
                if (instance) instance.destroy();
            });
            chartInstances.current = [];
        }

        destryCharts()

        chartInstances.current.push(new Chart(chartRef.current, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }))

        chartInstances.current.push(new Chart(lineChartRef.current, {
            type: "line",
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }))

        chartInstances.current.push(new Chart(pieChartRef.current, {
            type: "pie",
            data: pieData,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }))

        return () => {
            destryCharts();
            // chartInstances.current = null;
        };

    }, [data, pieData])


    return (
        <>
            <SideBar />
            <div id="dashboard-container">
                <h1 style={{ textAlign: "center" }}>Dashboard de Predições</h1>

                <div id="dashboards">
                    <div style={{
                        display: "flex", justifyContent: "center", alignItems: "center",
                        width: "35%", height: "400px", margin: '0 auto'}}
                    >
                        <canvas ref={pieChartRef} style={{border: "2px solid #000", backgroundColor: "#fff", width: "10%"}}></canvas>
                        <canvas ref={lineChartRef} style={{border: "2px solid #000", backgroundColor: "#fff", width: "30%"}}></canvas>
                    </div>

                    {/* <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "400px"}}>
                        <canvas ref={pieChartRef}></canvas>
                        
                    </div> */}

                    <div style={{
                        display: "flex", justifyContent: "center", alignItems: "center", 
                        width: '70%', height: '200px', margin: '0 auto', 
                        marginTop: "0px"
                    }}>
                        <canvas ref={chartRef} style={{border: "2px solid #000", backgroundColor: "#fff"}}></canvas>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard;

/*
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
        if (chartInstances.current) {
            chartInstances.current.destroy();
            console.log("destruiu gráfico anterior");
        }

        // Criando o gráfico corretamente usando um <canvas>
        chartInstances.current = new Chart(ctx, {
            type: "bar",
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });

        // Destruir o gráfico ao desmontar o componente
        return () => {
            if (chartInstances.current) {
                chartInstances.current.destroy();
                chartInstances.current = null;
                console.log("destruiu ao desmontar");
            }
        };
    }, [data]); 

 */