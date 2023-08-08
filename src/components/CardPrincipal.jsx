import './CardPrincipal.css'
import { deleteDec, colorDec } from '../App'
import Graph from './Graph'
/* CardPtincipal: Este objeto contiene varias propiedades relacionadas con la información de una criptomoneda, como su ID, símbolo, 
precio actual, imagen y cambios de precio en diferentes intervalos.
 -El fragmento < />, no genera ningun nodo adicional en el DOM
 -criptoInfo: Se muestra la imagen (image) de la criptomoneda junto con su símbolo, precio actual y moneda (cur).
 -graphic: Se renderiza el componente Graph y se le pasan las propiedades type, coin y currency.
 -capitalizacion: Se muestra la capitalización de la criptomoneda en diferentes intervalos (1 hora, 24 horas, 7 días, 1 mes, 1 año) en una tabla.*/
export default function CardPrincipal({ json: { id, symbol, current_price, image,               price_change_percentage_1h_in_currency, price_change_percentage_24h_in_currency, price_change_percentage_7d_in_currency, price_change_percentage_30d_in_currency, price_change_percentage_1y_in_currency }, cur= 'usd'}) {
    return (
        <>
            <article className="cripto-first">
                <div className="cripto-info">
                    <img src={image} alt="Icono de la cripto" />

                    <div className='cripto-title'>
                        <h2>{symbol} - {current_price} {cur}</h2>
                        
                        <h2 className={`porcentaje ${colorDec(price_change_percentage_30d_in_currency)}`}>{deleteDec(price_change_percentage_30d_in_currency, 2)}%</h2>
                    </div>
                </div>

                <div className="graphic">
                    <Graph type={0} coin={id} currency={cur}/>
                </div>

                <div className="capitalization"> 
                    <h2>Capitalización</h2>

                    <table className="capitalization-table">
                        <thead>
                            <tr>
                                <th>1h</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>1m</th>
                                <th>1y</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className={colorDec(price_change_percentage_1h_in_currency)}>{deleteDec(price_change_percentage_1h_in_currency, 2)} %</td>
                                <td className={colorDec(price_change_percentage_24h_in_currency)}>{deleteDec(price_change_percentage_24h_in_currency, 2)} %</td>
                                <td className={colorDec(price_change_percentage_7d_in_currency)}>{deleteDec(price_change_percentage_7d_in_currency, 2)} %</td>
                                <td className={colorDec(price_change_percentage_30d_in_currency)}>{deleteDec(price_change_percentage_30d_in_currency, 2)} %</td>
                                <td className={colorDec(price_change_percentage_1y_in_currency)}>{deleteDec(price_change_percentage_1y_in_currency, 2)} %</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </>
    )
}