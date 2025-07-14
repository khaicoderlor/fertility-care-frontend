/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import { useChatSocket } from "../../hooks/UseChatSocket";
import { useUserStatus } from "../../hooks/UseUserStatus";
import { BsCameraVideoFill } from "react-icons/bs";

interface Attachment {
  url: string;
  fileName: string;
  type: string;
}

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  status: string;
  senderRole: string;
  attachments?: Attachment[];
}

interface ChatBoxProps {
  currentUserId: string;
  currentUserRole: string;
  receiverId: string;
  receiverRole: string;
  receiverName: string;
  conversationId: string;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
  currentUserId,
  currentUserRole,
  receiverId,
  receiverRole,
  receiverName,
  conversationId,
}) => {
  const { socket, connected } = useChatSocket();
  const { online } = useUserStatus(receiverId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Fetch chat history once
  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3001/chat/messages/${conversationId}?page=1&limit=50`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
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
      if (data.userId === receiverId) setIsTyping(data.isTyping);
    });

    return () => {
      socket.emit("leaveConversation", { conversationId });
      socket.off("newMessage");
      socket.off("userTyping");
    };
  }, [socket, connected, conversationId, receiverId]);

  // Scroll to bottom when message changes
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!socket || (!input.trim() && !file)) return;

    const message: any = {
      receiverId,
      receiverRole,
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
    socket?.emit("typing", { conversationId, isTyping: true });

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket?.emit("typing", { conversationId, isTyping: false });
    }, 1500);
  };

  const formatTime = (timestamp: string) =>
    new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="receiver">
          <div className={`dot ${online ? "online" : "offline"}`} />
          <strong>{receiverName}</strong>{" "}
          {online ? <span>Online</span> : <span>Offline</span>}
        </div>
        <button className="call-btn flex items-center"><BsCameraVideoFill className="w-8 h-5" /> Call</button>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`message ${
              msg.senderId === currentUserId ? "sent" : "received"
            }`}
          >
            <div className="content">
              <p>{msg.content}</p>
              {msg.attachments?.map((file, idx) => (
                <a
                  key={idx}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📎 {file.fileName}
                </a>
              ))}
              <div className="meta">
                <small>
                  {msg.senderRole} · {formatTime(msg.timestamp)}
                </small>
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
        {isTyping && (
          <div className="typing-indicator">
            <em>{receiverName} is typing...</em>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => handleTyping(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button onClick={handleSend} disabled={!connected}>
          Send
        </button>
      </div>

      <style>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid #ccc;
        }

        .chat-header {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          background: #f5f5f5;
          align-items: center;
        }

        .receiver {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .dot.online {
          background-color: green;
        }

        .dot.offline {
          background-color: gray;
        }

        .call-btn {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 10px;
          background: #fafafa;
        }

        .message {
          margin: 5px 0;
          max-width: 70%;
        }

        .sent {
          align-self: flex-end;
          background: #dcf8c6;
          border-radius: 10px 10px 0 10px;
        }

        .received {
          align-self: flex-start;
          background: #fff;
          border-radius: 10px 10px 10px 0;
        }

        .content {
          padding: 8px 12px;
        }

        .meta {
          font-size: 0.75rem;
          color: gray;
          text-align: right;
        }

        .chat-input {
          display: flex;
          gap: 5px;
          padding: 10px;
          border-top: 1px solid #ccc;
        }

        .typing-indicator {
          font-style: italic;
          color: gray;
          padding: 0 10px;
        }
      `}</style>
    </div>
  );
};
