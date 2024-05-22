import { db } from "../lib/indexedDb";

export const getAllComputers = async () => {
  return await db.computers.toArray();
};

export const addComputer = (terminalList, setTerminalList) => {
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
      setTerminalList([...terminalList, newComputer]);
      console.log(terminalList)
    })
    .catch((error) => {
      alert("Echec d'ajout de poste");
      console.log(error);
    });
};

export const editNameComputer = (computer_name, computers_id) => {
  console.log(computer_name, computers_id)
  db.computers
  .where("computers_id").equals(computers_id)
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

export const deleteComputer = async (computers_id,terminalList, setTerminalList) => {
    const confirmed = window.confirm(`Voulez-vous supprimer le poste ${computers_id}`)
    if(confirmed){
        db.computers
        .delete(computers_id)
        .then(() => {
            setTerminalList(
                terminalList.filter((terminal => terminal.computers_id !== computers_id))
            )
        })
    }
};

