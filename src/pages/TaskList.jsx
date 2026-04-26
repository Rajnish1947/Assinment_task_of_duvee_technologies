import React, { useEffect, useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Task Management
          </h1>

          <span className="text-sm text-gray-500">
            Total Tasks: {tasks.length}
          </span>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">

          <table className="w-full text-sm">

            {/* TABLE HEAD */}
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Employee</th>
                <th className="p-4 text-left">Priority</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Created At</th>
              </tr>
            </thead>

       
            <tbody>

              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-10 text-gray-500">
                    No tasks assigned yet 🚀
                  </td>
                </tr>
              ) : (
                tasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className={`border-b hover:bg-gray-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >

                    {/* TITLE */}
                    <td className="p-4 font-medium text-gray-800">
                      {task.title}
                    </td>

                    {/* EMPLOYEE */}
                    <td className="p-4 text-gray-700">
                      {task.employeeName || "N/A"}
                    </td>

                    {/* PRIORITY */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold
                          ${
                            task.priority === "High"
                              ? "bg-red-100 text-red-600"
                              : task.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold
                          ${
                            task.status === "Completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-orange-100 text-orange-600"
                          }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="p-4 text-gray-500 text-xs">
                      {task.createdAt}
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default TaskList;