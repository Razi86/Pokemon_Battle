import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/images/logo/logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout, handleSearch } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar w-full max-w-[1600px] fixed top-0 bg-white shadow-sm px-[5rem] py-[1rem] z-50">
      <div className="flex-1 flex items-center gap-2">
        <NavLink to={`/`} className="logo w-[5rem] text-red-600 text-xl">
          <figure className="w-[5rem]">
            <img src={logo} alt="Logo" />
          </figure>
        </NavLink>
        {user && (
          <div className="flex items-center gap-2">
            <p className="text-[1.2rem] text-blue-900 font-medium tracking-[1px] ml-5">
              Welcome{" "}
              <span className=" font-normal ">
                {user.first_name} {user.last_name}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="links flex items-center gap-5 mr-5">
          <NavLink
            to="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
            className="text-blue-900 font-medium tracking-[1px]"
          >
            Home
          </NavLink>
          <NavLink
            to="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/battle";
            }}
            className="text-blue-900 font-medium tracking-[1px]"
          >
            Battle
          </NavLink>
          <NavLink
            to="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/roster";
            }}
            className="text-blue-900 font-medium tracking-[1px]"
          >
            Roster
          </NavLink>
          {user && (
            <NavLink
              to="/leaderboard"
              className="text-blue-900 font-medium tracking-[1px]"
            >
              Leaderboard
            </NavLink>
          )}
        </div>

        <input
          type="text"
          placeholder="Search"
          className="input text-blue-900 font-medium tracking-[1px] bg-transparent input-bordered rounded-full border-blue-800 outline-0 w-[20rem]"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1730732566~exp=1730736166~hmac=f00212fd96ce5c96daa11d1f0acc6dadb08153181ec840f3cbe9d87d594bd4b4&w=740"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content text-white bg-blue-900 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {user ? (
              <>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/leaderboard">Leaderboard</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
