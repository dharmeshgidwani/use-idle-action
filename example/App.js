import React from "react";
import { useIdleAction } from "../src/useIdleAction";

function App() {
  const { isIdle, lastActive, resetIdleTimer } = useIdleAction({
    timeout: 5000, // 5 seconds for demo
    onIdle: () => alert("You've been idle for 5 seconds!"),
  });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>useIdleAction Hook Demo</h2>
      <p>Status: {isIdle ? "🛑 Idle" : "✅ Active"}</p>
      <p>Last Active: {lastActive.toLocaleTimeString()}</p>
      <button onClick={resetIdleTimer}>Reset Timer</button>
    </div>
  );
}

export default App;
