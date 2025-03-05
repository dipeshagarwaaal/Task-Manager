import React from "react";

const TaskItem = ({ task, toggleTask, deleteTask }) => {
    return (
        <li className={`task-item ${task.completed ? "completed" : ""}`}>
            <span onClick={toggleTask}>{task.text}</span>
            <button onClick={deleteTask} className="delete-btn">🗑️</button>
        </li>
    );
};

export default TaskItem;
