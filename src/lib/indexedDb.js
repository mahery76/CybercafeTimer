import Dexie from "dexie";

const defaultComputers = [
  {
    computer_name: "Poste 1",
    hours: 0,
    minutes: 0,
    seconds: 0,
    computer_fee: 0,
    computer_description: ""
  },
  {
    computer_name: "Poste 2",
    hours: 0,
    minutes: 0,
    seconds: 0,
    computer_fee: 0,
    computer_description: ""
  },
  {
    computer_name: "Poste 3",
    hours: 0,
    minutes: 0,
    seconds: 0,
    computer_fee: 0, 
    computer_description: ""
  },
  {
    computer_name: "Poste 4",
    hours: 0,
    minutes: 0,
    seconds: 0,
    computer_fee: 0,
    computer_description: ""
  },
];

const defaultWifis = [
  {
    computer_name: "Wifi",
    hours: 0,
    minutes: 0,
    seconds: 0,
    wifiFee: 0,
    computer_description: ""
  }
];
export const db = new Dexie("cybercafedb");
db.version(1).stores({
  wifis: "++wifi_id, wifi_name, hours, minutes, seconds, wifiFee, wifi_description",
  computers: "++computer_id, computer_name, hours, minutes, seconds, computer_fee, computer_description",
});
db.on("populate", () => {
  db.computers.bulkAdd(defaultComputers);
  db.wifis.bulkAdd(defaultWifis)
});
db.open().catch(function(error) {
    console.error("Open failed: " + error)
})