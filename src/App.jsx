import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import "./Tep.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const user = "Sanjay"; // 👈 change later
  const gf = "Sarangi";  // 👈 change name

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: message,
      user: user,
      createdAt: new Date(),
    });

    setMessage("");
  };

  return (
    <div className="chat-container">
      {/* HEADER */}
      <div className="chat-header">
        <h2>{gf} </h2>
      </div>

      {/* CHAT BODY */}
      <div className="chat-body">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.user === user ? "message sent" : "message received"
            }
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;