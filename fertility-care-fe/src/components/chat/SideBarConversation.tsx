"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { ChatBox } from "./ChatBox";
import {
  DEFAULT_AVATAR,
  ROLE_DOCTOR,
} from "../../constants/ApplicationConstant";
import { useAuth } from "../../contexts/AuthContext";
import axiosSocketInstance from "../../apis/AxiosSocketInstance";

export interface ConversationSideBar {
  id: string;
  receiverId: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverRole: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export default function MessengerApp() {
  const { currentUserId } = useAuth();
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationSideBar | null>();
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState<ConversationSideBar[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axiosSocketInstance.get(
          `/chat/conversations-sides/${currentUserId}`
        );
        const res = response.data;

        setConversations(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversations();
  }, [currentUserId]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900 mb-3">Tin nhắn</h1>
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
          {conversations.map((conversation) => (
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
                    src={conversation.avatar || DEFAULT_AVATAR}
                    alt={conversation.avatar}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {`${conversation.receiverFirstName} ${
                        conversation.receiverLastName
                      }${
                        conversation.receiverRole === ROLE_DOCTOR
                          ? " - Bác sĩ"
                          : ""
                      }`}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {conversation.lastTime}
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
          <ChatBox
            selectedConversation={selectedConversation}
            currentUserId={currentUserId ?? ""}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Fertility Care - Nơi lưu giữ quá trình đón chào con của bạn
              </h3>
              <p className="text-gray-500">
                Chọn một cuộc trò chuyện từ thanh bên để bắt đầu nhắn tin
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
