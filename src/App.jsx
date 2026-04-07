import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user") || "");

  // 🔥 Ask username once
  useEffect(() => {
    if (!user) {
      const name = prompt("Enter your name:");
      if (name) {
        setUser(name);
        localStorage.setItem("user", name);
      }
    }
  }, []);

  // 🔥 Real-time messages
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  // 🚀 Send message
  const sendMessage = async () => {
    if (message.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: message,
      user: user,
      createdAt: serverTimestamp()
    });

    setMessage("");
  };

  return (
    <div className="chat-container">

      {/* HEADER */}
      <div className="chat-header">
        💙 ss chat app 💙
      </div>

      {/* CHAT BODY */}
      <div className="chat-body">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.user === user ? "sent" : "received"
            }`}
          >
            <span className="username">{msg.user}</span>
            {msg.text}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Send something..."
        />
        <button onClick={sendMessage}>Send 🚀</button>
      </div>

    </div>
  );
}

export default App;