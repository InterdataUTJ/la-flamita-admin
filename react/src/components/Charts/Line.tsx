import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { LineChartProps } from './types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function LineChart(props: LineChartProps) {


  const colors = props.colors || [
    "rgb(54, 162, 235)",
    "rgba(54, 162, 235, 0)"
  ];

  const unit = typeof props.data[0].dato !== "string" ? props.data[0].dato[props.dataKey][1] : "";

  return <Line
    data={{
      labels: props.data.map((v) => formatTimestamp(v.timestamp)),
      datasets: [{
        label: props.dataKey,
        data: props.data.map(({ dato }) => typeof dato !== "string" ? dato[props.dataKey][0] : dato),
        tension: 0.4,
        fill: true,
        borderColor: colors[0],
        backgroundColor: ({ chart: { ctx }}) => {
          var gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, colors[0]);
          gradient.addColorStop(0.9, colors[1]);
          return gradient;
        }
      }]
    }}

    options={{
      responsive: true,
      scales: {
        y: { 
          beginAtZero: true,
          ticks: {
            callback: (val) => `${val}${unit}`,
          }
        },
        x: { ticks: {
          maxRotation: 80,
          minRotation: 10,
          callback: function(val, index) {
            // Hide every 2nd tick label
            return index % 2 === 0 ? this.getLabelForValue(val as number).split(" ")[0] : '';
          },
        }}
      },
      plugins: {
        title: { display: true, text: props.title },
        tooltip: {
          callbacks: {
            label: (item) => `${item.dataset.label}: ${item.formattedValue}${unit}`
          }
        }
      },
    }}
  />;
}