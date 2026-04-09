import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaFolderOpen, FaUsers, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md p-5">
      <h2 className="text-xl font-bold mb-8 text-blue-600">TaskDash</h2>

      <nav className="space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <FaFolderOpen />
          Projects
        </NavLink>

        <NavLink
          to="/team"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <FaUsers />
          Team
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <FaCog />
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
