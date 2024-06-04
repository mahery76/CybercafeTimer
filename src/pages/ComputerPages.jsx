import React, { useEffect, useState } from "react";
import { getAllComputers } from "../api/computersApi";
import { addComputer } from "../api/computersApi";
import { deleteComputer } from "../api/computersApi";
import ComputerItem from "../components/ComputerItem";
import { FaVoteYea } from "react-icons/fa";
function ComputerPages() {
  const [feePerMinute, setFeePerMinute] = useState(30);
  const [computerList, setComputerList] = useState([]);

  const handleAdd = () => {
    addComputer(computerList, setComputerList);
  };

  const handleDelete = (computer_id) => {
    deleteComputer(computer_id, computerList, setComputerList);
  };

  useEffect(() => {
    getAllComputers().then((data) => setComputerList(data));
  }, []);

  return (
    // computer fee per minute and add computer section
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
        <div onClick={handleAdd} className="flex w-3/6 text-white justify-center bg-neutral-900 border-2 border-green-600 px-2 py-4 rounded-md cursor-pointer hover:bg-green-950">
          Ajouter poste
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
          {computerList.map((computer) => (
            <ComputerItem
              key={computer.computer_id}
              computer={computer}
              handleDelete={handleDelete}
              feePerMinute={feePerMinute}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default ComputerPages;
