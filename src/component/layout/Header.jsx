import { Menu } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between">
      
   
      <button
        onClick={toggleSidebar}
        className="md:hidden text-2xl"
      >
        <Menu />
      </button>

      <h1 className="font-bold text-lg">Task Manager</h1>
    </div>
  );
};

export default Header;
