import { Link } from "react-router";

const Navbar = ({ children }) => {
  return (
    <div>
      <div>
        <div className='h-[30px] bg-blue-500 flex gap-20'>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/profile/1">Profile</Link></p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Navbar;
