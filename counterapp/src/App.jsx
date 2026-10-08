import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial"
      }}
    >
      <h1 style={{ color: "blue" }}>Counter App</h1>

      <h2
        style={{
          fontSize: "40px",
          color: "green"
        }}
      >
        {count}
      </h2>

      <button
        style={{
          padding: "10px 20px",
          margin: "10px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>

      <button
        style={{
          padding: "10px 20px",
          margin: "10px",
          backgroundColor: "grey",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={() => setCount(count - 1)}
      >
        Decrement
      </button>

      <button
        style={{
          padding: "10px 20px",
          margin: "10px",
          backgroundColor: "orange",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={() => setCount(0)}
      >
        Reset
      </button>
    </div>
  );
}

export default App;