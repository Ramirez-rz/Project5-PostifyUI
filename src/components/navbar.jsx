import { NavLink } from "react-router";
import { FiHome } from "react-icons/fi";

const Navbar = ({ children }) => {
  const getLinkClass = ({ isActive }) =>
    `flex min-w-24 items-center justify-center rounded-md px-4 py-2 transition ${isActive ? "bg-black text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}`;

  return (
    <div className="border-t border-gray-200 bg-white text-gray-900 shadow-sm">
      <div>
        <div className='mx-auto flex h-16 max-w-md items-center justify-around px-4 text-sm font-medium'>
          <NavLink end className={getLinkClass} to="/"><FiHome className='h-5 w-5'/></NavLink>
          <NavLink className={getLinkClass} to="/profile/0927a56d-091b-441d-be4c-f05fb1bf852a">Profile</NavLink>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Navbar;
