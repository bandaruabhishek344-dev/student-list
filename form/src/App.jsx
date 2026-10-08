import { useState } from "react";
 
function Form() {
  const [name, setName] = useState("");
 
  const handleChange = (event) => {
    setName(event.target.value);
  };
 
  const handleClick = () => {
    console.log("Register button clicked");
  };
 
  const handleSubmit = (event) => {
   event.preventDefault();
    console.log("Student Registered:", name);
  };
 
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={handleChange}
      />
 
      <button type="submit" onClick={handleClick}>Register</button>
    </form>
  );
}
 
export default Form;