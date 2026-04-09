const Team = ({ tasks = [], teamMembers = [], onDeleteTeamMember }) => {
  const getTaskCount = (name) => tasks.filter((task) => task.assignedTo === name).length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Team Members</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
                {member.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-semibold text-lg">{member.name}</h2>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
            <div className="mt-2 text-gray-600 flex justify-between items-center">
              <span>Tasks Assigned: <strong>{getTaskCount(member.name)}</strong></span>
              <button
                className="text-red-500 text-sm"
                onClick={() => onDeleteTeamMember(member.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
