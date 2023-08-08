import React, {useState, useRef} from 'react'
import './Convert.css'
import {deleteDec} from '../App'
/*InputConvert es un componente de función que recibe varias propiedades como argumentos: 
coin, sel, fun, other, text y type.*/
export default function InputConvert({coin, sel="btc", fun, other, text, type = 1, result = 0}) {
/*Se utiliza el estado para almacenar el valor seleccionado en el menú desplegable (selVal). */
  const selRef = useRef(null)
  const [selVal, setSelVal] = useState(sel)
/*Dentro del contenedor, se muestra un campo de entrada numérica (<input>) que permite a los usuarios ingresar
un valor numérico. */
  return (
    <>
    <div className='input'>
        
        {(type == 0) ? <input type="number" placeholder="0" onChange={e => {text(parseInt(e.target.value))}}/> : <input type="number" placeholder="0" value={deleteDec(result, 4)} readOnly={true}/>}

        <div className='select'>
          <img src="" alt="" />

          <select value={selVal} ref={selRef} onChange={() => {
//Se crea una referencia (selRef) que se utilizará para acceder al elemento DOM del menú desplegable.

            setSelVal(selRef.current.value)
            fun(selRef.current.value)
          }}>

          {coin.map((co) => {
//selVal se sincroniza con el valor seleccionado en el menú desplegable, y se actualiza cuando el usuario cambia la selección.
            if(co.symbol === selVal) {
              selRef.current.previousSibling.src = co.image
              return <option value={co.symbol} key={co.id}>{co.symbol}</option>
            } else if (co.symbol != other) {
              return <option value={co.symbol} key={co.id}>{co.name}</option>
            }
          })}
          </select>
        </div>
      </div>
    </>
  )
}