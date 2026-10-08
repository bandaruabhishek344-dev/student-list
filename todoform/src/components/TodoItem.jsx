import { useState } from "react";

function TodoItem({
  task,
  deleteTask,
  toggleTask,
  editTask,
}) {
  const [editing, setEditing] =
    useState(false);

  const [newText, setNewText] =
    useState(task.text);

  const handleSave = () => {
    editTask(task.id, newText);
    setEditing(false);
  };

  return (
    <div className="task">

      <input
        type="checkbox"
        checked={task.completed}
        onChange={() =>
          toggleTask(task.id)
        }
      />

      {editing ? (
        <>
          <input
            value={newText}
            onChange={(e) =>
              setNewText(e.target.value)
            }
          />

          <button onClick={handleSave}>
            Save
          </button>
        </>
      ) : (
        <>
          <span
            className={
              task.completed
                ? "completed"
                : ""
            }
          >
            {task.text}
          </span>

          <button
            onClick={() =>
              setEditing(true)
            }
          >
            Edit
          </button>
        </>
      )}

      <button
        className="delete-btn"
        onClick={() =>
          deleteTask(task.id)
        }
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;