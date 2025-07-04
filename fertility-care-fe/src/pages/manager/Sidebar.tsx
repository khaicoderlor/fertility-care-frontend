import { HomeIcon, DocumentTextIcon, UserGroupIcon, CogIcon } from "@heroicons/react/24/outline"

const sidebarItems = [
  { name: "Trang chủ", icon: HomeIcon, href: "#", current: false },
  { name: "Quản lý Blog", icon: DocumentTextIcon, href: "#", current: true },
  { name: "Người dùng", icon: UserGroupIcon, href: "#", current: false },
  { name: "Cài đặt", icon: CogIcon, href: "#", current: false },
]

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
        <h1 className="text-xl font-bold text-white">Blog Admin</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                item.current ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </a>
          )
        })}
      </nav>
    </div>
  )
}