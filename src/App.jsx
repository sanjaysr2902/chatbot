return (
  <div className="chat-container">

    {/* HEADER */}
    <div className="chat-header">
      Sarangi 
    </div>

    {/* CHAT BODY */}
    <div className="chat-body">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`message ${
            msg.user === user ? "sent" : "received"
          }`}
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