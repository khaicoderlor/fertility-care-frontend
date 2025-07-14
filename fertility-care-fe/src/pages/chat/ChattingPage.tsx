"use client";

import { useState } from "react";
import {
  Search,
  Phone,
  Video,
  MoreHorizontal,
  Send,
  Smile,
} from "lucide-react";
import { IoMdCloudUpload } from "react-icons/io";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  avatar?: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey! How are you doing today?",
    timestamp: "2m ago",
    unreadCount: 2,
    isOnline: true,
    messages: [
      {
        id: "1",
        text: "Hey! How are you doing today?",
        timestamp: "2:30 PM",
        isOwn: false,
      },
      {
        id: "2",
        text: "I'm doing great! Just finished my morning workout.",
        timestamp: "2:32 PM",
        isOwn: true,
      },
      {
        id: "3",
        text: "That's awesome! What kind of workout did you do?",
        timestamp: "2:33 PM",
        isOwn: false,
      },
    ],
  },
  {
    id: "2",
    name: "Mike Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can we schedule a meeting for tomorrow?",
    timestamp: "1h ago",
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: "1",
        text: "Can we schedule a meeting for tomorrow?",
        timestamp: "1:15 PM",
        isOwn: false,
      },
      {
        id: "2",
        text: "What time works best for you?",
        timestamp: "1:20 PM",
        isOwn: true,
      },
    ],
  },
  {
    id: "3",
    name: "Emma Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for your help with the project!",
    timestamp: "3h ago",
    unreadCount: 1,
    isOnline: true,
    messages: [
      {
        id: "1",
        text: "Thanks for your help with the project!",
        timestamp: "11:45 AM",
        isOwn: false,
      },
      {
        id: "2",
        text: "You're welcome! Happy to help anytime.",
        timestamp: "11:50 AM",
        isOwn: true,
      },
      {
        id: "3",
        text: "The client loved the final presentation!",
        timestamp: "12:00 PM",
        isOwn: false,
      },
    ],
  },
  {
    id: "4",
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Let's grab coffee sometime this week",
    timestamp: "1d ago",
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: "1",
        text: "Let's grab coffee sometime this week",
        timestamp: "Yesterday 4:30 PM",
        isOwn: false,
      },
      {
        id: "2",
        text: "Sounds great! How about Wednesday afternoon?",
        timestamp: "Yesterday 4:35 PM",
        isOwn: true,
      },
    ],
  },
  {
    id: "5",
    name: "Lisa Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The design looks fantastic!",
    timestamp: "2d ago",
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: "1",
        text: "The design looks fantastic!",
        timestamp: "Monday 2:15 PM",
        isOwn: false,
      },
      {
        id: "2",
        text: "Thank you! I'm really happy with how it turned out.",
        timestamp: "Monday 2:20 PM",
        isOwn: true,
      },
    ],
  },
];

export default function MessengerApp() {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(mockConversations[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = mockConversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
    };

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
    };

    setSelectedConversation(updatedConversation);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900 mb-3">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation?.id === conversation.id
                  ? "bg-blue-50 border-blue-200"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={conversation.avatar || "/placeholder.svg"}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area (Outlet) */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={selectedConversation.avatar || "/placeholder.svg"}
                    alt={selectedConversation.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedConversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    {selectedConversation.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedConversation.isOnline
                      ? "Active now"
                      : "Last seen recently"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                      message.isOwn ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    {!message.isOwn && (
                      <img
                        src={selectedConversation.avatar || "/placeholder.svg"}
                        alt={selectedConversation.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.isOwn
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="uploadFile1"
                  className="flex bg-gray-800 hover:bg-gray-700 text-white text-base font-medium px-2 py-2 outline-none rounded-2xl w-max cursor-pointer mx-auto"
                >
                  <IoMdCloudUpload className="w-6 h-5"/> 
                  <input type="file" id="uploadFile1" className="hidden" />
                </label>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 rounded-full transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No conversation selected
              </h3>
              <p className="text-gray-500">
                Choose a conversation from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
