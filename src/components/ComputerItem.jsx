import React, { useEffect, useState } from "react";
import { editNameComputer } from "../api/computersApi";

function ComputerItem({ terminal, handleDelete }) {
  const [isSelected, setIsSelected] = useState(false);
  const [isRunnig, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const [computer_name, setComputer_name] = useState(terminal.computer_name);

  const [hours, setHours] = useState(terminal.hours);
  const [minutes, setMinutes] = useState(terminal.minutes);
  const [seconds, setSeconds] = useState(terminal.seconds);

  const handleValidate = (computers_id) => {
    setIsSelected(() => false);
    editNameComputer(computer_name, computers_id);
  };

  useEffect(() => {
    if (isRunnig) {
      const intervalId = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds + 1 === 60) {
            setMinutes((minutes) => {
              //here goes the post request every minute

              if (minutes + 1 === 60) {
                setHours((hours) => hours + 1);
                return 0;
              }
              return minutes + 1;
            });
            return 0;
          }
          return seconds + 1;
        });
      }, 1000);
      setTimerId(intervalId);
    } else if (!isRunnig && timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  },[isRunnig]);

  const playTimer = () => {
    setIsRunning(() => true);
  };

  const pauseTimer = () => {
    setIsRunning(() => false);
  };

  const resetTimer = () => {
    // here goes the update from the database 
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  return (
    <div className="flex">
      <div className={isSelected ? "hidden" : "block"}>{computer_name}</div>

      <div className={isSelected ? "block" : "hidden"}>
        <input
          className="border-2 border-grey-100"
          type="text"
          value={computer_name}
          onChange={(e) => setComputer_name(e.target.value)}
        />
      </div>

      <div
        className={isSelected ? "hidden" : "block"}
        onClick={() => setIsSelected(() => true)}
      >
        Edit
      </div>

      <div
        className={isSelected ? "block" : "hidden"}
        onClick={() => handleValidate(terminal.computers_id)}
      >
        Valider
      </div>

      <div>
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      <div onClick={playTimer}>play</div>
      <div onClick={pauseTimer}>pause</div>
      <div onClick={resetTimer}>pause</div>

      <button onClick={() => handleDelete(terminal.computers_id)}>
        Delete
      </button>
    </div>
  );
}

export default ComputerItem;
