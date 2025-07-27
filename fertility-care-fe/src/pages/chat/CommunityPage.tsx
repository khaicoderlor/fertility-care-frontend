/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  MessageCircle,
  Heart,
  Baby,
  MapPin,
  Calendar,
  Send,
  X,
  ArrowLeft,
  MoreVertical,
  Users,
  Star,
} from "lucide-react"
import { ORDER_CANCELLED, ORDER_COMPLETED, ORDER_PROGRESS } from '../../constants/OrderStatus';

interface User {
  id: string
  name: string
  age: number
  location: string
  treatmentType: "IVF" | "IUI" | "Both"
  treatmentStatus: "Ongoing" | "Successful" | "Completed"
  joinedDate: string
  bio: string
  avatar: string
  isOnline: boolean
  successStory?: string
  treatmentRounds: number
  supportOffered: string[]
  mutualConnections?: number
}

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  read: boolean
}

interface Chat {
  id: string
  participants: User[]
  lastMessage?: Message
  messages: Message[]
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    age: 32,
    location: "New York, NY",
    treatmentType: "IVF",
    treatmentStatus: "Successful",
    joinedDate: "2023-01-15",
    bio: "After 3 years of trying, we found success with IVF. Happy to share hope and practical tips with others on this journey.",
    avatar: "/placeholder.svg?height=60&width=60",
    isOnline: true,
    successStory: "Our little miracle arrived after our second IVF cycle. The journey was challenging but so worth it.",
    treatmentRounds: 2,
    supportOffered: ["Emotional Support", "IVF Tips", "Success Stories"],
    mutualConnections: 3,
  },
  {
    id: "2",
    name: "Emily Chen",
    age: 29,
    location: "San Francisco, CA",
    treatmentType: "IUI",
    treatmentStatus: "Ongoing",
    joinedDate: "2023-06-20",
    bio: "Currently on my 4th IUI cycle. Looking for others who understand this journey and can offer encouragement.",
    avatar: "/placeholder.svg?height=60&width=60",
    isOnline: false,
    treatmentRounds: 4,
    supportOffered: ["IUI Experience", "Emotional Support", "Lifestyle Tips"],
    mutualConnections: 1,
  },
  {
    id: "3",
    name: "Michael & Lisa",
    age: 35,
    location: "Chicago, IL",
    treatmentType: "Both",
    treatmentStatus: "Successful",
    joinedDate: "2022-11-10",
    bio: "We tried both IUI and IVF. Now proud parents of twins! Here to offer hope and practical advice.",
    avatar: "/placeholder.svg?height=60&width=60",
    isOnline: true,
    successStory: "After 6 IUI attempts, we switched to IVF and were blessed with twins on our first try.",
    treatmentRounds: 7,
    supportOffered: ["Both IUI & IVF", "Success Stories", "Partner Support"],
    mutualConnections: 5,
  },
  {
    id: "4",
    name: "Amanda Rodriguez",
    age: 28,
    location: "Austin, TX",
    treatmentType: "IVF",
    treatmentStatus: "Ongoing",
    joinedDate: "2023-09-05",
    bio: "Starting my second IVF cycle next month. Would love to connect with others in similar situations.",
    avatar: "/placeholder.svg?height=60&width=60",
    isOnline: true,
    treatmentRounds: 1,
    supportOffered: ["IVF Journey", "Emotional Support", "Wellness Tips"],
    mutualConnections: 2,
  },
  {
    id: "5",
    name: "Jennifer Wilson",
    age: 34,
    location: "Seattle, WA",
    treatmentType: "IUI",
    treatmentStatus: "Completed",
    joinedDate: "2023-03-12",
    bio: "Completed 5 IUI cycles. Now focusing on next steps and supporting others through their journey.",
    avatar: "/placeholder.svg?height=60&width=60",
    isOnline: false,
    treatmentRounds: 5,
    supportOffered: ["IUI Experience", "Next Steps Planning", "Emotional Support"],
    mutualConnections: 4,
  },
  {
    id: "6",
    name: "David Kim",
    age: 36,
    location: "Los Angeles, CA",
    treatmentType: "IVF",
    treatmentStatus: "Successful",
    joinedDate: "2022-08-20",
    bio: "Male perspective on fertility journey. Successful IVF after 2 years. Here to support other couples.",
    avatar: "/placeholder.svg?height=60&width=60",
    isOnline: true,
    successStory: "Our daughter arrived after our third IVF cycle. Persistence and support made all the difference.",
    treatmentRounds: 3,
    supportOffered: ["Male Perspective", "IVF Tips", "Partner Support"],
    mutualConnections: 2,
  },
]

