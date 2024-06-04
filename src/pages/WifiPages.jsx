import React, { useEffect, useState } from "react";
import { getAllWifis } from "../api/wifisApi";
import { addWifi } from "../api/wifisApi";
import { deleteWifi } from "../api/wifisApi";
import WifiItem from "../components/WifiItem";

function WifiPages() {

  const [feePerMinute, setFeePerMinute] = useState(30);
  const [wifisList, setWifisList] = useState([]);
  const handleAdd = () => {
    addWifi(wifisList, setWifisList);
  };

  const handleDelete = (wifi_id) => {
    deleteWifi(wifi_id, wifisList, setWifisList);
  };

  useEffect(() => {
    getAllWifis().then((data) => setWifisList(data));
  }, []);

  return (
    // wifi fee per minute and add wifi section
    <div className="px-5 flex flex-col items-center">
      {/* fee per minute and the  */}
      <div className="flex w-full max-w-[40rem] justify-between gap-5 items-center py-8">
        <div className="flex flex-col items-center gap-3 sm:flex-row w-3/6 rounded-md">
          <div className="text-white text-center italic w-[130px]">Prix à la minute:</div>
          <div className=" w-[130px] flex gap-4">
            <input
              type="number"
              className="rounded-md w-full text-white text-center border-[1px] border-white bg-neutral-950"
              value={feePerMinute}
              onChange={(e) => setFeePerMinute(e.target.value)}
            />
            <div className="text-white text-center flex items-center">
              Ar
            </div>
          </div>
        </div>
        <div onClick={handleAdd} className="flex w-3/6 text-white justify-center border-2 border-green-600 px-2 py-4 rounded-md cursor-pointer bg-green-950 hover:bg-green-900">
          Ajouter Wi-fi
        </div>
      </div>

      <div className="mx-1 max-w-[40rem] flex flex-col max-h-[50vh] ">
        <div className="text-white text-center grid grid-cols-4 sm:grid-cols-5 gap-4 ">
          <div>Nom</div>
          <div>Temps</div>
          <div>Argent</div>
          <div></div>
          <div></div>
        </div>
        <div className="overflow-auto">
          {wifisList.map((wifi) => (
            <WifiItem
              key={wifi.wifi_id}
              wifi={wifi}
              handleDelete={handleDelete}
              feePerMinute={feePerMinute}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WifiPages