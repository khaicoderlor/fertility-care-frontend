interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  iconColorClass: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  items,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mb-6">
          <div className="text-white">{icon}</div>
        </div>

        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>

        <p className="text-gray-600 mb-6 text-center">{description}</p>

        <ul className="space-y-2 w-full">
          {items.map((item, index) => (
            <li key={index} className="flex items-start text-left">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center mt-0.5 mr-2">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceCard;