export default function CommunityPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTreatment, setSelectedTreatment] = useState<string>("All")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [currentUserId] = useState("current-user")

  useEffect(() => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.bio.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedTreatment !== "All") {
      filtered = filtered.filter((user) => user.treatmentType === selectedTreatment || user.treatmentType === "Both")
    }

    if (selectedStatus !== "All") {
      filtered = filtered.filter((user) => user.treatmentStatus === selectedStatus)
    }

    setFilteredUsers(filtered)
  }, [searchTerm, selectedTreatment, selectedStatus, users])

  const startChat = (user: User) => {
    const existingChat = chats.find((chat) => chat.participants.some((p) => p.id === user.id))

    if (existingChat) {
      setActiveChat(existingChat)
    } else {
      const newChat: Chat = {
        id: `chat-${Date.now()}`,
        participants: [user],
        messages: [],
      }
      setChats([...chats, newChat])
      setActiveChat(newChat)
    }
    setShowChat(true)
  }

  const sendMessage = () => {
    if (!messageInput.trim() || !activeChat) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      receiverId: activeChat.participants[0].id,
      content: messageInput,
      timestamp: new Date(),
      read: false,
    }

    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, newMessage],
      lastMessage: newMessage,
    }

    setChats(chats.map((chat) => (chat.id === activeChat.id ? updatedChat : chat)))
    setActiveChat(updatedChat)
    setMessageInput("")
  }

  const getTreatmentBadgeColor = (type: string) => {
    switch (type) {
      case "IVF":
        return "bg-rose-50 text-rose-600"
      case "IUI":
        return "bg-blue-50 text-blue-600"
      case "Both":
        return "bg-emerald-50 text-emerald-600"
      default:
        return "bg-gray-50 text-gray-600"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case ORDER_COMPLETED:
        return "bg-emerald-50 text-emerald-600"
      case ORDER_PROGRESS:
        return "bg-amber-50 text-amber-600"
      case ORDER_CANCELLED:
        return "bg-blue-50 text-blue-600"
      default:
        return "bg-gray-50 text-gray-600"
    }
  }

  if (showChat && activeChat) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white min-h-screen shadow-sm">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
            <button onClick={() => setShowChat(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3 flex-1">
              <div className="relative">
                <img
                  src={activeChat.participants[0].avatar || "/placeholder.svg"}
                  alt={activeChat.participants[0].name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {activeChat.participants[0].isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{activeChat.participants[0].name}</h3>
                <p className="text-sm text-gray-500">{activeChat.participants[0].isOnline ? "Online" : "Offline"}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 px-6 py-4 space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto">
            {activeChat.messages.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Start a conversation with {activeChat.participants[0].name}</p>
                <p className="text-sm text-gray-500">This is a safe space for sharing experiences and support</p>
              </div>
            ) : (
              activeChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === currentUserId ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === currentUserId ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.senderId === currentUserId ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                disabled={!messageInput.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tìm cộng đồng hỗ trợ</h1>
              <p className="text-gray-600">Kết nối với những cộng đồng để chia sẻ những khoảng khắc trong hành trình IVF & IUI</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Bộ lọc
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={selectedTreatment}
                onChange={(e) => setSelectedTreatment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">Tất cả dịch vụ</option>
                <option value="IVF">IVF</option>
                <option value="IUI">IUI</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">Tất cả trạng thái</option>
                <option value="Closed">Đã đóng</option>
                <option value="InProgress">Đang thực hiện</option>
                <option value="Completed">Hoàn thành</option>
              </select>
            </div>
          )}
        </div>

        {/* People List */}
        <div className="bg-white rounded-l  g shadow-sm border border-gray-200 divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                        <MapPin className="w-4 h-4" />
                        {user.location}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getTreatmentBadgeColor(user.treatmentType)}`}
                        >
                          {user.treatmentType}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(user.treatmentStatus)}`}
                        >
                          {user.treatmentStatus}
                        </span>
                        {user.treatmentStatus === "Successful" && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{user.bio}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {user.treatmentRounds} rounds
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Joined{" "}
                          {new Date(user.joinedDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </span>
                        {user.mutualConnections && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {user.mutualConnections} mutual connections
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => startChat(user)}
                        className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No people found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedTreatment("All")
                setSelectedStatus("All")
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* User Profile Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={selectedUser.avatar || "/placeholder.svg"}
                        alt={selectedUser.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      {selectedUser.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                      <div className="flex items-center gap-1 text-gray-500 mb-2">
                        <MapPin className="w-4 h-4" />
                        {selectedUser.location}
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${getTreatmentBadgeColor(selectedUser.treatmentType)}`}
                        >
                          {selectedUser.treatmentType}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(selectedUser.treatmentStatus)}`}
                        >
                          {selectedUser.treatmentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-gray-100 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-gray-600">{selectedUser.bio}</p>
                  </div>

                  {selectedUser.supportOffered && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Support Offered</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.supportOffered.map((support, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                            {support}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="font-medium">Rounds</span>
                      </div>
                      <p className="text-xl font-bold text-gray-900">{selectedUser.treatmentRounds}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">Joined</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(selectedUser.joinedDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {selectedUser.successStory && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Baby className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">Success Story</span>
                      </div>
                      <p className="text-sm text-green-700">{selectedUser.successStory}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        startChat(selectedUser)
                        setSelectedUser(null)
                      }}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Start Conversation
                    </button>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
