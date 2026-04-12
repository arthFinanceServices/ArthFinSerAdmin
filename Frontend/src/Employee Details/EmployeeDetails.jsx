import React, { useContext, useEffect, useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import Random from "../components/Random";
import { PassProvider } from "../context/PassContext";
import axiosInstance from "../Api/AxiosInstance";

const EmployeeDetails = () => {
  const { pass, setPass } = useContext(PassProvider);

  const [employeeData, setEmployeeData] = useState([]);
  const [editID, setEditID] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [newRow, setNewRow] = useState({
    fullName: "",
    email: "",
    password: "",
    isActive: true,
  });

  /* ================= FETCH ================= */
  const fetchEmployees = async () => {
    const res = await axiosInstance.get("/getEmployeeData");
    setEmployeeData(res.data.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* ================= PASSWORD GENERATOR ================= */
  const generateRandomPass = async () => {
    let password = "";
    for (let i = 0; i < 3; i++) {
      const res = await fetch("https://random-word-api.herokuapp.com/word");
      const word = await res.json();
      password += word[0];
    }
    password = password.slice(0, 10);
    password =
      password.charAt(0).toUpperCase() +
      password.slice(1) +
      Math.floor(Math.random() * 1000);

    setPass(password);
    setNewRow({ ...newRow, password });
  };

  /* ================= STATUS TOGGLE ================= */
  const handleActive = async (employee) => {
    try {
      await axiosInstance.patch(`/updateEmployee/${employee._id}`, {
        fullName: employee.fullName,
        email: employee.email,
        password: employee.password,
        isActive: !employee.isActive,
      });
      fetchEmployees();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (id) => setEditID(id);

  const handleChange = (index, field, value) => {
    const updated = [...employeeData];
    updated[index][field] = value;
    setEmployeeData(updated);
  };

  const handleUpdate = async (id) => {
    const emp = employeeData.find((e) => e._id === id);
    try {
      await axiosInstance.patch(`/updateEmployee/${id}`, {
        fullName: emp.fullName,
        email: emp.email,
        password: emp.password,
        isActive: emp.isActive,
      });
      setEditID(null);
      fetchEmployees();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  /* ================= ADD ================= */
  const handleAdd = async () => {
    try {
      await axiosInstance.post("/addEmployee", newRow);
      setIsAdding(false);
      setNewRow({ fullName: "", email: "", password: "", isActive: true });
      fetchEmployees();
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto mb-6 flex justify-between">
        <h1 className="text-2xl font-semibold">Employee Details</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Employee
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-left">Password</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {employeeData.map((e, index) => (
              <tr key={e._id} className="border-b">
                <td className="p-3">
                  <input
                    value={e.fullName}
                    disabled={editID !== e._id}
                    onChange={(ev) =>
                      handleChange(index, "fullName", ev.target.value)
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>

                <td className="p-3">
                  <input
                    value={e.email}
                    disabled={editID !== e._id}
                    onChange={(ev) =>
                      handleChange(index, "email", ev.target.value)
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>

                <td className="p-3 text-center">
                  <button onClick={() => handleActive(e)}>
                    {e.isActive ? (
                      <FaToggleOn className="text-3xl text-indigo-500" />
                    ) : (
                      <FaToggleOff className="text-3xl text-gray-400" />
                    )}
                  </button>
                </td>

                <td className="p-3">
                  <input
                    value={e.password}
                    disabled={editID !== e._id}
                    onChange={(ev) =>
                      handleChange(index, "password", ev.target.value)
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>

                <td className="p-3 text-center">
                  {editID === e._id ? (
                    <button
                      onClick={() => handleUpdate(e._id)}
                      className="bg-indigo-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(e._id)}>
                      <CiEdit className="text-xl" />
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {isAdding && (
              <tr className="bg-indigo-50">
                <td className="p-3">
                  <input
                    placeholder="Full Name"
                    value={newRow.fullName}
                    onChange={(e) =>
                      setNewRow({ ...newRow, fullName: e.target.value })
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="p-3">
                  <input
                    placeholder="Email"
                    value={newRow.email}
                    onChange={(e) =>
                      setNewRow({ ...newRow, email: e.target.value })
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="p-3 text-center">Active</td>
                <td className="p-3">{newRow.password}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={handleAdd}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Add
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="max-w-5xl mx-auto mt-6 bg-white p-4 rounded-lg">
        <Random genearteRandomPass={generateRandomPass} />
      </div>
    </div>
  );
};

export default EmployeeDetails;
