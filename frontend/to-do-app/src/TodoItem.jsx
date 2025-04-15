import React, { useState } from "react";

const API_Base = "http://localhost:3000/todo";

function TodoItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState(props.name);

 
  const handleEditInputChange = (e) => {
    setEditInput(e.target.value);
  };

 
  const saveEdit = async () => {
    if (!editInput.trim()) {
      alert("Task name cannot be empty!");
      return;
    }

    try {
      const response = await fetch(`${API_Base}/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editInput }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

     
      props.refreshTodos();
      setIsEditing(false); 
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={editInput}
          onChange={handleEditInputChange}
          className="edit-input"
        />
      ) : (
        <span className="todo-text">{props.name}</span>
      )}

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={saveEdit} className="save-button" aria-label="Save task">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="cancel-button"
              aria-label="Cancel edit"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="edit-button"
              aria-label="Edit task"
            >
              ✎
            </button>
            <button
              onClick={() => props.deleteTodo(props.id)}
              className="delete-button"
              aria-label="Delete task"
            >
              &times;
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
