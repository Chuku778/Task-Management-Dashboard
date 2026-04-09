import { FaTasks, FaCheckCircle, FaClock } from "react-icons/fa";

const StatCard = ({ title, value, type }) => {
  const styles = {
    total: "bg-blue-100 text-blue-600",
    completed: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600",
  };

  const icons = {
    total: <FaTasks />,
    completed: <FaCheckCircle />,
    pending: <FaClock />,
  };

  return (
    <div className="flex items-center justify-between p-5 bg-white rounded-2xl shadow hover:shadow-lg transition">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>

      <div className={`p-3 rounded-full text-xl ${styles[type]}`}>
        {icons[type]}
      </div>
    </div>
  );
};

export default StatCard;
