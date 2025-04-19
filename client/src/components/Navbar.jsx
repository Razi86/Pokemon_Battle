import React from "react";
import logo from "../assets/images/logo/logo.png";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar w-full max-w-[1600px] fixed top-0 bg-white shadow-sm px-[5rem] py-[1rem]">
      <div className="flex-1">
        <NavLink to={`/`} className="logo w-[5rem] text-red-600 text-xl">
          <figure className="w-[5rem]">
            <img src={logo} alt="" />
          </figure>
        </NavLink>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input text-blue-900 font-medium tracking-[1px] bg-transparent input-bordered rounded-full border-blue-800 outline-0 w-[20rem] "
        />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1730732566~exp=1730736166~hmac=f00212fd96ce5c96daa11d1f0acc6dadb08153181ec840f3cbe9d87d594bd4b4&w=740"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content text-white bg-blue-900 rounded-box z-1 mt-3 w-92 p-2 shadow"
          >
            <li className="text-[1rem]">
              <NavLink className="justify-between">
                Profile
                <span className="badge bg-blue-700">New</span>
              </NavLink>
            </li>
            <li className="text-[1rem]">
              <NavLink>Settings</NavLink>
            </li>
            <li className="text-[1rem]">
              <NavLink>Register</NavLink>
            </li>
            <li className="text-[1rem]">
              <NavLink>Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
