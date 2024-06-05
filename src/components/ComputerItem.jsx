import React, { useEffect, useRef, useState } from "react";
import {
  editComputerFee,
  editComputerName,
  updateComputerTime,
} from "../api/computersApi";
import { BsTrash } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import { FaRegCirclePause } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import bipsong from "../assets/beepb.wav";

const ComputerName = ({
  isNameSelected,
  computer_name,
  setComputer_name,
  validateComputerName,
  selectComputerName,
}) => {
  return (
    <div className="flex gap-2 items-center ">
      {/* computer name input and computer name */}
      <div className="w-5/6 cursor-pointer text-center">
        <div className={isNameSelected ? "hidden" : "block"}>
          <input
            value={computer_name}
            readOnly
            className="rounded-md w-full text-white text-center bg-neutral-900"
          />
        </div>
        <div className={isNameSelected ? "block" : "hidden"}>
          <input
            className="rounded-md w-full text-white text-center border-[1px] border-white bg-neutral-950"
            type="text"
            value={computer_name}
            onChange={(e) => setComputer_name(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                validateComputerName();
              }
            }}
          />
        </div>
      </div>
      {/* edit and validate computer name controllers */}
      <div className="w-1/6 cursor-pointer flex justify-center items-center">
        <div
          className={`${isNameSelected ? "hidden" : "block"}`}
          onClick={() => selectComputerName()}
        >
          <FaLock />
        </div>
        <div
          className={isNameSelected ? "block" : "hidden"}
          onClick={() => validateComputerName()}
        >
          <FaLockOpen />
        </div>
      </div>
    </div>
  );
};

const ComputerTime = ({ hours, minutes, seconds }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`
    ${seconds > 0 || minutes > 0 || hours > 0 ? "block" : "hidden"}
    flex justify-center items-center
    `}
      >
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
};

const ComputerFee = ({
  isFeeSelected,
  computer_fee,
  setComputer_fee,
  currentcomputer_fee,
  validateComputerFee,
  selectComputerFee,
}) => {
  return (
    <>
      {/* computer fee input and computer fee */}
      <div className="flex gap-2 items-center ">
        <div className="w-5/6 cursor-pointer text-center">
          <div className={isFeeSelected ? "hidden" : "block"}>
            <input
             readOnly
              value={computer_fee}
              className="rounded-md w-full text-white text-center bg-neutral-900"
            />
          </div>
          <div className={isFeeSelected ? "block" : "hidden"}>
            <input
              className="rounded-md w-full text-white text-center border-[1px] border-white bg-neutral-950"
              type="number"
              value={computer_fee}
              onChange={(e) => setComputer_fee(() => e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  validateComputerFee();
                }
              }}
            />
          </div>
        </div>
        {/* edit and validate computer fee controllers */}
        <div className="w-1/6 cursor-pointer flex justify-center items-center">
          <div
            className={`${isFeeSelected ? "hidden" : "block"}`}
            onClick={() => selectComputerFee()}
          >
            <FaLock />
          </div>
          <div
            className={isFeeSelected ? "block" : "hidden"}
            onClick={() => validateComputerFee()}
          >
            <FaLockOpen />
          </div>
        </div>
      </div>

      {/* current computer fee */}
      <div className="flex items-center justify-end gap-2">
        <span>{currentcomputer_fee}</span>
        <span>Ar</span>
      </div>
    </>
  );
};

const ComputerControllers = ({
  isRunning,
  playTimer,
  pauseTimer,
  resetTimer,
  handleDelete,
  audioRef,
}) => {
  return (
    <div className="flex justify-between sm:justify-center gap-2 ">
      {/* play */}
      <div
        className={`${isRunning ? "hidden" : "flex"}
      justify-center items-center text-cyan-600 cursor-pointer
    `}
        onClick={() => playTimer()}
      >
        <FaRegCirclePlay />
      </div>

      {/* pause */}
      <div
        className={`${!isRunning ? "hidden" : "flex"}
      justify-center items-center text-orange-600 cursor-pointer
    `}
        onClick={() => pauseTimer()}
      >
        <FaRegCirclePause />
      </div>

      {/* reset */}
      <div
        className="flex justify-center items-center text-green-600 cursor-pointer"
        onClick={() => resetTimer()}
      >
        <GrPowerReset />
      </div>
      <div
        onClick={() => handleDelete()}
        className="flex justify-center items-center text-red-600 cursor-pointer"
      >
        <BsTrash />
      </div>
      <audio ref={audioRef}>
        <source src={bipsong} type="audio/mpeg" />
      </audio>
    </div>
  );
};

const ComputerItem = ({ computer, handleDelete, feePerMinute }) => {
  const [isNameSelected, setIsNameSelected] = useState(true);
  const [computer_name, setComputer_name] = useState(computer.computer_name);
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [hours, setHours] = useState(computer.hours);
  const [minutes, setMinutes] = useState(computer.minutes);
  const [seconds, setSeconds] = useState(computer.seconds);
  const [isFeeSelected, setIsFeeSelected] = useState(true);
  const [computer_fee, setComputer_fee] = useState(computer.computer_fee);
  const currentcomputer_fee = feePerMinute * minutes;
  const [isTimeOut, setIsTimeOut] = useState(false);
  const audioRef = useRef(null);

  const validateComputerName = (computer_id) => {
    setIsNameSelected(() => false);
    editComputerName(computer_name, computer_id);
  };

  const selectComputerName = () => {
    setIsNameSelected(() => true);
  };

  const validateComputerFee = (computer_id) => {
    setIsFeeSelected(() => false);
    editComputerFee(computer_fee, computer_id);
  };

  const selectComputerFee = () => {
    setIsFeeSelected(() => true);
  };

  const playTimer = () => {
    setIsRunning(() => true);
  };

  const pauseTimer = () => {
    setIsRunning(() => false);
    audioRef.current.pause();
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setIsTimeOut(() => false);
  };

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds + 1 === 60) {
            setMinutes((minutes) => {
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
    } else if (!isRunning && timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  }, [isRunning]);

  useEffect(() => {
    //put request of the time every second
    updateComputerTime(computer.computer_id, hours, minutes, seconds);

    //beeps when finished
    if (computer_fee > 0 && currentcomputer_fee >= computer_fee) {
      audioRef.current.play();
      setIsTimeOut(() => true);
    } else {
      setIsTimeOut(() => false);
    }
  }, [seconds]);

  return (
    <div
      className={`
    ${isTimeOut ? "border-2 border-red-300" : ""}
    grid grid-cols-4 sm:grid-cols-5 gap-4 mt-4 text-white bg-neutral-900 p-4 rounded-md
    `}
    >
      <ComputerName
        isNameSelected={isNameSelected}
        computer_name={computer_name}
        setComputer_name={setComputer_name}
        validateComputerName={() => validateComputerName(computer.computer_id)}
        selectComputerName={selectComputerName}
      />

      <ComputerTime
        isRunning={isRunning}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />

      <ComputerFee
        isFeeSelected={isFeeSelected}
        computer_fee={computer_fee}
        setComputer_fee={setComputer_fee}
        currentcomputer_fee={currentcomputer_fee}
        validateComputerFee={() => validateComputerFee(computer.computer_id)}
        selectComputerFee={selectComputerFee}
      />

      <ComputerControllers
        isRunning={isRunning}
        playTimer={playTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
        handleDelete={() => handleDelete(computer.computer_id)}
        audioRef={audioRef}
      />
    </div>
  );
};

export default ComputerItem;
