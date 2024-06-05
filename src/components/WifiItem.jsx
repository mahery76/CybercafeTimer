import React, { useEffect, useRef, useState } from "react";
import { updateWifiTime, editWifiName, editWifiFee } from "../api/wifisApi";
import { BsTrash } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import { FaRegCirclePause } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import bipsong from "../assets/beepb.wav";

const WifiName = ({
  isNameSelected,
  wifi_name,
  setWifi_name,
  validateWifiName,
  selectWifiName,
}) => {
  return (
    <div className="flex gap-2 items-center ">
      {/* wifi name input and wifi name */}
      <div className="w-5/6 cursor-pointer text-center">
        <div className={isNameSelected ? "hidden" : "block"}>
          <input
            value={wifi_name}
            readOnly
            className="rounded-md w-full text-white text-center bg-neutral-900"
          />
        </div>
        <div className={isNameSelected ? "block" : "hidden"}>
          <input
            className="rounded-md w-full text-white text-center border-[1px] border-white bg-neutral-950"
            type="text"
            value={wifi_name}
            onChange={(e) => setWifi_name(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                validateWifiName();
              }
            }}
          />
        </div>
      </div>
      {/* edit and validate wifi name controllers */}
      <div className="w-1/6 cursor-pointer flex justify-center items-center">
        <div
          className={`${isNameSelected ? "hidden" : "block"}`}
          onClick={() => selectWifiName()}
        >
          <FaLock />
        </div>
        <div
          className={isNameSelected ? "block" : "hidden"}
          onClick={() => validateWifiName()}
        >
          <FaLockOpen />
        </div>
      </div>
    </div>
  );
};

const WifiTime = ({ hours, minutes, seconds }) => {
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

const WifiFee = ({
  isFeeSelected,
  wifi_fee,
  setWifi_fee,
  currentwifi_fee,
  validateWifiFee,
  selectWifiFee,
}) => {
  return (
    <>
      {/* wifi fee input and wifi fee */}
      <div className="flex gap-2 items-center ">
        <div className="w-5/6 cursor-pointer text-center">
          <div className={isFeeSelected ? "hidden" : "block"}>
            <input
              readOnly
              value={wifi_fee}
              className="rounded-md w-full text-white text-center bg-neutral-900"
            />
          </div>
          <div className={isFeeSelected ? "block" : "hidden"}>
            <input
              className="rounded-md w-full text-white text-center border-[1px] border-white bg-neutral-950"
              type="number"
              value={wifi_fee}
              onChange={(e) => setWifi_fee(() => e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  validateWifiFee();
                }
              }}
            />
          </div>
        </div>
        {/* edit and validate wifi fee controllers */}
        <div className="w-1/6 cursor-pointer flex justify-center items-center">
          <div
            className={`${isFeeSelected ? "hidden" : "block"}`}
            onClick={() => selectWifiFee()}
          >
            <FaLock />
          </div>
          <div
            className={isFeeSelected ? "block" : "hidden"}
            onClick={() => validateWifiFee()}
          >
            <FaLockOpen />
          </div>
        </div>
      </div>

      {/* current wifi fee */}
      <div className="flex items-center justify-end gap-2">
        <span>{currentwifi_fee}</span>
        <span>Ar</span>
      </div>
    </>
  );
};

const WifiControllers = ({
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

function WifiItem({ wifi, handleDelete, feePerMinute }) {
  const [isNameSelected, setIsNameSelected] = useState(true);
  const [wifi_name, setWifi_name] = useState(wifi.wifi_name);
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [hours, setHours] = useState(wifi.hours);
  const [minutes, setMinutes] = useState(wifi.minutes);
  const [seconds, setSeconds] = useState(wifi.seconds);
  const [isFeeSelected, setIsFeeSelected] = useState(true);
  const [wifi_fee, setWifi_fee] = useState(wifi.wifi_fee);
  const currentwifi_fee = feePerMinute * minutes;
  const [isTimeOut, setIsTimeOut] = useState(false);
  const audioRef = useRef(null);
  const [audio, setAudio] = useState(null);

  const validateWifiName = (wifi_id) => {
    setIsNameSelected(() => false);
    editWifiName(wifi_name, wifi_id);
  };
  const selectWifiName = () => {
    setIsNameSelected(() => true);
  };
  const validateWifiFee = (wifi_id) => {
    setIsFeeSelected(() => false);
    editWifiFee(wifi_fee, wifi_id);
  };

  const selectWifiFee = () => {
    setIsFeeSelected(() => true);
  };

  const playTimer = () => {
    setIsRunning(() => true);
  };

  const pauseTimer = () => {
    setIsRunning(() => false);
    audio.pause();
  };
  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setIsTimeOut(() => false);
  };
  useEffect(() => {
    const _audio = new Audio(bipsong);
    _audio.load();
    _audio.addEventListener("canplaythrough", () => {
      console.log("loaded audio");
      setAudio(_audio);
    });
  }, []);
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
    updateWifiTime(wifi.wifi_id, hours, minutes, seconds);

    //beeps when finished
    if (wifi_fee > 0 && currentwifi_fee >= wifi_fee) {
      audio.play();
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
      <WifiName
        isNameSelected={isNameSelected}
        wifi_name={wifi_name}
        setWifi_name={setWifi_name}
        validateWifiName={() => validateWifiName(wifi.wifi_id)}
        selectWifiName={selectWifiName}
      />

      <WifiTime
        isRunning={isRunning}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />

      <WifiFee
        isFeeSelected={isFeeSelected}
        wifi_fee={wifi_fee}
        setWifi_fee={setWifi_fee}
        currentwifi_fee={currentwifi_fee}
        validateWifiFee={() => validateWifiFee(wifi.wifi_id)}
        selectWifiFee={selectWifiFee}
      />

      <WifiControllers
        isRunning={isRunning}
        playTimer={playTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
        handleDelete={() => handleDelete(wifi.wifi_id)}
        audioRef={audioRef}
      />
    </div>
  );
}

export default WifiItem;
