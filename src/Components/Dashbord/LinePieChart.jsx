import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement } from "chart.js";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

export default function MixedChart() {
  // Line chart data and configuration
  const lineChartData = {
    labels: ["Nov 01", "Nov 02", "Nov 03", "Nov 04", "Nov 05", "Nov 06", "Nov 07"], // x-axis labels
    datasets: [
      {
        type: 'bar', // Bar chart for Orders
        label: 'Jobs',
        backgroundColor: '#88e060',
        borderColor: '#88e060',
        data: [20, 50, 30, 60, 80, 40, 70],
        borderWidth: 1,
        barThickness: 10,
      },
      {
        type: 'bar', // Bar chart for Customers
        label: 'Events',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth:2,
        data: [10, 40, 20, 50, 70, 30, 60],
        borderWidth: 1,
        barThickness: 10,
      },
      {
        type: 'line', // Line chart for Earnings
        label: 'Application',
        borderColor: 'rgb(75, 192, 192)',
        data: [15, 30, 25, 55, 65, 35, 75],
        fill: false,
        pointRadius: 5, // Adjust or remove pointRadius if needed
      }
    ]
  };

  // Pie chart data and configuration
  const pieChartData = {
    datasets: [
      {
        label: "DataSet1",
        data: [83, 37, 23, 60],
        backgroundColor: ["#3c76d2", "red", "yellow", "purple"],
        borderColor: 'white',
        borderWidth: 2
      },
      {
        label: "DataSet2",
        data: [13, 147, 53, 146],
        backgroundColor: ["green", "red", "#3c76d2", "aqua"],
        borderColor: 'white',
        borderWidth: 2
      },
      {
        label: "DataSet3",
        data: [223, 337, 153, 346],
        backgroundColor: ["green", "red", "#3c76d2", "purple"],
        borderColor: 'white',
        borderWidth: 2
      },
    ],
  };

  // Line chart options
  const lineChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    scales: {
      x: {
        type: 'category', 
        display: true,
        offset: true,
      },
      y: {
        beginAtZero: true,
      },
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: '400px',
      marginTop:'7%'
    }}>
      <div style={{
        flex: 2,
        height: '100%',
        position: 'relative'
      }}>
        <Line data={lineChartData} options={lineChartOptions} style={{ height: '100%', width: '100%' }} />
      </div>
      <div style={{
        flex: 1,
        height: '65%',
        position: 'relative',
        top:'-4%',
        left:'2%'
      }}>
        <Pie data={pieChartData} style={{ height: '100%', width: '100%' ,marginLeft:"8%"}} />
      </div>
    </div>
  );
}
