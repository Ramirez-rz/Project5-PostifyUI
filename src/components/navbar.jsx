import { NavLink } from "react-router";
import { FiHome } from "react-icons/fi";

const Navbar = ({ children }) => {
  const getLinkClass = ({ isActive }) =>
    `rounded px-3 py-2 ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`;

  return (
    <div className="bg-white text-gray-900">
      <div className="border-b border-gray-300 bg-white">
        <div className='mx-auto flex h-12 max-w-md items-center justify-around px-4 text-sm font-medium'>
          <NavLink className={getLinkClass} to="/"><FiHome className='h-6 w-6'/></NavLink>
          <NavLink className={getLinkClass} to="/profile/67b12543-ecbb-478c-99ce-ebfcf357e589">Profile</NavLink>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Navbar;
