/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import { useChatSocket } from "../../hooks/UseChatSocket";
import axiosSocketInstance from "../../apis/AxiosSocketInstance";
import type { ConversationSideBar } from "./SideBarConversation";
import { ROLE_DOCTOR } from "../../constants/ApplicationConstant";
import { MoreHorizontal, Phone, Send, Smile, Video } from "lucide-react";
import { IoMdCloudUpload } from "react-icons/io";

interface Attachment {
  url: string;
  fileName: string;
  type: string;
}

interface Message {
  _id: string;
  content: string;
  receiverName: string;
  currentUserId: string;
  receiverId: string;
  receiverRole: string;
  currentUserRole: string;
  timestamp: string;
  status: string;
  attachments?: Attachment[];
}

interface SendMessageRequest {
  receiverId: string | "";

  receiverRole: string | "";

  content: string;

  attachments?: {
    filename: string;
    type: string;
    base64: string;
  }[];
}

interface ChatBoxProps {
  selectedConversation: ConversationSideBar | null;
  currentUserId: string;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
  selectedConversation,
  currentUserId,
}) => {
  const { socket, connected } = useChatSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const conversationId = selectedConversation?.id;

  // Fetch chat history once
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axiosSocketInstance.get(
        `/chat/messages/${conversationId}`,
        {
          params: {
            page: 1,
            limit: 10,
          },
        }
      );
      const data = response.data;
      setMessages(data);
    };

    fetchMessages();
  }, [conversationId]);

  // Join conversation & receive messages
  useEffect(() => {
    if (!socket || !connected) return;

    socket.emit("joinConversation", { conversationId });

    socket.on("newMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("userTyping", (data: { userId: string; isTyping: boolean }) => {
      if (data.userId === selectedConversation?.receiverId)
        setIsTyping(data.isTyping);
    });

    return () => {
      socket.emit("leaveConversation", { conversationId });
      socket.off("newMessage");
      socket.off("userTyping");
    };
  }, [socket, connected, conversationId, selectedConversation?.receiverId]);

  // Scroll to bottom when message changes
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!socket || (!input.trim() && !file)) return;

    const message: SendMessageRequest = {
      receiverId: selectedConversation?.receiverId || "",
      receiverRole: selectedConversation?.receiverRole || "",
      content: input,
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        message.attachments = [
          {
            filename: file.name,
            type: file.type,
            base64: reader.result?.toString().split(",")[1] || "",
          },
        ];
        socket.emit("sendMessage", message);
      };
      reader.readAsDataURL(file);
    } else {
      socket.emit("sendMessage", message);
    }

    setInput("");
    setFile(null);
  };

  const handleTyping = (value: string) => {
    setInput(value);

    socket?.emit("typing", {
      conversationId,
      isTyping: true,
    });

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket?.emit("typing", {
        conversationId,
        isTyping: false,
      });
    }, 1500);
  };

  return (
    <>
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={selectedConversation?.avatar || "/placeholder.svg"}
              alt={selectedConversation?.receiverLastName}
              className="w-10 h-10 rounded-full object-cover"
            />
            {selectedConversation?.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">{`${
              selectedConversation?.receiverFirstName
            } ${selectedConversation?.receiverLastName}${
              selectedConversation?.receiverRole === ROLE_DOCTOR
                ? " - Bác sĩ"
                : ""
            }`}</h2>
            <p className="text-sm text-gray-500">
              {selectedConversation?.isOnline
                ? "Đang hoạt động"
                : "Không hoạt động"}
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
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.currentUserId === currentUserId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                message.currentUserId === currentUserId
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              {!(message.currentUserId === currentUserId) && (
                <img
                  src={selectedConversation?.avatar || "/placeholder.svg"}
                  alt={selectedConversation?.avatar}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <div
                className={`px-4 py-2 rounded-2xl ${
                  message.currentUserId === currentUserId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
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
            <IoMdCloudUpload className="w-6 h-5" />
            <input
              type="file"
              id="uploadFile1"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => handleTyping(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 rounded-full transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};
