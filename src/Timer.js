import React from 'react'
import { useState } from 'react'
import "./styles/timer.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
import hira from './audio/beep.mp3'

function Timer(props) {
  const [prix, setPrix] = useState(0);
  const [vola, setVola] = useState(0);

  const [play, setPlay] = useState(true);

  const [sec, setSec] = useState(0)
  const [min, setMin] = useState(0)
  const [hrs, setHrs] = useState(0)

  const [intervalId, setIntervalId] = useState(0)

  const [time_values, setTime_values] = useState('time_values hidden')
  const [prix_display, setPrix_display] = useState('prix hidden')

  const [isMuted, setIsMuted] = useState(true)

  const handleClick = () => {

    if (play) {
      setPlay(false)
      setTime_values('time_values')
      setPrix_display('prix')

      let prix_temp = 0
      let time_temp = 0
      const newIntervalId = setInterval(() => {
        // manampy anle prix isa tsegondra
        prix_temp = prix_temp + props.prix_min / 60

        let seconde = time_temp % 60;
        let minute = Math.floor((time_temp % (60 * 60)) / 60)
        let hour = Math.floor(
          (time_temp % (24 * 60 * 60)) / (60 * 60)
        )
        // manampy anle temps plus une seconde isa tsegondra
        time_temp = time_temp + 1

        // rehefa tapitra ny fotoana
        setPrix(prix_temp)
        setSec(seconde);
        setMin(minute);
        setHrs(hour);


        if (prix_temp > vola && vola !== 0) {
          // manova anle poste ho lasa misy bordure rehefa tapitra ny fotoana
          props.change_poste('poste vita')
          setIsMuted(false)
        }

      }, 1000);
      setIntervalId(newIntervalId);

    }
    else {
      setPlay(true)
      clearInterval(intervalId)
      setIsMuted(true)
    }
  }
  const reset = () => {
    setPrix_display('prix_display hidden')
    setTime_values('time_values hidden')
    setPrix(0)
    setSec(0)
    setMin(0)
    setHrs(0)
    setVola(0)
    //remove post border 
    props.change_poste('poste')
    setIsMuted(true)

  }
  const onChange = (e) => {
    setVola(e.target.value)
    console.log(vola)
  }
  const isLooping = true;
  const isPlaying = true;

  return (
    <div>
      <div className="timer__tous">
        <div className="timer2__content">
          <div className='time'>
            <div className={time_values} >
              <span className='values'> {hrs} </span> hrs &nbsp;
              <span className='values'> {min} </span> min &nbsp;
              <span className='values'> {sec} </span> sec &nbsp; &nbsp; &nbsp;
            </div>
          </div>

          <div className="input">
            <input type="number" value={vola} onChange={onChange} id="vola" />
          </div>
          <div className="prix_part">
            <div className={prix_display}>
              <span className='values'>{Math.round(prix)}</span>   Ar
            </div>
          </div>

        </div>
        <div onClick={handleClick} className="play buttons">
          <i className={play ? "bi bi-play" : "bi bi-stop-fill"}></i>
        </div>
        <div onClick={reset} className="reset buttons ">
          <i className='bi bi-arrow-counterclockwise'></i>
        </div>

        <audio
          className='audio'
          autoPlay={isPlaying}
          muted={isMuted}
          loop={isLooping}
        >
          <source src={hira} type='audio/mpeg' />
        </audio>

      </div>
    </div>
  )
}
export default Timer