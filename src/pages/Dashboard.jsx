import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import AddTask from "../component/ui/AddTask";
import TaskBoard from "../component/ui/TaskBoard";
import Projects from "./Projects";

const Dashboard = ({
  tasks,
  onAdd,
  onDelete,
  onEdit,
  teamMembers,
  onAddTeamMember,
}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");


  const [error, setError] = useState(false);

 
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleAddMember = (e) => {
    e.preventDefault();

 
    if (!name || !role) {
      setError(true);
      return;
    }

    onAddTeamMember({ name, role });

  
    setName("");
    setRole("");
    setError(false);

  
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Task Management Dashboard
      </h1>

      
      <div
        data-aos="fade-up"
        className="bg-white p-5 rounded-xl shadow-md mb-6"
      >
        <h2 className="text-xl font-semibold mb-3">
          Add Team Member
        </h2>

       
        {error && (
          <p className="text-red-500 mb-2 font-semibold">
            Kindly fill all inputs
          </p>
        )}

        <form onSubmit={handleAddMember} className="flex flex-col gap-3">
          {/* Name */}
          <input
            type="text"
            placeholder="Member Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(false);
            }}
            className={`border p-2 rounded ${
              error && !name ? "border-red-500" : ""
            }`}
          />

          <input
            type="text"
            placeholder="Role (e.g. Frontend Dev)"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setError(false);
            }}
            className={`border p-2 rounded ${
              error && !role ? "border-red-500" : ""
            }`}
          />

          <button className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
            Add Member
          </button>
        </form>
      </div>

    
      <div data-aos="fade-up">
        <AddTask onAdd={onAdd} teamMembers={teamMembers} />
      </div>

   
      <div data-aos="fade-up">
        <TaskBoard tasks={tasks} onDelete={onDelete} onEdit={onEdit} />
      </div>

      <div data-aos="fade-up">
        <h2 className="text-2xl font-bold mt-8 mb-4">Projects</h2>
        <Projects tasks={tasks} />
      </div>

      
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <p className="text-lg font-semibold text-green-600">
              ✅ Team member successfully added!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;