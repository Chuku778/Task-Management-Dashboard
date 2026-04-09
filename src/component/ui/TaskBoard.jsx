import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const TaskBoard = ({ tasks, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newAssignedTo, setNewAssignedTo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const startEdit = (task) => {
    setEditingId(task.id);
    setNewTitle(task.title);
    setNewStatus(task.status);
    setNewDeadline(task.deadline || "");
    setNewAssignedTo(task.assignedTo || "");
  };

  const saveEdit = (id) => {
    onEdit(id, newTitle, newStatus, newDeadline, newAssignedTo);
    setEditingId(null);
  };

  const confirmDelete = (id) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = () => {
    onDelete(taskToDelete);
    setShowModal(false);
    setTaskToDelete(null);
  };

  const renderTasks = (taskList) => {
    return taskList.map((task) => {
      const isOverdue =
        task.deadline &&
        new Date(task.deadline) < new Date() &&
        task.status !== "completed";

      return (
        <div
          key={task.id}
          data-aos="fade-up"
          className={`bg-white p-4 mb-4 rounded-xl shadow-md hover:shadow-xl transition ${
            isOverdue ? "border-l-4 border-red-500" : ""
          }`}
        >
          {editingId === task.id ? (
            <>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="border p-2 rounded w-full mb-2"
              />

              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border p-2 rounded w-full mb-2"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <input
                type="date"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="border p-2 rounded w-full mb-2"
              />

              <input
                type="text"
                value={newAssignedTo}
                onChange={(e) => setNewAssignedTo(e.target.value)}
                className="border p-2 rounded w-full mb-2"
                placeholder="Assigned To"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => saveEdit(task.id)}
                  className="text-green-600 font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-500"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <div>
                <p className="font-semibold text-lg">{task.title}</p>

                {task.deadline && (
                  <p
                    className={`text-sm ${
                      isOverdue
                        ? "text-red-500 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    Deadline: {task.deadline}
                  </p>
                )}

                {task.assignedTo && (
                  <p className="text-sm text-gray-500">
                    Assigned to: {task.assignedTo}
                  </p>
                )}
              </div>

            
              <div className="flex flex-wrap gap-2">
                {/* Status Badge */}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    task.status === "todo"
                      ? "bg-gray-200 text-gray-700"
                      : task.status === "in-progress"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {task.status}
                </span>

                
                {task.status !== "todo" && (
                  <button
                    onClick={() =>
                      onEdit(
                        task.id,
                        task.title,
                        "todo",
                        task.deadline,
                        task.assignedTo
                      )
                    }
                    className="text-xs bg-gray-200 px-2 py-1 rounded hover:scale-105 transition"
                  >
                    To Do
                  </button>
                )}

                {task.status !== "in-progress" && (
                  <button
                    onClick={() =>
                      onEdit(
                        task.id,
                        task.title,
                        "in-progress",
                        task.deadline,
                        task.assignedTo
                      )
                    }
                    className="text-xs bg-yellow-200 px-2 py-1 rounded hover:scale-105 transition"
                  >
                    In Progress
                  </button>
                )}

                {task.status !== "completed" && (
                  <button
                    onClick={() =>
                      onEdit(
                        task.id,
                        task.title,
                        "completed",
                        task.deadline,
                        task.assignedTo
                      )
                    }
                    className="text-xs bg-green-200 px-2 py-1 rounded hover:scale-105 transition"
                  >
                    Done
                  </button>
                )}

          
                <button
                  onClick={() => startEdit(task)}
                  className="text-blue-500 text-sm font-semibold"
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => confirmDelete(task.id)}
                  className="text-red-500 text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  const todo = tasks.filter((t) => t.status === "todo");
  const inProgress = tasks.filter((t) => t.status === "in-progress");
  const completed = tasks.filter((t) => t.status === "completed");

  return (
    <div className="mt-6">
      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mb-6">
          No tasks yet. Start by adding one!
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h2 className="font-semibold mb-3">To Do ({todo.length})</h2>
          {renderTasks(todo)}
        </div>

        <div>
          <h2 className="font-semibold mb-3">
            In Progress ({inProgress.length})
          </h2>
          {renderTasks(inProgress)}
        </div>

        <div>
          <h2 className="font-semibold mb-3">
            Completed ({completed.length})
          </h2>
          {renderTasks(completed)}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="mb-4 font-semibold">
              Are you sure you want to delete this task? This cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;