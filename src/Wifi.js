import React, { useState } from 'react'
import Timer from './Timer'
import './styles/wifi.css'
import './styles/postes.css'

function Wifi({prix_min}) {
    const [poste, setPoste] = useState('poste')
    return (
        <div className={poste}>
            <Timer
                prix_min={prix_min}
                change_poste={prev => setPoste(prev)}
            />
        </div>
    )
}

export default Wifi