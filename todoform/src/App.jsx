import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import FilterButtons from "./components/FilterButtons";
import TaskStats from "./components/TaskStats";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {``
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const editTask = (id, updatedText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: updatedText }
          : task
      )
    );
  };

  const clearAllTasks = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  const clearCompletedTasks = () => {
    setTasks(
      tasks.filter((task) => !task.completed)
    );
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") {
        return task.completed;
      }

      if (filter === "pending") {
        return !task.completed;
      }

      return true;
    })
    .filter((task) =>
      task.text
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="container">
      <h1>Advanced Todo App</h1>

      <TodoForm addTask={addTask} />

      <input
        type="text"
        placeholder="Search task..."
        className="search"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <FilterButtons
        filter={filter}
        setFilter={setFilter}
      />

      <TaskStats tasks={tasks} />

      <div className="action-buttons">
        <button
          onClick={clearCompletedTasks}
        >
          Clear Completed
        </button>

        <button
          className="delete-btn"
          onClick={clearAllTasks}
        >
          Clear All
        </button>
      </div>

      <div className="todo-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
              editTask={editTask}
            />
          ))
        ) : (
          <h3>No Tasks Found</h3>
        )}
      </div>
    </div>
  );
}

export default App;