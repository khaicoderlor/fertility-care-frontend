import {
  HomeIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import LogoutCompetenceButton from "../auth/LogoutCompetenceButton";

const sidebarItems = [
  {
    name: "Lịch làm việc",
    icon: HomeIcon,
    href: "/manager/schedules",
    key: "doctor-schedules",
  },
  {
    name: "Phản hồi",
    icon: DocumentTextIcon,
    href: "/manager/feedbacks",
    key: "feedbacks",
  },
  {
    name: "Bệnh nhân",
    icon: UserGroupIcon,
    href: "/manager/patients",
    key: "patients",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="h-full w-full max-w-[16rem] bg-white shadow-md flex flex-col">
      <div className="h-16 flex items-center justify-center bg-blue-600 px-4">
        <h1 className="text-xl font-bold text-white">Blog Admin</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.href);

          return (
            <>
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            </>
          );
        })}
        <LogoutCompetenceButton />
      </nav>
    </aside>
  );
}
