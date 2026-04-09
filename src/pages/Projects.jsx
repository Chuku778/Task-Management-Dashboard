import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Projects = ({ tasks = [] }) => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const todo = tasks.filter((t) => t.status === "todo").length;


  const groupedProjects = tasks.reduce((acc, task) => {
    const projectName = task.project || "General";

    if (!acc[projectName]) {
      acc[projectName] = [];
    }

    acc[projectName].push(task);
    return acc;
  }, {});

  const projectNames = Object.keys(groupedProjects);

  return (
    <div className="p-4">

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div
          data-aos="fade-up"
          className="bg-white p-4 rounded-xl shadow-md text-center"
        >
          <h2 className="text-gray-500">Total Tasks</h2>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="bg-white p-4 rounded-xl shadow-md text-center"
        >
          <h2 className="text-gray-500">To Do</h2>
          <p className="text-2xl font-bold text-gray-700">{todo}</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="bg-white p-4 rounded-xl shadow-md text-center"
        >
          <h2 className="text-gray-500">Completed</h2>
          <p className="text-2xl font-bold text-green-600">
            {completed}
          </p>
        </div>
      </div>

     
      {projectNames.length === 0 ? (
        <p className="text-gray-500 text-center">
          No projects yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectNames.map((projectName, index) => {
            const projectTasks = groupedProjects[projectName];

            const done = projectTasks.filter(
              (t) => t.status === "completed"
            ).length;

            const progress = Math.round(
              (done / projectTasks.length) * 100
            );

            return (
              <div
                key={projectName}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <h2 className="font-semibold mb-3">
                  {projectName}
                </h2>

              
                <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <p className="text-sm text-gray-500">
                  {done} / {projectTasks.length} completed
                </p>

              
                <div className="mt-3 space-y-1">
                  {projectTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className="flex justify-between text-sm"
                    >
                      <span>{task.title}</span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          task.status === "todo"
                            ? "bg-gray-200"
                            : task.status === "in-progress"
                            ? "bg-yellow-200"
                            : "bg-green-200"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Projects;