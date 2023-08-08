// importamos archivo Css
import './Card.css'
// importamos la entidad colorDeec,  se utiliza para determinar la clase de color en función del porcentaje.
import {colorDec} from '../App'
import Graph from './Graph'
// se aceptan propiedades por medio de Card
export default function Card({price, porcentaje, img, coinId, cur}) {
    return (
    /*contenido del componente card
        -imagen de la cripto moneda
        -se renderiza el precio y el porcentaje utilizando la lcase dinamica ColorDec
        -graph: se renderiza y pasan propiedades coin y currency y color que tambien es generaado por colorDec*/
        <div className="card">
            <div className='cripto-info'>

                <img className='card-img' src={img} alt="" />
 
                <div className='cripto-title'>
                    <h2> {price} </h2>

                    <h2 className={`porcentaje ${colorDec(porcentaje)}`}>{porcentaje}%</h2>
                </div>
            </div>
            
            <div className="graphic">
                <Graph coin={coinId} currency={cur} color={colorDec(porcentaje)}/>
            </div>
        </div>
    )
}