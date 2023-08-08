import { useEffect, useState, useRef } from "react";
import "./Graph.css";
//Se importan componentes y funcionalidades relacionadas con la biblioteca "chart.js" para crear y personalizar los gráficos.
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

import moment from "moment/moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
//Graph: recibe varias propiedades como argumentos: type, coin, currency, days y color.
export default function Graph({
  type = 1,
  coin = "bitcoin",
  currency = "usd",
  days = 30,
  color = "#04D99D",
}) {
  /*Se define un objeto chartStyle para configurar el estilo del gráfico, 
  incluyendo el borde, la cuadrícula y las etiquetas de los ejes.*/
  const chartStyle = {
    border: {
      display: false,
    },

    grid: {
      display: false,
    },
    ticks: {
      display: false,
    },
  };
/* Se construye la URL para obtener los datos del mercado de la criptomoneda utilizando la API de Coingecko. */
  let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`;

  let data, options;
/*Se utiliza el estado para almacenar los datos de los precios (prices),
 las fechas (dates) y el gradiente de fondo (gradient) para el gráfico. */
  const [prices, setPrices] = useState();
  const [dates, setDates] = useState();
  const [gradient, setGradient] = useState();
/*Se define la función getData que realiza una solicitud a la API de Coingecko para obtener datos de mercado
 de la criptomoneda seleccionada y 
actualiza el estado con los datos obtenidos. */
  async function getData() {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setPrices(json.prices.map((item) => Math.round(item[1])));
      setDates(json.prices.map((item) => moment.unix(item[0]).format("MM-DD")));
    } catch (e) {
      console.log("error", e);
    }
  }
//Se crea una referencia (chartRef) que se utilizará para acceder al elemento DOM del gráfico.
  const chartRef = useRef(null);
//useEffect para obtener los datos y configurar el gradiente de fondo cuando el componente se monta.
  useEffect((_) => {
    getData();
    const canvas = chartRef.current.firstChild;
    let BGgradient = canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, canvas.height);

    BGgradient.addColorStop(0, "rgba(4, 191, 157, 1)");
    BGgradient.addColorStop(1, "rgba(4, 191, 157, 0)");
    setGradient(BGgradient);
  }, []);
/*Se utiliza una estructura switch para definir las opciones y datos del gráfico en función del valor de type.
Para type 0, se configura un gráfico de líneas con una leyenda y un relleno degradado.
Para type 1, se configura un gráfico de líneas simple. */
  switch (type) {
    case 0:
      options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              callback: function (value, index, ticks) {
                return `$${value
                  .toString()
                  .replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    "."
                  )} ${currency.toUpperCase()}`;
              },
            },
          },
        },
      };
      data = {
        labels: dates,
        datasets: [
          {
            data: prices,
            borderColor: color,
            backgroundColor: gradient,
            tension: 0.4,
            pointRadius: 0,
            fill: true,
          },
        ],
      };
      break;
    case 1:
      options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: chartStyle,
          y: chartStyle,
        },
      };
      data = {
        labels: dates,
        datasets: [
          {
            data: prices,
            borderColor: color,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      };
      break;
  }
  return (
    <div ref={chartRef} className="graph">
      <Line data={data} options={options} />
    </div>
  );
}