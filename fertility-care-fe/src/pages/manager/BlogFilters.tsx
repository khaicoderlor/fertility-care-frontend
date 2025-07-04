import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { BlogStatus } from "../../constants/BlogTypes";


interface BlogFiltersProps {
  searchTerm: string
  setSearchTerm: (val: string) => void
  statusFilter: BlogStatus | "all"
  setStatusFilter: (val: BlogStatus | "all") => void
}

export default function BlogFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: BlogFiltersProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm blog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {/* Status Filter */}
        <div className="relative">
          <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as BlogStatus | "all")}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value={BlogStatus.Published}>Đã xuất bản</option>
            <option value={BlogStatus.Process}>Đang xử lý</option>
            <option value={BlogStatus.Draft}>Bản nháp</option>
            <option value={BlogStatus.Archived}>Đã lưu trữ</option>
          </select>
        </div>
      </div>
    </div>
  )
}