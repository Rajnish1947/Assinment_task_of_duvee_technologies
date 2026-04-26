

import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useEmployee } from "../context/EmployeeContext";

const EmployeeList = () => {
  const {
    employees,
    setEmployees,
    editEmp,
    setEditEmp,
    search,
    setSearch,
    department,
    setDepartment,
    activities,
    setActivities,
    showAddModal,
    setShowAddModal,
    newEmp,
    setNewEmp,

    total,
    active,
    inactive,
    departments,
    filteredEmployees,

    handleDelete,
    handleUpdate,
    handleAddEmployee,
    handleImageUpload,
    addActivity
  } = useEmployee();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-12">


      <div className="absolute top-0 w-full h-64 bg-indigo-600 -z-10"></div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-wide">
          Welcome to Dashboard
        </h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow-md"
        >
          + Add Employee
        </button>
      </div>

      <div className="max-w-7xl mx-auto">

        {/*  TOP STATS */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="bg-white/90 rounded-2xl p-5 shadow-xl">
              <p className="text-sm text-gray-500">Total Employees</p>
              <h2 className="text-3xl font-extrabold text-indigo-600">{total}</h2>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 text-white shadow-xl">
            <p>Active</p>
            <h2 className="text-3xl font-bold">{active}</h2>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-red-400 to-rose-600 text-white shadow-xl">
            <p>Inactive</p>
            <h2 className="text-3xl font-bold">{inactive}</h2>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-700 text-white shadow-xl">
            <p>Departments</p>
            <h2 className="text-3xl font-bold">{departments.length}</h2>
          </div>
        </div>

        {/* FILTER */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

          {/* FILTER SECTION */}
          <div className="lg:col-span-8 bg-white/90 backdrop-blur-md shadow-lg rounded-3xl p-6 border border-gray-100">

            {/* HEADER */}
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-500">
                Search & Filters
              </h2>
            </div>

            {/* INPUTS */}
            <div className="flex flex-col md:flex-row gap-4">

              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white 
        focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
              >
                <option value="All">All Departments</option>
                {departments.map((dep, i) => (
                  <option key={i}>{dep}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Search employee..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white 
        focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
              />

            </div>

          </div>

          {/* ACTIVITY PANEL */}
          <div className="lg:col-span-4 bg-white shadow-xl rounded-3xl border border-gray-100 p-6 flex flex-col">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold text-gray-800">
                📌 Activity Timeline
              </h2>

              <span className="text-[10px] px-2 py-1 rounded-full bg-green-100 text-green-600 font-medium">
                Live
              </span>
            </div>

            {/* TIMELINE */}
            <div className="space-y-5 max-h-72 overflow-y-auto pr-2">

              {activities.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-400 text-sm">No activity yet</p>
                </div>
              ) : (
                activities.map((act, index) => (
                  <div key={act.id} className="flex gap-3 relative">

                    {/* DOT + LINE */}
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-md"></div>

                      {index !== activities.length - 1 && (
                        <div className="w-[2px] h-full bg-gray-200 mt-1"></div>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="pb-4">
                      <p className="text-sm font-medium text-gray-800 leading-snug">
                        {act.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {act.time}
                      </p>
                    </div>

                  </div>
                ))
              )}

            </div>
          </div>

        </div>


        <div className="grid md:grid-cols-3 gap-8">
          {filteredEmployees.map((emp) => (
            <div key={emp.id} className="relative w-full">

              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white hover:scale-[1.02] transition-all duration-300">

                {/* Banner */}
                <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-900"></div>

                <div className="px-6 pb-8">

                  {/* Avatar */}
                  <div className="relative -mt-16 mb-4 flex justify-center">
                    <div className="p-1 bg-white rounded-full shadow-xl">
                      <img
                        src={emp.image}
                        alt={emp.name}
                        onClick={() => navigate(`/employees/${emp.id}`)}
                        className="w-28 h-28 cursor-pointer object-cover rounded-full border-4 border-white"
                      />
                    </div>

                    {/* Status Dot */}
                    <div
                      className={`absolute bottom-2 right-1/3 w-5 h-5 rounded-full border-4 border-white ${emp.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                        }`}
                    ></div>
                  </div>

                  {/* Name */}
                  <div className="text-center mb-6">
                    <h1 className="text-xl font-extrabold text-gray-900">
                      {emp.name}
                    </h1>
                    <p className="text-gray-500 text-sm">{emp.role}</p>
                  </div>

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm px-2">
                    <span className="font-medium">ID:</span>
                    <p>{emp.id}</p>

                    <span className="font-medium">Email:</span>
                    <p className="break-all">{emp.email}</p>

                    <span className="font-medium">Dept:</span>
                    <p>{emp.department}</p>

                    <span className="font-medium">Status:</span>
                    <p>{emp.status}</p>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setEditEmp(emp)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl shadow-md transition active:scale-95"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl shadow-md transition active:scale-95"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>



      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-96">

            <h2 className="text-lg font-bold mb-4">Add Employee</h2>

            <input placeholder="Name" className="w-full mb-2 p-2 border"
              value={newEmp.name}
              onChange={e => setNewEmp({ ...newEmp, name: e.target.value })}
            />

            <input placeholder="Email" className="w-full mb-2 p-2 border"
              value={newEmp.email}
              onChange={e => setNewEmp({ ...newEmp, email: e.target.value })}
            />

            <input placeholder="Role" className="w-full mb-2 p-2 border"
              value={newEmp.role}
              onChange={e => setNewEmp({ ...newEmp, role: e.target.value })}
            />

            <input placeholder="Department" className="w-full mb-2 p-2 border"
              value={newEmp.department}
              onChange={e => setNewEmp({ ...newEmp, department: e.target.value })}
            />

            <input type="file" onChange={handleImageUpload} className="mb-3" />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
              <button onClick={handleAddEmployee} className="bg-indigo-600 text-white px-3 py-1 rounded">
                Add
              </button>
            </div>

          </div>
        </div>
      )}

      {editEmp && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-96">

            <h2 className="text-lg font-bold mb-4">Edit Employee</h2>

            {/*  IMAGE PREVIEW */}
            {editEmp.image && (
              <div className="flex justify-center mb-3">
                <img
                  src={editEmp.image}
                  alt="employee"
                  className="w-20 h-20 rounded-full object-cover border"
                />
              </div>
            )}

            {/*  IMAGE UPLOAD */}
            <input
              type="file"
              className="w-full mb-3"
              onChange={(e) => handleImageUpload(e, "edit")}
            />

            <input
              className="w-full mb-2 p-2 border"
              value={editEmp.name}
              onChange={(e) =>
                setEditEmp({ ...editEmp, name: e.target.value })
              }
            />

            <input
              className="w-full mb-2 p-2 border"
              value={editEmp.email}
              onChange={(e) =>
                setEditEmp({ ...editEmp, email: e.target.value })
              }
            />

            <input
              className="w-full mb-2 p-2 border"
              value={editEmp.role}
              onChange={(e) =>
                setEditEmp({ ...editEmp, role: e.target.value })
              }
            />

            <input
              className="w-full mb-2 p-2 border"
              value={editEmp.department}
              onChange={(e) =>
                setEditEmp({ ...editEmp, department: e.target.value })
              }
            />

            <select
              className="w-full mb-3 p-2 border"
              value={editEmp.status}
              onChange={(e) =>
                setEditEmp({ ...editEmp, status: e.target.value })
              }
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setEditEmp(null)}>
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-indigo-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default EmployeeList;