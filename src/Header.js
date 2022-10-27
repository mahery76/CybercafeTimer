import React, {useState} from 'react'
import cyber from "./images/cyber.png"
import voary from "./images/voary.png"
import './styles/header.css'
function Header(props) {
  const [postes, setPostes] = useState('poste__active item')
  const [wifi, setWifi] = useState('wifi__inactive item')
  const posteClick = () => {
    setPostes('poste__active item')
    setWifi('wifi__inactive item')
    props.changePW('postesWin__active')
    props.changeWW('wifiWin__inactive')
  }
  const wifiClick = () => {
    setPostes('poste__inactive item')
    setWifi('wifi__active item')
    props.changePW('postesWin__inactive')
    props.changeWW('wifiWin__active')
  }
  return (
    <div>
      <div className="header__main">
        <div>
          <img className='cyber' src={cyber} alt="" />
          <img className='voary' src={voary} alt="" />
        </div>
        <nav>
          {/* <Link to="/">Postes</Link>
          <Link to="/wifi">Wi-fi</Link> */}
          <div 
            className={postes}
            onClick ={posteClick}
            >Postes
          </div>
          <div 
            className={wifi}
            onClick ={wifiClick}
          >Wi-fi
          </div>
        </nav>

      </div>
    </div>
  )
}
export default Header