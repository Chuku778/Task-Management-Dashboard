import ProjectCard from "./ProjectCard";

function Column({ title, tasks }) {
  return (
    <div>
      <h2 className="font-semibold mb-3">{title}</h2>

      <div className="space-y-4">
        {tasks.map((task, i) => (
          <ProjectCard key={i} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Column;