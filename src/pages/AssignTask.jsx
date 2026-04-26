import React, { useState, useEffect } from "react";
import data from "../data/employees.json";

const AssignTask = () => {
  const [employees, setEmployees] = useState([]);
  const [task, setTask] = useState({
    employeeId: "",
    title: "",
    description: "",
    priority: "Medium",
  });

  //  Load Employees
  useEffect(() => {
    const stored = localStorage.getItem("employees");
    const localEmployees = stored ? JSON.parse(stored) : [];

    // merge safely
    const merged = [...data, ...localEmployees];

    // remove duplicates
    const unique = Array.from(
      new Map(merged.map((e) => [e.id, e])).values()
    );

    setEmployees(unique);
  }, []);

  //  Assign Task
  const handleAssign = () => {
    if (!task.employeeId || !task.title.trim()) {
      alert("Please fill required fields");
      return;
    }

    const selectedEmployee = employees.find(
      (e) => e.id.toString() === task.employeeId
    );

    const newTask = {
      ...task,
      id: Date.now(),
      employeeName: selectedEmployee?.name,
      createdAt: new Date().toLocaleString(),
      status: "Pending",
    };

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = [newTask, ...storedTasks];

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    alert("Task Assigned Successfully ");

    setTask({
      employeeId: "",
      title: "",
      description: "",
      priority: "Medium",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Assign Task to Employee
        </h1>

        {/* EMPLOYEE SELECT */}
        <select
          value={task.employeeId}
          onChange={(e) =>
            setTask({ ...task, employeeId: e.target.value })
          }
          className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} — {emp.department}
            </option>
          ))}
        </select>

        {/* TASK TITLE */}
        <input
          type="text"
          placeholder="Task Title"
          value={task.title}
          onChange={(e) =>
            setTask({ ...task, title: e.target.value })
          }
          className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Task Description"
          value={task.description}
          onChange={(e) =>
            setTask({ ...task, description: e.target.value })
          }
          className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none h-28 resize-none"
        />

        {/* PRIORITY */}
        <select
          value={task.priority}
          onChange={(e) =>
            setTask({ ...task, priority: e.target.value })
          }
          className="w-full mb-6 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        {/* BUTTON */}
        <button
          onClick={handleAssign}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Assign Task
        </button>

      </div>
    </div>
  );
};

export default AssignTask;