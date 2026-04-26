import React, { createContext, useContext, useEffect, useState } from "react";
import data from "../data/employees.json";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const stored = localStorage.getItem("employees");
    return stored ? JSON.parse(stored) : data;
  });

  const [editEmp, setEditEmp] = useState(null);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [activities, setActivities] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newEmp, setNewEmp] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    status: "Active",
    image: ""
  });


  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);


  const total = employees.length;
  const active = employees.filter(e => e.status === "Active").length;
  const inactive = employees.filter(e => e.status === "Inactive").length;
  const departments = [...new Set(employees.map(e => e.department))];

  //  Activity Logger
  const addActivity = (message) => {
    const newActivity = {
      id: Date.now(),
      message,
      time: new Date().toLocaleString()
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  // Filtered Employees
  const filteredEmployees = employees.filter(emp =>
    (department === "All" || emp.department === department) &&
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  // DELETE
  const handleDelete = (id) => {
    const emp = employees.find(e => e.id === id);

    if (window.confirm("Delete this employee?")) {
      setEmployees(prev => prev.filter(e => e.id !== id));
      addActivity(`Deleted employee: ${emp?.name}`);
    }
  };

  //  UPDATE
  const handleUpdate = () => {
    setEmployees(prev =>
      prev.map(e => (e.id === editEmp.id ? editEmp : e))
    );

    addActivity(`Updated employee: ${editEmp.name}`);
    setEditEmp(null);
  };

  //  IMAGE UPLOAD
  const handleImageUpload = (e, type = "add") => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (type === "add") {
        setNewEmp(prev => ({ ...prev, image: reader.result }));
      } else {
        setEditEmp(prev => ({ ...prev, image: reader.result }));
      }
    };

    if (file) reader.readAsDataURL(file);
  };

  //  ADD EMPLOYEE
  const handleAddEmployee = () => {
    const newEmployee = {
      ...newEmp,
      id: Date.now()
    };

    setEmployees(prev => [...prev, newEmployee]);
    setShowAddModal(false);

    addActivity(`Added employee: ${newEmp.name}`);

    setNewEmp({
      name: "",
      email: "",
      role: "",
      department: "",
      status: "Active",
      image: ""
    });
  };

  return (
    <EmployeeContext.Provider
      value={{
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
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};


export const useEmployee = () => useContext(EmployeeContext);