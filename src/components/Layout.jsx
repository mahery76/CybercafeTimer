import React, { useState } from "react";
import WifiPages from "../pages/WifiPages";
import ComputerPages from "../pages/ComputerPages";

function Layout() {
  const [isComputerPage, setIsComputerPage] = useState(true);
  return (
    <div className="bg-neutral-700 min-h-screen flex flex-col pb-8">
      {/* header section*/}
      <div className=" bg-neutral-900 px-5">
        {/* header content */}
        <div className="flex max-w-[40rem] m-auto justify-between gap-5 items-center py-8 text-center">
          <div
            className={
              isComputerPage
                ? "bg-cyan-950 border-2 border-cyan-600 rounded-md py-4 w-3/6 text-white cursor-pointer"
                : "bg-neutral-700 rounded-md py-4 w-3/6 text-white cursor-pointer hover:bg-neutral-600"
            }
            onClick={() => {
              setIsComputerPage(() => true);
            }}
          >
            <div className="rounded-md">Postes</div>
          </div>
          <div
            className={
              !isComputerPage
                ? "bg-cyan-950 border-2 border-cyan-600 rounded-md py-4 w-3/6 text-white cursor-pointer"
                : "bg-neutral-700 rounded-md py-4 w-3/6 text-white cursor-pointer hover:bg-neutral-600"
            }
            onClick={() => {
              setIsComputerPage(() => false);
            }}
          >
            <div>Wi-fis</div>
          </div>
        </div>
      </div>
      <div className={isComputerPage?"block":"hidden"}>
        <ComputerPages />
      </div>
      <div className={!isComputerPage?"block":"hidden"}>
        <WifiPages />
      </div>
    </div>
  );
}
export default Layout;
