import React from 'react'
import './Header.css'
/*Header es un componente de función que recibe tres propiedades: currencys, fun y cur.
 - Se muestra un selector de monedas (select) que permite al usuario elegir una moneda. El valor actual del selector
 está vinculado a la propiedad cur y se actualiza a través del cambio de eventos (onChange).
 - El contenido de las opciones (<option>) del selector se genera a partir de los elementos en la matriz currencys.
  Cada moneda disponible se muestra como una opción en el menú desplegable.*/
export default function Header({currencys, fun, cur}) {
    return (
        <header className='app-header'>
            <p>Crypto Stadistics</p>

            <div className='select-button'>
            <select value={cur} name="coinSelect" id="coinSelect" onChange={_ => {fun(document.getElementById("coinSelect").value)}}>
            {currencys.map((item, index) => <option value={item} key={index} >{item}</option>)}  
      </select>
            </div>

            <button className='toogleMode'>
                
            </button>
        </header>
    )
}