import { db } from "../lib/indexedDb";

export const getAllWifis = async () => {
  return await db.wifis.toArray();
};

export const addWifi = (wifisList, setWifisList) => {
  let newWifi = {
    wifi_name: "",
    hours: 0,
    minutes: 0,
    seconds: 0,
    wifi_fee: 0,
    wifi_description: "",
  };
  db.wifis
    .add(newWifi)
    .then(() => {
      setWifisList([...wifisList, newWifi]);
      console.log(wifisList)
    })
    .catch((error) => {
      alert("Echec d'ajout de wifi");
      console.log(error);
    });
};

export const updateWifiTime = (wifi_id, hours, minutes, seconds) => {
  db.wifis
  .where("wifi_id").equals(wifi_id)
  .modify({
    hours: hours, 
    minutes: minutes,
    seconds: seconds
  })
}

export const editWifiName = (wifi_name, wifi_id) => {
  db.wifis
  .where("wifi_id").equals(wifi_id)
  .modify({wifi_name: wifi_name})
}

export const editWifiFee = (wifi_fee, wifi_id) => {
  db.wifis
  .where("wifi_id").equals(wifi_id)
  .modify({wifi_fee: Number(wifi_fee)})
}


export const deleteWifi = async (wifi_id, wifisList, setWifisList) => {
    const confirmed = window.confirm(`Voulez-vous supprimer ce wifi`)
    if(confirmed){
        db.wifis
        .delete(wifi_id)
        .then(() => {
            setWifisList(
                wifisList.filter((wifi => wifi.wifi_id !== wifi_id))
            )
        })
    }
};


