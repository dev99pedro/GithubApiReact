import React, { useState } from "react"
import './Button.css'




const Button = ({handleClick, children, buttonStyle}) => {


    return (
        <div>
            <button className={buttonStyle} onClick={handleClick}> 
                {children}
            </button>
        </div>
    )
}


export default Button