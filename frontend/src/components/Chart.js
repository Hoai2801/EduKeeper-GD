import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  BarElement,
  LineElement,
  PointElement,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

import React, { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  LineElement,
  PointElement,
  ArcElement,
  Legend
);

const ColumnChart = (data) => {
  const [countDocsMonthly, setCountDocsMonthly] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/documents/monthly")
      .then((res) => res.json())
      .then((data) => {
        setCountDocsMonthly(data);
      });
  }, []);
  return (
    <div>
      <Bar
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Tài liệu",
              data: countDocsMonthly.map((item) => {
                return item.total;
              }),
              backgroundColor: "#3b82f6",
            },
          ],
        }}
      />
    </div>
  );
};

const LineChart = () => {
  const [countDocsMonthly, setCountDocsMonthly] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/documents/monthly")
      .then((res) => res.json())
      .then((data) => {
        setCountDocsMonthly(data);
      });
  }, []);
  return (
    <div>
      <Line
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Tài liệu",
              data: countDocsMonthly.map((item) => {
                return item.total;
              }),
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              fill: true,
            },
            {
              label: "User",
              data: [10, 20, 80, 34, 68, 10, 20, 200, 32, 10, 20, 10],
              borderColor: "#ff6384",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Month",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Value",
              },
            },
          },
        }}
      />
    </div>
  );
};

const DoughnutChart = () => {
  const [totalDocsByType, setTotalDocsByType] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/documents/type")
      .then((res) => res.json())
      .then((data) => {
        setTotalDocsByType(data);
      });
  }, []);

  let other = 0;
  for (let i = 3; i < totalDocsByType.length; i++) {
    other += totalDocsByType[i].total;
  }
  const data = {
    labels: ["Pdf", "Docx", "Mp4", "Other"],
    datasets: [
      {
        label: "Tài liệu",
        data: totalDocsByType
          ? [
              totalDocsByType[0]?.total,
              totalDocsByType[1]?.total,
              totalDocsByType[2]?.total,
              other,
            ]
          : [50, 40, 80, 100],
        backgroundColor: ["#fb923c", "#3b82f6", "#22c55e", "#facc15"],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <div className="min-h-64 min-w-64">
      <Pie data={data} options={options} />
    </div>
  );
};

export default ColumnChart;
export { LineChart, DoughnutChart };
