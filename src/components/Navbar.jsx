import React from "react";
import authUserStore from "../stores/authUserStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, logoutUser } = authUserStore();
  return (
    <div className="fixed w-full flex justify-between p-3">
      <span>MasterJi's Playlist</span>
      {authUser ? (
        <div>
          <button
            onClick={logoutUser}
            className="bg-green-500 px-5 py-2 rounded-lg text-white hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to={"/login"}
          className="bg-green-500 px-5 py-2 rounded-lg text-white hover:cursor-pointer"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
