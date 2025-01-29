import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Registrar los controladores necesarios
ChartJS.register(ArcElement, Tooltip, Legend);

const ArticlesChart = ({ articles }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Calcular datos para el gráfico
    const activeCount = articles.filter((article) => article.activo).length;
    const inactiveCount = articles.filter((article) => !article.activo).length;

    const distributionData = {
      labels: ["Activos", "Inactivos"],
      datasets: [
        {
          data: [activeCount, inactiveCount],
          backgroundColor: ["#4caf50", "#f44336"], // Verde y rojo sólidos
          hoverBackgroundColor: ["#66bb6a", "#ef5350"], // Colores al pasar el mouse
          borderColor: ["#ffffff", "#ffffff"], // Bordes blancos para separar secciones
          borderWidth: 2,
        },
      ],
    };

    setChartData(distributionData);
  }, [articles]);

  // Si no hay datos aún, no renderiza nada
  if (!chartData) return null;

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Gráfico de distribución */}
      <Card className="shadow-lg p-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Distribución de Artículos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div style={{ width: "100%", maxWidth: "280px" }}>
              <Doughnut
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 15,
                        font: {
                          size: 14,
                          family: "Inter",
                          weight: "500",
                        },
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          const total = context.dataset.data.reduce(
                            (acc, value) => acc + value,
                            0
                          );
                          const percentage = (
                            (context.raw / total) *
                            100
                          ).toFixed(2);
                          return `${context.label}: ${context.raw} (${percentage}%)`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="flex justify-between w-full max-w-md text-sm text-gray-600">
              <p className="flex items-center space-x-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#4caf50" }}
                ></span>
                <span>Activos</span>
              </p>
              <p className="flex items-center space-x-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#f44336" }}
                ></span>
                <span>Inactivos</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticlesChart;
