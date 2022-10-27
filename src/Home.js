import { useState } from "react";
import Header from "./Header";
import './styles/home.css';
import Wifis from './Wifis';
import Postes from './Postes';


function Home() {
    const [prix_min, setPrix_min] = useState(30);
    const [postesWin, setPostesWin] = useState('postesWin__active')
    const [wifiWin, setWifiWin] = useState('wifiWin__inactive')
    return (
      <div className="home__all">
        <Header 
          changePW = {postesWin => setPostesWin(postesWin)}
          changeWW = {wifiWin => setWifiWin(wifiWin)}
        />
        <div className="prix__min">
          <div className="label" htmlFor="min"> Prix à la minute</div>
          <input type="number" value={prix_min} onChange={(e) => { setPrix_min(e.target.value) }} id="min" />
          <div className="label" htmlFor="min"> Ar</div>
        </div>
  
        <div className="content">
          <div className={postesWin}>
            <Postes prix_min={prix_min}/>
          </div>
          <div className={wifiWin}>
            <Wifis prix_min={prix_min}/>
          </div>
        </div>
      </div>
    );
}

export default Home