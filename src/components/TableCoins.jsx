import React from 'react'
import './TableCoins.css'
import CoinRow from './CoinRow'
/*TableCoins es un componente de función que recibe una propiedad llamada coins,
 que es una matriz de objetos que representan la información de diferentes criptomonedas.
 
 - La tabla tiene una fila de encabezado (<thead>) que contiene títulos para cada columna.
 - El cuerpo de la tabla contiene una serie de filas (<tr>) generadas a partir de la matriz coins.*/
export default function TableCoins({coins}) {
  return (
    <table className='table_coins'>
      <thead>
        <tr>
          <td>#</td>
          <td>Moneda</td>
          <td>Precio</td>
          <td>24h</td>
          <td>Vol. total</td>
          <td>Cap. mercado</td>
          <td>Últimos 7 días</td>
        </tr>
      </thead>

      <tbody>
        {coins.map((coin, index) => (
          <CoinRow coin={coin} key={index} index={index + 1}/>
        ))}
      </tbody>
    </table>
  )
}