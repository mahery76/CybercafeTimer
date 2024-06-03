import React from "react";
import { NavLink, Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="flex flex-col justify-center items-center bg-neutral-700">
      <div className="max-w-[40rem]">
        <div className="flex bg-neutral-950">
          <NavLink
            className={({ isActive }) => (isActive ? "bg-red-100" : "")}
            to="/"
          >
            <div>Postes</div>
          </NavLink>
          <NavLink
            to="/wifi"
            className={({ isActive }) => (isActive ? "bg-red-100" : "")}
          >
            <div>Wifi</div>
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
export default Layout;


