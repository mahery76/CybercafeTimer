import React, { useState } from 'react'
import Timer from "./Timer";
import './styles/postes.css'

function Postes({ prix_min }) {
    const [poste1, setPoste1] = useState('poste')
    const [poste2, setPoste2] = useState('poste')
    const [poste3, setPoste3] = useState('poste')
    const [poste4, setPoste4] = useState('poste')
    const [poste5, setPoste5] = useState('poste')
    const [poste6, setPoste6] = useState('poste')
    return (
        <div className="postes">
            <div className={poste1}>
                <div className="num_poste">P-01</div>
                <Timer
                    prix_min={prix_min}
                    change_poste={value => setPoste1(value)}
                />
            </div>
            <div className={poste2}>
                <div className="num_poste">P-02</div>
                <Timer
                    prix_min={prix_min}
                    change_poste={value => setPoste2(value)}
                />
            </div>
            <div className={poste3}>
                <div className="num_poste">P-03</div>
                <Timer
                    prix_min={prix_min}
                    change_poste={value => setPoste3(value)}
                />
            </div>
            <div className={poste4}>
                <div className="num_poste">P-04</div>
                <Timer
                    prix_min={prix_min}
                    change_poste={value => setPoste4(value)}
                />
            </div>
            <div className={poste5}>
                <div className="num_poste">P-05</div>
                <Timer
                    prix_min={prix_min}
                    change_poste={value => setPoste5(value)}
                />
            </div>
            <div className={poste6}>
                <div className="num_poste">P-06</div>
                <Timer
                    prix_min={prix_min}
                    change_poste={value => setPoste6(value)}
                />
            </div>
        </div>
    )
}

export default Postes