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

const ColumnChart = ({ year }) => {
  const [countDocsMonthly, setCountDocsMonthly] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/documents/monthly/${year}`)
        .then((res) => res.json())
        .then((data) => {
          setCountDocsMonthly(data);
        });
  }, [year]);
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

const LineChart = ({ year }) => {
  const [countDocsMonthly, setCountDocsMonthly] = useState([]);
  const [countUsersMonthly, setCountUsersMonthly] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/documents/monthly/${year}`)
        .then((res) => res.json())
        .then((data) => {
          setCountDocsMonthly(data);
        });
    fetch(`http://localhost:8080/api/v1/users/monthly/${year}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setCountUsersMonthly(data);
        });
  }, [year]);
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
                  data: countUsersMonthly.map((item) => {
                    return item.total;
                  }),
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

const DoughnutDocsChart = ({ year }) => {
  const [totalDocsByType, setTotalDocsByType] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/documents/type/${year}`)
        .then((res) => res.json())
        .then((data) => {
          setTotalDocsByType(data);
        });
  }, [year]);

  let other = 0;
  for (let i = 2; i < totalDocsByType.length; i++) {
    other += totalDocsByType[i].total;
  }
  const data = {
    labels: ["Pdf", "Docx", "Other"],
    datasets: [
      {
        label: "Tài liệu",
        data: totalDocsByType
            ? [totalDocsByType[0]?.total, totalDocsByType[1]?.total, other]
            : [0, 0, 0],
        backgroundColor: ["#fb923c", "#3b82f6", "#22c55e"],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
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

const DoughnutUserChart = ({ year }) => {
  const [totalUserByType, setTotalUserByType] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/users/type/${year}`)
        .then((res) => res.json())
        .then((data) => {
          setTotalUserByType(data);
        });
  }, [year]);
  const data = {
    labels: ["Admin", "Giáo viên", "Sinh viên", "Người dùng khác"],
    datasets: [
      {
        label: "Tổng",
        data: totalUserByType
            ? [
              totalUserByType[0]?.total,
              totalUserByType[1]?.total,
              totalUserByType[2]?.total,
              totalUserByType[3]?.total,
            ]
            : // ? totalUserByType.map((item) => {
              //     return item.total;
              //   })
            [1, 1, 1, 1],
        backgroundColor: ["#facc15", "#3b82f6", "#22c55e", "#ef4444"],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(115, 127, 217, 0.8)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 71, 0.8)",
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
export { LineChart, DoughnutDocsChart, DoughnutUserChart };