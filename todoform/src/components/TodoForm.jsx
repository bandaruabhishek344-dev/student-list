import { useState } from "react";

function TodoForm({ addTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Please enter a task");
      return;
    }

    addTask(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new task"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <button>Add</button>
    </form>
  );
}

export default TodoForm;