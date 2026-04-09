import React, { useContext, useEffect, useState } from "react";

import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import Random from "../components/Random";
import { PassProvider } from "../context/PassContext";
import axiosInstance from "../Api/AxiosInstance";

const EmployeeDetails = () => {
  const { pass, setPass, code, setCode } = useContext(PassProvider);
  const [active, setActive] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [editID, seteditID] = useState("Sujit");
  const [isAdding, setisAdding] = useState(false);
  const [newRow, setNewRow] = useState({
    fullName: "",
    email: "",
    isActive: true,
    password: pass,
  });

  async function fecthEmployeeDatav() {
    const res = await axiosInstance.get("/getEmployeeData");
    setEmployeeData(res?.data?.data);
  }

  async function genearteRandomPass() {
    let password = "";
    for (let i = 0; i < 3; i++) {
      let res = await fetch("https://random-word-api.herokuapp.com/word");
      const word = await res.json();
      password += word;
    }
    if (password.length > 10) {
      password = password.slice(0, 10);
    }
    password = password.charAt(0).toUpperCase() + password.slice(1);
    const randomnumer = Math.floor(Math.random() * 1000);
    password += randomnumer;
    setPass(password);
    setNewRow({ ...newRow, password: password });
  }

  useEffect(() => {
    fecthEmployeeDatav();
  }, []);

  async function handleActive(isActive, id) {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/updateStatus/${id}`,
        { isActive: !isActive }
      );
    } catch (error) {
      console.log("Error in changing State");
    }
    fecthEmployeeDatav();
  }

  async function handleEdit(id) {
    seteditID(id);
  }

  async function handleUdatePassword(id) {}

  function addNewRow(e) {
    setisAdding(true);
  }

  async function handleAdd(data) {
    setisAdding(false);
    console.log(newRow);
    try {
      const res = await axiosInstance.post("/addEmployee", newRow);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    fecthEmployeeDatav();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
            Employee Details
          </h1>
          <p className="text-slate-400 mt-1 text-xs">
            Manage employee status and information
          </p>
        </div>
        <div>
          <div
            onClick={addNewRow}
            className="cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150"
          >
            + Add Employee
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-6 py-3 font-medium tracking-widest uppercase text-xs text-slate-400">
                Full Name
              </th>
              <th className="text-left px-6 py-3 font-medium tracking-widest uppercase text-xs text-slate-400">
                Email
              </th>
              <th className="text-center px-6 py-3 font-medium tracking-widest uppercase text-xs text-slate-400">
                Status
              </th>
              <th className="text-left px-6 py-3 font-medium tracking-widest uppercase text-xs text-slate-400">
                Password
              </th>
              <th className="text-center px-6 py-3 font-medium tracking-widest uppercase text-xs text-slate-400">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((e, index) => (
              <tr
                key={e._id}
                className={`border-b border-slate-50 transition-colors duration-100 ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                } hover:bg-indigo-50/40`}
              >
                {/* Name with initials avatar */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold flex items-center justify-center shrink-0">
                      {e.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                    <span className="font-medium text-slate-800">
                      {e.fullName}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-slate-500">{e.email}</td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleActive(e.isActive, e._id)}
                    className="inline-flex items-center justify-center transition-transform hover:scale-110 focus:outline-none"
                    title={e.isActive ? "Deactivate" : "Activate"}
                  >
                    {e.isActive ? (
                      <FaToggleOn className="text-indigo-500 text-3xl" />
                    ) : (
                      <FaToggleOff className="text-slate-300 text-3xl" />
                    )}
                  </button>
                </td>

                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={e.password}
                    disabled={e._id !== editID}
                    className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-slate-50 text-slate-700 disabled:text-slate-400 disabled:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 w-36"
                  />
                </td>

                <td
                  onClick={() => handleEdit(e._id)}
                  className="px-6 py-4 text-center"
                >
                  {e._id === editID ? (
                    <button
                      onClick={() => handleUdatePassword(e._id)}
                      className="text-xs font-medium px-3 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors duration-150 cursor-pointer"
                    >
                      Update
                    </button>
                  ) : (
                    <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-500 transition-colors duration-150 focus:outline-none">
                      <CiEdit className="text-base" />
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {/* New Row being added */}
            {isAdding && (
              <tr className="border-b border-slate-50 bg-indigo-50/30">
                <td className="px-6 py-3">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={newRow.fullName}
                    onChange={(e) =>
                      setNewRow({ ...newRow, fullName: e.target.value })
                    }
                    className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 w-full"
                  />
                </td>
                <td className="px-6 py-3">
                  <input
                    type="text"
                    placeholder="Email"
                    value={newRow.email}
                    onChange={(e) =>
                      setNewRow({ ...newRow, email: e.target.value })
                    }
                    className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 w-full"
                  />
                </td>
                <td className="px-6 py-3 text-center">
                  <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-600 border border-green-200 rounded-lg">
                    Active
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-slate-500 font-mono">
                  {newRow.password || "—"}
                </td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={handleAdd}
                    className="text-xs font-medium px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-150 cursor-pointer"
                  >
                    Add
                  </button>
                </td>
              </tr>
            )}

            {employeeData.length === 0 && !isAdding && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-slate-300 italic text-sm"
                >
                  No employee data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Random Component */}
      <div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <Random genearteRandomPass={genearteRandomPass} />
      </div>

    </div>
  );
};

export default EmployeeDetails;