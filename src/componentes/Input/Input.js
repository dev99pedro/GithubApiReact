import React, { useState } from 'react';
import './Input.css'

function Input({ changeInput, lidarEvento}) {


 

    return (
        <div>
            <input onKeyDown={lidarEvento} type="text" onChange={changeInput} />
        </div>
    )
}

export default Input