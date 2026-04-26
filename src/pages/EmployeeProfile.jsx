

import React from "react";
import { useParams } from "react-router-dom";
import data from "../data/employees.json";

const EmployeeProfile = () => {
  const { id } = useParams();

  const getEmployees = () => {
    const stored = localStorage.getItem("employees");
    return stored ? JSON.parse(stored) : data;
  };

  const employees = getEmployees();

  const employee = employees.find((e) => e.id.toString() === id);

  if (!employee) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Employee not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 p-6">

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE - PROFILE */}
        <div className="lg:col-span-1">

          <div className="sticky top-6">

            {/* PROFILE IMAGE */}
            <div className="flex flex-col items-center text-center">

              <div className="relative">
                <img
  src={employee.image}
  alt=""
  className="w-[250px] h-[250px] rounded-full object-cover object-center border-4 border-white shadow-lg"
/>

                <span className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white
                  ${employee.status === "Active" ? "bg-green-500" : "bg-red-500"}
                `}></span>
              </div>

              <h1 className="text-2xl font-bold mt-4 text-gray-900">
                {employee.name}
              </h1>

             

              <span className={`mt-3 px-3 py-1 text-xs rounded-full font-semibold
                ${employee.status === "Active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
                }`}>
                {employee.status}
              </span>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="lg:col-span-2 space-y-8">

  {/* PERSONAL INFO */}
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

    <h2 className="text-lg font-bold text-gray-800 mb-5">
      Personal Information
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-gray-500 text-sm">Employee ID</span>
        <span className="font-semibold text-gray-800">{employee.id}</span>
      </div>

      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-gray-500 text-sm">Email</span>
        <span className="font-semibold text-gray-800 break-all text-right">
          {employee.email}
        </span>
      </div>

      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-gray-500 text-sm">Department</span>
        <span className="font-semibold text-gray-800">{employee.department}</span>
      </div>

      <div className="flex justify-between items-center py-2">
        <span className="text-gray-500 text-sm">Role</span>
        <span className="font-semibold text-gray-800">{employee.role}</span>
      </div>

    </div>
  </div>

  {/* WORK INFO */}
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

    <h2 className="text-lg font-bold text-gray-800 mb-4">
      Work Details
    </h2>

    <p className="text-sm text-gray-600 leading-relaxed">
      {employee.name} is working as a{" "}
      <span className="font-semibold text-gray-800">{employee.role}</span>{" "}
      in the{" "}
      <span className="font-semibold text-gray-800">{employee.department}</span>{" "}
      department. Currently the employee is{" "}
      <span
        className={`font-semibold ${
          employee.status === "Active" ? "text-green-600" : "text-red-600"
        }`}
      >
        {employee.status.toLowerCase()}
      </span>.
    </p>
  </div>

  {/* ACTIVITY */}
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

    <h2 className="text-lg font-bold text-gray-800 mb-5">
      Activity Timeline
    </h2>

    <div className="space-y-5">

      <div className="flex gap-3">
        <div className="w-2.5 h-2.5 mt-2 rounded-full bg-indigo-500"></div>
        <div>
          <p className="text-sm font-medium text-gray-800">
            Profile loaded
          </p>
          <p className="text-xs text-gray-400">Just now</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-2.5 h-2.5 mt-2 rounded-full bg-green-500"></div>
        <div>
          <p className="text-sm font-medium text-gray-800">
            Data synced with system
          </p>
          <p className="text-xs text-gray-400">Auto update</p>
        </div>
      </div>

    </div>
  </div>

</div>

      </div>
    </div>
  );
};

export default EmployeeProfile;