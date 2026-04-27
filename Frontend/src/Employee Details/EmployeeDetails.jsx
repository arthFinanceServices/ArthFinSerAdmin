import React, { useContext, useEffect, useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import Random from "../components/Random";
import { PassProvider } from "../context/PassContext";
import axiosInstance from "../Api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const EmployeeDetails = () => {

  const navigate = useNavigate();

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
  //-----------------------------------------------------------------
/* ================= EMPLOYEE LINKS STATE ================= */

const [employeeEmail, setEmployeeEmail] = useState("");
const [searchedEmail, setSearchedEmail] = useState("");
const [employeeLinks, setEmployeeLinks] = useState([]);
const [isLinkSearchDone, setIsLinkSearchDone] = useState(false);

const [isAddingLink, setIsAddingLink] = useState(false);
const [editingLinkId, setEditingLinkId] = useState(null);

const [newLinkRow, setNewLinkRow] = useState({
  employeeEmail: "",
  linkName: "",
  url: "",
  isActive: true,
});

const [editLinkRow, setEditLinkRow] = useState({
  linkName: "",
  url: "",
});

/* ================= SEARCH ================= */

const handleSearchEmployeeLinks = async () => {
  if (!employeeEmail) return alert("Enter employee email");

  setSearchedEmail(employeeEmail);
  setIsLinkSearchDone(true);

  setIsAddingLink(false);
  setEditingLinkId(null);
  setEditLinkRow({ linkName: "", url: "" });

  try {
    const res = await axiosInstance.get(
      `/employee-links?email=${employeeEmail}`
    );
    setEmployeeLinks(res.data.data || []);
  } catch (err) {
    console.error(err);
    setEmployeeLinks([]);
  }
};

/* ================= ADD LINK ================= */

const handleAddLinkClick = () => {
  if (!searchedEmail) return;

  setIsAddingLink(true);
  setEditingLinkId(null);

  setNewLinkRow({
    employeeEmail: searchedEmail,
    linkName: "",
    url: "",
    isActive: true,
  });
};

const handleSaveNewLink = async () => {
  if (!newLinkRow.linkName || !newLinkRow.url) {
    return alert("Link Name and URL are required");
  }

  try {
    const res = await axiosInstance.post("/employee-links", {
      employeeEmail: newLinkRow.employeeEmail,
      linkName: newLinkRow.linkName,   // ✅ correct key
      url: newLinkRow.url,
      isActive: newLinkRow.isActive,
    });

    setEmployeeLinks((prev) => [...prev, res.data.data]);
    setIsAddingLink(false);
  } catch (err) {
    console.error(err);
  }
};

/* ================= EDIT LINK ================= */

const handleEditLink = (id) => {
  const link = employeeLinks.find((l) => l._id === id);
  if (!link) return;

  setEditingLinkId(id);
  setIsAddingLink(false);

  setEditLinkRow({
    linkName: link.linkName,
    url: link.url,
  });
};

const handleSaveEditLink = async (id) => {
  try {
    const res = await axiosInstance.patch(`/employee-links/${id}`, {
      linkName: editLinkRow.linkName,
      url: editLinkRow.url,
    });

    setEmployeeLinks((prev) =>
      prev.map((link) =>
        link._id === id ? res.data.data : link
      )
    );

    setEditingLinkId(null);
    setEditLinkRow({ linkName: "", url: "" });
  } catch (err) {
    console.error(err);
  }
};

/* ================= TOGGLE ACTIVE ================= */

const toggleLinkStatus = async (id, currentStatus) => {
  try {
    const res = await axiosInstance.patch(`/employee-links/${id}`, {
      isActive: !currentStatus,
    });

    setEmployeeLinks((prev) =>
      prev.map((link) =>
        link._id === id ? res.data.data : link
      )
    );
  } catch (err) {
    console.error(err);
  }
};

/* ================= DELETE LINK ================= */

const deleteLink = async (id) => {
  if (!window.confirm("Delete this link?")) return;

  try {
    await axiosInstance.delete(`/employee-links/${id}`);
    setEmployeeLinks((prev) => prev.filter((link) => link._id !== id));
  } catch (err) {
    console.error(err);
  }
};
//--------------------------------------------------------------------------
/* ================= GLOBAL LINKS STATE ================= */

const [globalLinks, setGlobalLinks] = useState([]);
const [isAddingGlobalLink, setIsAddingGlobalLink] = useState(false);
const [editingGlobalLinkId, setEditingGlobalLinkId] = useState(null);

const [newGlobalLinkRow, setNewGlobalLinkRow] = useState({
  linkName: "",
  url: "",
  isActive: true,
});

const [editGlobalLinkRow, setEditGlobalLinkRow] = useState({
  linkName: "",
  url: "",
});
/* ================= FETCH GLOBAL LINKS ================= */

const fetchGlobalLinks = async () => {
  try {
    const res = await axiosInstance.get("/global-links");
    setGlobalLinks(res.data.data || []);
  } catch (err) {
    console.error(err);
    setGlobalLinks([]);
  }
};

useEffect(() => {
  fetchGlobalLinks();
}, []);

/* ================= ADD GLOBAL LINK ================= */

const handleAddGlobalLinkClick = () => {
  setIsAddingGlobalLink(true);
  setEditingGlobalLinkId(null);
  setNewGlobalLinkRow({ linkName: "", url: "", isActive: true });
};

const handleSaveNewGlobalLink = async () => {
  if (!newGlobalLinkRow.linkName || !newGlobalLinkRow.url) {
    return alert("Link Name and URL are required");
  }

  const res = await axiosInstance.post("/global-links", newGlobalLinkRow);
  setGlobalLinks((prev) => [...prev, res.data.data]);
  setIsAddingGlobalLink(false);
};

/* ================= EDIT GLOBAL LINK ================= */

const handleEditGlobalLink = (id) => {
  const link = globalLinks.find((l) => l._id === id);
  if (!link) return;

  setEditingGlobalLinkId(id);
  setIsAddingGlobalLink(false);

  setEditGlobalLinkRow({
    linkName: link.linkName,
    url: link.url,
  });
};

const handleSaveEditGlobalLink = async (id) => {
  const res = await axiosInstance.patch(`/global-links/${id}`, {
    linkName: editGlobalLinkRow.linkName,
    url: editGlobalLinkRow.url,
  });

  setGlobalLinks((prev) =>
    prev.map((l) => (l._id === id ? res.data.data : l))
  );

  setEditingGlobalLinkId(null);
  setEditGlobalLinkRow({ linkName: "", url: "" });
};

/* ================= TOGGLE GLOBAL LINK ================= */

const toggleGlobalLinkStatus = async (id, currentStatus) => {
  const res = await axiosInstance.patch(`/global-links/${id}`, {
    isActive: !currentStatus,
  });

  setGlobalLinks((prev) =>
    prev.map((l) => (l._id === id ? res.data.data : l))
  );
};

/* ================= DELETE GLOBAL LINK ================= */

const deleteGlobalLink = async (id) => {
  if (!window.confirm("Delete this global link?")) return;

  await axiosInstance.delete(`/global-links/${id}`);
  setGlobalLinks((prev) => prev.filter((l) => l._id !== id));
};
//-----------------------------------------------------------------
const handleDeleteEmployee = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) return;

  try {
    await axiosInstance.delete(`/deleteEmployee/${id}`);
    fetchEmployees(); // refresh table
  } catch (error) {
    console.error("Delete failed", error);
  }
};

  const handleLogout = async () => {
  try {
    await axiosInstance.post("/logout");
  } catch (err) {
    // even if backend fails, still logout frontend
  } finally {
    navigate("/admin", { replace: true });
  }
  };
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
const [dealerData, setDealerData] = useState([]);
const [dealerEditID, setDealerEditID] = useState(null);
const [isAddingDealer, setIsAddingDealer] = useState(false);

