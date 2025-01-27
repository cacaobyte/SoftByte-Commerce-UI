import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Registrar los controladores necesarios
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const ArticlesChart = ({ articles }) => {
  const [chartData, setChartData] = useState(null);
  const [priceTrendData, setPriceTrendData] = useState(null);

  useEffect(() => {
    // Datos para el gráfico de distribución
    const distributionData = {
      labels: ["Activos", "Inactivos"],
      datasets: [
        {
          label: "# de Artículos",
          data: [
            articles.filter((article) => article.activo).length,
            articles.filter((article) => !article.activo).length,
          ],
          backgroundColor: ["#4caf50", "#f44336"],
          borderWidth: 1,
        },
      ],
    };

    setChartData(distributionData);

    // Datos para el gráfico de tendencias de precios
    const priceTrendData = {
      labels: articles.map((article) => article.descripcion),
      datasets: [
        {
          label: "Precio de artículos",
          data: articles.map((article) => article.precio),
          borderColor: "#4caf50",
          backgroundColor: "rgba(76, 175, 80, 0.1)",
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    };

    setPriceTrendData(priceTrendData);
  }, [articles]);

  if (!chartData || !priceTrendData) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Gráfico de distribución */}
      <Card className="shadow-lg p-4">
        <CardHeader>
          <CardTitle>Distribución de Artículos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div style={{ width: "300px", height: "300px" }}>
              <Doughnut data={chartData} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de tendencia de precios */}
      <Card className="shadow-lg p-4">
        <CardHeader>
          <CardTitle>Tendencia de Precios</CardTitle>
        </CardHeader>
        <CardContent>
          <Line
            data={priceTrendData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
              scales: {
                x: {
                  type: "category",
                  title: {
                    display: true,
                    text: "Artículos",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Precio (Q)",
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticlesChart;
