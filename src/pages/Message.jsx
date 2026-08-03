import { socket } from "../../socket.io";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdmin } from "../auth/auth";
import Loading from "../components/Loading";
import { fetchMessages } from "../store/util";
import "../pages/Message.css";

export default function Message() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // for auto-scroll
  
  // ADMIN DATA QUERY
  const { data: adminData, isLoading, isError, error } = useQuery({
    queryKey: ["adminId"],
    queryFn: getAdmin,
  });

  const adminId = adminData?._id;

  // SOCKET: Receive Message
  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.off("receive_message");
  }, []);

  // SOCKET: Delivered Message
  useEffect(()=> {
    const handleUpdateDeliveredStatus = (updatedDeliveredMessage) => {
      setMessages(prevMessages => 
        prevMessages.map(msg => msg._id === updatedDeliveredMessage._id ? updatedDeliveredMessage : msg)
      )
    }
    socket.on("message_status_update", handleUpdateDeliveredStatus);

    return ()=> {
      socket.off("message_status_update", handleUpdateDeliveredStatus);
    }
  }, []);

  // SOCKET: Read message
  useEffect(()=> {
    socket.emit("join_chat", {otherUserId: adminId});

    socket.emit("mark_as_read", {senderId: adminId});

    return ()=> {
      socket.emit("leave_chat", {otherUserId: adminId});
    }
  }, [adminId])


  // FETCH MESSAGES
  const { data: messageData } = useQuery({
    queryKey: ["messageData", adminId],
    queryFn: () => fetchMessages(adminId),
    enabled: !!adminId,
  });

  useEffect(() => {
    if (messageData) setMessages(messageData.messages || []);
  }, [messageData]);

  // AUTO SCROLL TO BOTTOM WHEN MESSAGES CHANGE
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading) return <Loading />;
  if (isError) return <p>{error?.response?.data?.message || "Failed to get AdminId"}</p>;

  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user._id;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text) return;

    socket.emit("send_message", {
      sender: userId,
      senderModel: "User",
      receiver: adminId,
      receiverModel: "Admin",
      message: text,
    });

    setText("");
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>Messages</h2>
      </header>

      <section className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`chat-message ${
              msg.senderModel === "User" ? "sent" : "received"
            }`}
          >
            <p>{msg.message}</p>
            {msg.receiverModel === "Admin" && msg.status === "sent" && <p className="msg-status">sent</p>}
            {msg.receiverModel === "Admin" && msg.status === "delivered" && <p className="msg-status">delivered</p>}
            {msg.receiverModel === "Admin" && msg.status === "read" && <p className="msg-status">read</p>}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </section>

      <footer className="chat-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </footer>
    </div>
  );
}