import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-600 p-4">
      <ul className="flex space-x-4 text-white">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/farm-sales" className="hover:underline">Farm Sales</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
