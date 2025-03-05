import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

const TaskManager = () => {
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    });
    const [taskText, setTaskText] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!taskText.trim()) return;
        setTasks([...tasks, { text: taskText, completed: false }]);
        setTaskText("");
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const filteredTasks =
        filter === "completed"
            ? tasks.filter((task) => task.completed)
            : filter === "pending"
                ? tasks.filter((task) => !task.completed)
                : tasks;

    return (
        <div className="task-manager">
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Add a new task..."
                className="task-input"
            />
            <button onClick={addTask} className="add-task-btn">➕ Add Task</button>

            <div className="filters">
                <button onClick={() => setFilter("all")} className="filter-btn">📋 All</button>
                <button onClick={() => setFilter("completed")} className="filter-btn">✅ Completed</button>
                <button onClick={() => setFilter("pending")} className="filter-btn">⏳ Pending</button>
            </div>

            <ul className="task-list">
                {filteredTasks.map((task, index) => (
                    <TaskItem
                        key={index}
                        task={task}
                        toggleTask={() => toggleTaskCompletion(index)}
                        deleteTask={() => deleteTask(index)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;
