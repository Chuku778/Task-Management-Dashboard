import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AddTask = ({ onAdd, teamMembers = [] }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState("");


  const [error, setError] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!title || !status || !deadline || !assignedTo) {
      setError(true);
      return;
    }

  
    onAdd({
      id: Date.now(),
      title,
      status,
      deadline,
      assignedTo,
    });

  
    setTitle("");
    setStatus("todo");
    setDeadline("");
    setAssignedTo("");
    setError(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-aos="fade-up"
      className="mb-8 bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition"
    >
    
      {error && (
        <p className="text-red-500 mb-2 font-semibold">
          Kindly fill all fields
        </p>
      )}

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError(false);
        }}
        className={`border p-2 rounded w-full mb-2 ${
          error && !title ? "border-red-500" : ""
        }`}
      />

     
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setError(false);
        }}
        className={`border p-2 rounded w-full mb-2 ${
          error && !status ? "border-red-500" : ""
        }`}
      >
        <option value="">Select status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      
      <select
        value={assignedTo}
        onChange={(e) => {
          setAssignedTo(e.target.value);
          setError(false);
        }}
        className={`border p-2 rounded w-full mb-2 ${
          error && !assignedTo ? "border-red-500" : ""
        }`}
      >
        <option value="">Assign to team member</option>
        {teamMembers.map((member) => (
          <option key={member.id} value={member.name}>
            {member.name}
          </option>
        ))}
      </select>

      {/* Deadline */}
      <input
        type="date"
        value={deadline}
        onChange={(e) => {
          setDeadline(e.target.value);
          setError(false);
        }}
        className={`border p-2 rounded w-full mb-2 ${
          error && !deadline ? "border-red-500" : ""
        }`}
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;