import React from "react";
import { NavLink, Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="bg-neutral-700 min-h-screen flex flex-col pb-8">
      {/* header section*/}
      <div className=" bg-neutral-900 px-5">
        {/* header content */}
        <div className="flex max-w-[40rem] m-auto justify-between gap-5 items-center py-8 text-center">
          <NavLink
            className={({ isActive }) => (isActive ? "bg-cyan-950 border-2 border-cyan-600 rounded-md py-4 w-3/6 text-white" : "bg-neutral-700 rounded-md py-4 w-3/6 text-white hover:bg-neutral-600")}
            to="/"
          >
            <div className="rounded-md">Postes</div>
          </NavLink>
          <NavLink
            to="/wifi"
            className={({ isActive }) => (isActive ? "bg-cyan-950 border-2 border-cyan-600 rounded-md py-4 w-3/6 text-white" : "bg-neutral-700 rounded-md py-4 w-3/6 text-white hover:bg-neutral-600")}
          >
            <div>Wi-fis</div>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
export default Layout;
