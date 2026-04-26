import React, { useEffect, useState } from "react";
import data from "../data/employees.json";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);


  useEffect(() => {
    const stored = localStorage.getItem("employees");
    const localEmployees = stored ? JSON.parse(stored) : [];

    const merged = [...data, ...localEmployees];

    
    const unique = Array.from(
      new Map(merged.map((e) => [e.id, e])).values()
    );

    setEmployees(unique);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 p-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Attendance System
          </h1>

          <div className="text-sm text-gray-500">
            Total Employees: {employees.length}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">

          <table className="w-full text-sm">

         
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-4 text-left">Employee</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">System Status</th>
                <th className="p-4 text-left">Attendance</th>
              </tr>
            </thead>

      
            <tbody>

              {employees.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-10 text-gray-500">
                    No employees found
                  </td>
                </tr>
              ) : (
                employees.map((emp, index) => (
                  <tr
                    key={emp.id}
                    className={`border-b hover:bg-gray-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >

                 
                    <td className="p-4 font-medium text-gray-800">
                      {emp.name}
                    </td>

                  
                    <td className="p-4 text-gray-700">
                      {emp.department}
                    </td>

                    
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold
                          ${
                            emp.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                      >
                        {emp.status}
                      </span>
                    </td>

             
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold
                          ${
                            emp.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                      >
                        {emp.status === "Active"
                          ? "Present"
                          : "Absent"}
                      </span>
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

export default Attendance;