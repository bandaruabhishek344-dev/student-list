import { useState } from "react";
 
function App() {
  const [show, setShow] = useState(false);
 
  return (
    <div>
      <h1>Show Hide Example</h1>
 
      <button onClick={() => setShow(!show)}>
        Show / Hide
      </button>
 
      {show && <h2>Welcome to React!</h2>}
    </div>
  );
}
 
export default App;
 