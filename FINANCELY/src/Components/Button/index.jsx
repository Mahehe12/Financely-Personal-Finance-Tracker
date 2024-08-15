import React from 'react'
import './styles.css'

function Button({ text, onClick, blue, disabled }) { //Blue is a flag variable to check for buttons
    return (
        <button className={blue ? 'btn btn-blue' : 'btn'} onClick={onClick} disabled={disabled}> {text} </button>
    )
}

export default Button