import React from 'react'
import './CoinRow.css'
// funciones se utilizan para formatear y estilizar los datos que se muestran en la fila de la tabla.
import {deleteDec, colorDec, numberF} from '../App'
import Graph from './Graph'
/* CoinRow, recibe dos propiedades,coin (que representa la información de la criptomoneda) e index (que representa el índice de la fila en la tabla).
TD:Se representan diferentes datos relacionados con la criptomoneda en celdas de la fila.
index: Muestra el índice de la fila.
coin.image: Muestra la imagen de la criptomoneda.
coin.current_price: Muestra el precio actual de la criptomoneda.
coin.market_cap_change_percentage_24h: Muestra el cambio de capitalización de mercado en las últimas 24 horas, con clases CSS generadas por colorDec.
coin.total_volume: Muestra el volumen total de la criptomoneda.
coin.market_cap: Muestra la capitalización de mercado de la criptomoneda.
<Graph>: Renderiza el componente Graph y le pasa las propiedades coin, days y color.

*/
export default function CoinRow({coin, index}) {
  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className='coin_image_container'>
          <img src={coin.image} alt={coin.name} title={coin.name}/>
        </div>
      </td>
      <td title='Precio'>{numberF.format(coin.current_price)} US$</td>
      <td className={colorDec(coin.market_cap_change_percentage_24h)} title='24 h'>{deleteDec(coin.market_cap_change_percentage_24h, 2)}%</td>
      <td title='Vol. total'>{numberF.format(coin.total_volume)}US$</td>
      <td title='Cap. mercado'>{numberF.format(coin.market_cap)}US$</td>
      <td title='Últimos 7 días'><Graph coin={coin.id} days={7} color={colorDec(coin.market_cap_change_percentage_24h)}/></td>
    </tr>
  )
}