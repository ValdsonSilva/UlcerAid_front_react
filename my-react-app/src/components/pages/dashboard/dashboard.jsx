import { useEffect, useMemo, useRef } from "react";
import SideBar from "../../sidebar/sidebar";
// import "./dashboard.style.css"
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
            <div id="dashboard-container" className="flex justify-center items-center flex-col mt-20 gap-5">
                <h1 className="text-center font-bold">Dashboard de Predições</h1>

                <div id="dashboards" className="flex justify-center items-center flex-col w-full">
                    <div className="flex justify-center items-center w-1/3 h-[400px] m-auto">
                        <canvas ref={pieChartRef} className="border-2 border-solid border-black bg-white w-2/12"></canvas>
                        <canvas ref={lineChartRef} className="border-2 border-solid border-black bg-white w-8"></canvas>
                    </div>

                    <div className="flex justify-center items-center w-[66.5%] h-[200px] m-auto mt-0">
                        <canvas ref={chartRef} style={{border: "2px solid #000", backgroundColor: "#fff"}}></canvas>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard;