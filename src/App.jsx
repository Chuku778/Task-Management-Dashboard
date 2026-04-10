import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Layout from "./component/layout/Layout";
import Team from "./pages/Team";


function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // CRUDE OPERATION FOR CREATING,REMOVING,DELETING AND EDITING OF TASK
  const addTask = (task) => setTasks([...tasks, task]);

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const editTask = (id, newTitle, newStatus, newDeadline, newAssignedTo) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newTitle,
              status: newStatus,
              deadline: newDeadline,
              assignedTo: newAssignedTo,
            }
          : task,
      ),
    );
  };

  const [teamMembers, setTeamMembers] = useState(() => {
    const saved = localStorage.getItem("teamMembers");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Joy", role: "Frontend Dev" },
          { id: 2, name: "David", role: "Backend Dev" },
          { id: 3, name: "Sarah", role: "UI Designer" },
        ];
  });

  useEffect(() => {
    localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
  }, [teamMembers]);

  const addTeamMember = (member) => {
    setTeamMembers([...teamMembers, { id: Date.now(), ...member }]);
  };

  const deleteTeamMember = (id) => {
    const member = teamMembers.find((m) => m.id === id);
    setTeamMembers(teamMembers.filter((m) => m.id !== id));
    setTasks(
      tasks.map((task) =>
        task.assignedTo === member?.name ? { ...task, assignedTo: "" } : task,
      ),
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Dashboard
                tasks={tasks}
                onAdd={addTask}
                onDelete={deleteTask}
                onEdit={editTask}
                teamMembers={teamMembers}
                onAddTeamMember={addTeamMember}
                onDeleteTeamMember={deleteTeamMember}
              />
            }
          />
          <Route path="/projects" element={<Projects tasks={tasks} />} />
          <Route
            path="/team"
            element={
              <Team
                tasks={tasks}
                teamMembers={teamMembers}
                onDeleteTeamMember={deleteTeamMember}
              />
            }
          />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
