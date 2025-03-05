import React from "react";
import { useTheme } from "./context/ThemeContext";
import TaskManager from "./components/TaskManager";
import "./App.css";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app-container ${theme}`}>
      <header className="app-header">
        <h1 className="app-title">📝 Task Manager</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>
      <TaskManager />
    </div>
  );
};

export default App;