const [newDealer, setNewDealer] = useState({
  dealerCode: "",
  dealerName: "",
  email: "",
  comment: "",
  isActive: true,
});

const generateDealerCode = () =>
  "DLR-" + Math.random().toString(36).substring(2, 8).toUpperCase();

const fetchDealers = async () => {
  const res = await axiosInstance.get("/dealers");
  setDealerData(res.data.data);
};

useEffect(() => {
  fetchDealers();
}, []);


const handleDealerChange = (index, field, value) => {
  const updated = [...dealerData];
  updated[index][field] = value;
  setDealerData(updated);
};

const handleDealerToggle = async (dealer) => {
  await axiosInstance.patch(`/updateDealer/${dealer._id}`, {
    ...dealer,
    isActive: !dealer.isActive,
  });
  fetchDealers();
};

const handleDealerUpdate = async (dealer) => {
  await axiosInstance.patch(`/updateDealer/${dealer._id}`, dealer);
  setDealerEditID(null);
  fetchDealers();
};

const handleAddDealer = async () => {
  await axiosInstance.post("/addDealer", newDealer);
  setIsAddingDealer(false);
  setNewDealer({
    dealerCode: "",
    dealerName: "",
    email: "",
    comment: "",
    isActive: true,
  });
  fetchDealers();
};
const handleDeleteDealer = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this dealer?"
  );

  if (!confirmDelete) return;

  try {
    await axiosInstance.delete(`/deleteDealer/${id}`);
    fetchDealers(); // ✅ refresh dealer table
  } catch (error) {
    console.error("Dealer delete failed", error);
  }
};
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      {/* <div className="max-w-5xl mx-auto mb-6 flex justify-between">
        <h1 className="text-2xl font-semibold">Employee Details</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Employee
        </button>
      </div> */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
  <h1 className="text-2xl font-semibold">Employee Details</h1>

  <div className="flex gap-3">
    <button
      onClick={() => setIsAdding(true)}
      className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
    >
      + Add Employee
    </button>

    {/* 🔴 Logout Button */}
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Logout
    </button>
    </div>
    </div>

      <div className="max-w-5xl mx-auto bg-white rounded-br-sm shadow overflow-hidden">
        <table className="w-full text-sm border border-mist-400 ">
          <thead>
            <tr className="">
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-left">Password</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {employeeData.map((e, index) => (
              <tr key={e._id} className="border border-mist-400">
                <td className="p-3 ">
                  <input
                    value={e.fullName}
                    disabled={editID !== e._id}
                    onChange={(ev) =>
                      handleChange(index, "fullName", ev.target.value)
                    }
                    className="border border-mist-400 text-mist-800 px-2 py-1 rounded w-full"
                  />
                </td>

                <td className="p-3 ">
                  <input
                    value={e.email}
                    disabled={editID !== e._id}
                    onChange={(ev) =>
                      handleChange(index, "email", ev.target.value)
                    }
                    className="border border-mist-400 text-mist-800 px-2 py-1 rounded w-full"
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
                    className="border border-mist-400 text-mist-800 px-2 py-1 rounded w-full"
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
                <div className="flex justify-center gap-3">
                {/* ✅ Edit */}
                <button onClick={() => handleEdit(e._id)}>
                 <CiEdit className="text-xl text-indigo-600 hover:text-indigo-800" />
                 </button>

                {/* ✅ Delete */}
                <button onClick={() => handleDeleteEmployee(e._id)}>
                <MdDelete className="text-xl text-red-500 hover:text-red-700" />
                </button>
                </div>
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
      {/* ================= DEALER DETAILS ================= */}
<div className="max-w-5xl mx-auto mt-12">
  <div className="flex justify-between mb-4">
    <h2 className="text-xl font-semibold">Dealer Details</h2>
    <button
      onClick={() => {
        setIsAddingDealer(true);
        setNewDealer({
          ...newDealer,
          dealerCode: generateDealerCode(),
        });
      }}
      className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
    >
      + Add Dealer
    </button>
  </div>

  <div className="bg-white  shadow overflow-hidden">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b">
          <th className="p-3 text-left">Dealer Code</th>
          <th className="p-3 text-left">Dealer Name</th>
          <th className="p-3 text-left">Email</th>
          <th className="p-3 text-left">Comment</th>
          <th className="p-3 text-center">Status</th>
          <th className="p-3 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {dealerData.map((d, i) => (
          <tr key={d._id} className="border-b">
            <td className="p-3 font-mono">{d.dealerCode}</td>

            <td className="p-3">
              <input
                value={d.dealerName}
                disabled={dealerEditID !== d._id}
                onChange={(e) =>
                  handleDealerChange(i, "dealerName", e.target.value)
                }
                className="border border-mist-400 text-mist-800 px-2 py-1 rounded w-full"
              />
            </td>

            <td className="p-3">
              <input
                value={d.email}
                disabled={dealerEditID !== d._id}
                onChange={(e) =>
                  handleDealerChange(i, "email", e.target.value)
                }
                className="border border-mist-400 text-mist-800 px-2 py-1 rounded w-full"
              />
            </td>

            <td className="p-3">
              <input
                value={d.comment}
                disabled={dealerEditID !== d._id}
                onChange={(e) =>
                  handleDealerChange(i, "comment", e.target.value)
                }
                className="border border-mist-400 text-mist-800 px-2 py-1 rounded w-full"
              />
            </td>

            <td className="p-3 text-center">
              <button onClick={() => handleDealerToggle(d)}>
                {d.isActive ? (
                  <FaToggleOn className="text-3xl text-indigo-500" />
                ) : (
                  <FaToggleOff className="text-3xl text-gray-400" />
                )}
              </button>
            </td>
<td className="p-3 text-center">
  {dealerEditID === d._id ? (
    <button
      onClick={() => handleDealerUpdate(d)}   // ✅ dealer update
      className="bg-indigo-500 text-white px-3 py-1 rounded"
    >
      Save
    </button>
  ) : (
    <div className="flex justify-center gap-3">
      {/* ✅ Edit dealer */}
      <button onClick={() => setDealerEditID(d._id)}>
        <CiEdit className="text-xl text-indigo-600 hover:text-indigo-800" />
      </button>

      {/* ✅ Delete dealer */}
      <button onClick={() => handleDeleteDealer(d._id)}>
        <MdDelete className="text-xl text-red-500 hover:text-red-700" />
      </button>
    </div>
  )}
</td>
          </tr>
        ))}

        {isAddingDealer && (
          <tr className="bg-indigo-50">
            <td className="p-3 font-mono">{newDealer.dealerCode}</td>
            <td className="p-3">
              <input
                placeholder="Dealer Name"
                onChange={(e) =>
                  setNewDealer({ ...newDealer, dealerName: e.target.value })
                }
                className="border px-2 py-1 rounded w-full"
              />
            </td>
            <td className="p-3">
              <input
                placeholder="Email"
                onChange={(e) =>
                  setNewDealer({ ...newDealer, email: e.target.value })
                }
                className="border px-2 py-1 rounded w-full"
              />
            </td>
            <td className="p-3">
              <input
                placeholder="Comment"
                onChange={(e) =>
                  setNewDealer({ ...newDealer, comment: e.target.value })
                }
                className="border px-2 py-1 rounded w-full"
              />
            </td>
            <td className="p-3 text-center">Active</td>
            <td className="p-3 text-center">
              <button
                onClick={handleAddDealer}
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
</div>
{/* ================= EMPLOYEE LINKS ================= */}
<div className="max-w-5xl mx-auto mt-16">
  <h2 className="text-xl font-semibold mb-4">Employee Links</h2>

  {/* Search */}
  <div className="flex gap-3 mb-6">
    <input
      type="email"
      placeholder="Enter employee email"
      value={employeeEmail}
      onChange={(e) => setEmployeeEmail(e.target.value)}
      className="flex-1 border px-4 py-2 rounded-lg"
    />
    <button
      onClick={handleSearchEmployeeLinks}
      className="bg-indigo-500 text-white px-6 py-2 rounded-lg"
    >
      Submit
    </button>
  </div>

  {isLinkSearchDone && (
    <p className="text-gray-600 mb-4">
      Results for <span className="font-medium">{searchedEmail}</span>
    </p>
  )}

  {isLinkSearchDone && (
    <div className="bg-white shadow rounded-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <p className="font-medium">Links</p>
        <button
          onClick={handleAddLinkClick}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add Link
        </button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Link Name</th>
            <th className="p-3 text-left">URL</th>
            <th className="p-3 text-center">Active</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {employeeLinks.map((link) => (
            <tr key={link._id} className="border-b">
              {/* Email (immutable) */}
              <td className="p-3">{searchedEmail}</td>

              {/* Link Name */}
              <td className="p-3">
                {editingLinkId === link._id ? (
                  <input
                    defaultValue={link.linkName}
                    onChange={(e) =>
                      setEditLinkRow((prev) => ({
                        ...prev,
                        linkName: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  link.linkName
                )}
              </td>

              {/* URL */}
              <td className="p-3">
                {editingLinkId === link._id ? (
                  <input
                    defaultValue={link.url}
                    onChange={(e) =>
                      setEditLinkRow((prev) => ({
                        ...prev,
                        url: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    {link.url}
                  </a>
                )}
              </td>

              {/* Active Toggle */}
              <td className="p-3 text-center">
                <button
                  onClick={() =>
                    toggleLinkStatus(link._id, link.isActive)
                  }
                >
                  {link.isActive ? (
                    <FaToggleOn className="text-3xl text-indigo-500" />
                  ) : (
                    <FaToggleOff className="text-3xl text-gray-400" />
                  )}
                </button>
              </td>

              {/* Action */}
              <td className="p-3 text-center">
                {editingLinkId === link._id ? (
                  <button
                    onClick={() => handleSaveEditLink(link._id)}
                    className="bg-indigo-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <div className="flex justify-center gap-3">
                    <button onClick={() => handleEditLink(link._id)}>
                      <CiEdit className="text-xl text-indigo-600" />
                    </button>
                    <button onClick={() => deleteLink(link._id)}>
                      <MdDelete className="text-xl text-red-500" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}

          {/* ✅ ADD LINK ROW */}
          {isAddingLink && (
            <tr className="bg-indigo-50">
              <td className="p-3">{newLinkRow.employeeEmail}</td>

              <td className="p-3">
                <input
                  value={newLinkRow.linkName}
                  onChange={(e) =>
                    setNewLinkRow({
                      ...newLinkRow,
                      linkName: e.target.value,
                    })
                  }
                  className="border px-2 py-1 rounded w-full"
                />
              </td>

              <td className="p-3">
                <input
                  value={newLinkRow.url}
                  onChange={(e) =>
                    setNewLinkRow({
                      ...newLinkRow,
                      url: e.target.value,
                    })
                  }
                  className="border px-2 py-1 rounded w-full"
                />
              </td>

              <td className="p-3 text-center">
                <button
                  onClick={() =>
                    setNewLinkRow({
                      ...newLinkRow,
                      isActive: !newLinkRow.isActive,
                    })
                  }
                >
                  {newLinkRow.isActive ? (
                    <FaToggleOn className="text-3xl text-indigo-500" />
                  ) : (
                    <FaToggleOff className="text-3xl text-gray-400" />
                  )}
                </button>
              </td>

              <td className="p-3 text-center">
                <button
                  onClick={handleSaveNewLink}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )}
</div>
{/* ================= GLOBAL LINKS ================= */}
<div className="max-w-5xl mx-auto mt-20">
  <h2 className="text-xl font-semibold mb-4">Global Links</h2>

  <div className="bg-white shadow rounded-lg">
    <div className="flex justify-between items-center p-4 border-b">
      <p className="font-medium">Links available to all employees</p>
      <button
        onClick={handleAddGlobalLinkClick}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        + Add Link
      </button>
    </div>

    <table className="w-full text-sm">
      <thead>
        <tr className="border-b bg-gray-50">
          <th className="p-3 text-left">Link Name</th>
          <th className="p-3 text-left">URL</th>
          <th className="p-3 text-center">Active</th>
          <th className="p-3 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {globalLinks.map((link) => (
          <tr key={link._id} className="border-b">
            <td className="p-3">
              {editingGlobalLinkId === link._id ? (
                <input
                  defaultValue={link.linkName}
                  onChange={(e) =>
                    setEditGlobalLinkRow((p) => ({
                      ...p,
                      linkName: e.target.value,
                    }))
                  }
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                link.linkName
              )}
            </td>

            <td className="p-3">
              {editingGlobalLinkId === link._id ? (
                <input
                  defaultValue={link.url}
                  onChange={(e) =>
                    setEditGlobalLinkRow((p) => ({
                      ...p,
                      url: e.target.value,
                    }))
                  }
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {link.url}
                </a>
              )}
            </td>

            <td className="p-3 text-center">
              <button
                onClick={() =>
                  toggleGlobalLinkStatus(link._id, link.isActive)
                }
              >
                {link.isActive ? (
                  <FaToggleOn className="text-3xl text-indigo-500" />
                ) : (
                  <FaToggleOff className="text-3xl text-gray-400" />
                )}
              </button>
            </td>

            <td className="p-3 text-center">
              {editingGlobalLinkId === link._id ? (
                <button
                  onClick={() => handleSaveEditGlobalLink(link._id)}
                  className="bg-indigo-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              ) : (
                <div className="flex justify-center gap-3">
                  <button onClick={() => handleEditGlobalLink(link._id)}>
                    <CiEdit className="text-xl text-indigo-600" />
                  </button>
                  <button onClick={() => deleteGlobalLink(link._id)}>
                    <MdDelete className="text-xl text-red-500" />
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}

        {isAddingGlobalLink && (
          <tr className="bg-indigo-50">
            <td className="p-3">
              <input
                value={newGlobalLinkRow.linkName}
                onChange={(e) =>
                  setNewGlobalLinkRow({
                    ...newGlobalLinkRow,
                    linkName: e.target.value,
                  })
                }
                className="border px-2 py-1 rounded w-full"
              />
            </td>

            <td className="p-3">
              <input
                value={newGlobalLinkRow.url}
                onChange={(e) =>
                  setNewGlobalLinkRow({
                    ...newGlobalLinkRow,
                    url: e.target.value,
                  })
                }
                className="border px-2 py-1 rounded w-full"
              />
            </td>

            <td className="p-3 text-center">
              <button
                onClick={() =>
                  setNewGlobalLinkRow({
                    ...newGlobalLinkRow,
                    isActive: !newGlobalLinkRow.isActive,
                  })
                }
              >
                {newGlobalLinkRow.isActive ? (
                  <FaToggleOn className="text-3xl text-indigo-500" />
                ) : (
                  <FaToggleOff className="text-3xl text-gray-400" />
                )}
              </button>
            </td>

            <td className="p-3 text-center">
              <button
                onClick={handleSaveNewGlobalLink}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
};

export default EmployeeDetails;
