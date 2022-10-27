import React, { useState } from 'react'
import './styles/wifi.css'
import './styles/postes.css'
import Wifi from './Wifi';

function Wifis({ prix_min }) {

    const [list, setList] = useState([]);
    const [counter, setCounter] = useState(0);



    const ajout_timer = () => {
        setCounter(prev => prev + 1)

        list.push(counter)
        console.log(counter, list)
    }

    const handle_delete = (id) => {
        setList(list.filter(item => item !== id))
    }

    return (
        <div>
            <div className="wifi">
                <button onClick={ajout_timer} className="wifi__ajouter">
                    Ajouter un compteur
                </button>
            </div>
            <div className='wifi__all'>
                {
                    list.map(listId =>
                        <div key={listId} className="wifi__item">
                            <Wifi prix_min={prix_min} />
                            <div onClick={() => handle_delete(listId)} className='delete' >
                                <i className='bi bi-trash'></i>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Wifis