import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const { logout, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <nav className="bg-primary p-4 text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Pegawaiku
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-90 hover:cursor-pointer hover:shadow-md"
              >
                <span>{user.name}</span>
                <MdKeyboardArrowDown
                  className={`w-4 h-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-md z-10 origin-top-right transform transition-all duration-300 ease-in-out ${
                  dropdownOpen
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible pointer-events-none"
                }`}
              >
                <button className="w-full text-left px-4 py-2 border-b border-gray-200 hover:bg-gray-100 text-sm">
                  <Link to={"/profile"} className="w-full">
                    {user.name}
                  </Link>
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-secondary rounded-full text-white hover:bg-opacity-80"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
