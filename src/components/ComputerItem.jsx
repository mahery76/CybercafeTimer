import React, { useEffect, useRef, useState } from "react";
import { editNameComputer } from "../api/computersApi";
import { BsTrash } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import { FaRegCirclePause } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import bipsong from "../assets/beepb.wav"

function ComputerItem({ computer, handleDelete, feePerMinute }) {
  const [isSelected, setIsSelected] = useState(true);
  const [computer_name, setComputer_name] = useState(computer.computer_name);

  const handleValidate = (computers_id) => {
    setIsSelected(() => false);
    editNameComputer(computer_name, computers_id);
  };

  const [isRunnig, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [hours, setHours] = useState(computer.hours);
  const [minutes, setMinutes] = useState(computer.minutes);
  const [seconds, setSeconds] = useState(computer.seconds);
  const currentComputerFee = feePerMinute * minutes
  const [computerFee, setComputerFee] = useState(0)

  const audioRef = useRef(null)

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
  }, [isRunnig]);

  useEffect(() => {
    if(currentComputerFee !== 0 && currentComputerFee >= computerFee) {
      console.log("audio should be playing")
      audioRef.current.play()
    }
  },[seconds])

  const playTimer = () => {
    setIsRunning(() => true);
  };
  
  const pauseTimer = () => {
    setIsRunning(() => false);
    audioRef.current.pause()
  };

  const resetTimer = () => {
    // here goes the update from the database
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  return (
    <div className="grid grid-cols-5 gap-4 mt-4">
      {/* computer name */}
      <div className="flex gap-2 items-center ">
        <div className="w-5/6 cursor-pointer">
          <div className={isSelected ? "hidden" : "block"}>{computer_name}</div>
          <div className={isSelected ? "block" : "hidden"}>
            <input
              className="border-[2px] border-grey-100 w-full text-center"
              type="text"
              value={computer_name}
              onChange={(e) => setComputer_name(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleValidate(computer.computers_id);
                }
              }}
            />
          </div>
        </div>
        {/* edit and validate computer name */}
        <div className="w-1/6 cursor-pointer flex justify-center items-center">
          <div
            className={`${isSelected ? "hidden" : "block"}`}
            onClick={() => setIsSelected(() => true)}
          >
            <FaRegEdit />
          </div>
          <div
            className={isSelected ? "block" : "hidden"}
            onClick={() => handleValidate(computer.computers_id)}
          >
            <IoCheckmarkDoneSharp />
          </div>
        </div>
      </div>

      {/* computer time */}
      <div className="flex justify-center items-center">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      {/* computer fee */}
      <div>
        <input 
        type="number" 
        value={computerFee}
        onChange={(e) => setComputerFee(() => e.target.value)}
        className="border-[2px] border-grey-100 w-full text-center" 
        />
      </div>

      {/* current computer fee */}
      <div className="flex items-center justify-end gap-2">
        <span>{currentComputerFee}</span>
        <span>Ar</span>
      </div>

      {/* computer functions */}
      <div className="flex justify-center gap-2">
        {/* play */}
        <div
          className={`${isRunnig ? "hidden" : "flex"}
          justify-center items-center
        `}
          onClick={playTimer}
        >
          <FaRegCirclePlay />
        </div>

        {/* pause */}
        <div
          className={`${!isRunnig ? "hidden" : "flex"}
          justify-center items-center
        `}
          onClick={pauseTimer}
        >
          <FaRegCirclePause />
        </div>

        {/* reset */}
        <div className="flex justify-center items-center" onClick={resetTimer}>
          <GrPowerReset />
        </div>
        <div
          onClick={() => handleDelete(computer.computers_id)}
          className="flex justify-center items-center"
        >
          <BsTrash />
        </div>
        <audio ref={audioRef}>
          <source src={bipsong} type='audio/mpeg' />
        </audio>
      </div>
    </div>
  );
}


export default ComputerItem;
