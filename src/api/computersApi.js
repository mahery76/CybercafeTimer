import { db } from "../lib/indexedDb";

export const getAllComputers = async () => {
  return await db.computers.toArray();
};

export const addComputer = (computerList, setComputerList) => {
  let newComputer = {
    computer_name: "",
    hours: 0,
    minutes: 0,
    seconds: 0,
    computer_description: "",
  };
  db.computers
    .add(newComputer)
    .then(() => {
      setComputerList([...computerList, newComputer]);
      console.log(computerList)
    })
    .catch((error) => {
      alert("Echec d'ajout de poste");
      console.log(error);
    });
};

export const updateComputerTime = (computer_id, hours, minutes, seconds) => {
  db.computers
  .where("computer_id").equals(computer_id)
  .modify({
    hours: hours, 
    minutes: minutes,
    seconds: seconds
  })
  .then(updated => {
    if(updated){
      console.log("time updtated succesfully")
    }
    else{
      console.log("time not updated")
    }
  })
}

export const editNameComputer = (computer_name, computer_id) => {
  console.log(computer_name, computer_id)
  db.computers
  .where("computer_id").equals(computer_id)
  .modify({computer_name: computer_name})
  .then(updated => {
    if(updated){
      console.log("updtated successfully")
    }
    else{
      console.log("no matched record")
    }
  })
  .catch(error => {
     console.error("failed", error)
  })
}

export const deleteComputer = async (computer_id,computerList, setComputerList) => {
    const confirmed = window.confirm(`Voulez-vous supprimer le poste ${computer_id}`)
    if(confirmed){
        db.computers
        .delete(computer_id)
        .then(() => {
            setComputerList(
                computerList.filter((computer => computer.computer_id !== computer_id))
            )
        })
    }
};


