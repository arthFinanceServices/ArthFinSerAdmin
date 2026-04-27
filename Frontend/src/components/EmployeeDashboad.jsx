import React, { useEffect, useState } from "react";
import axiosInstance from "../Api/AxiosInstance";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const [employeeLinks, setEmployeeLinks] = useState([]);
  const [globalLinks, setGlobalLinks] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [employeeName, setEmployeeName] = useState("");

  const fetchEmployeeProfile = async () => {
  try {
    const res = await axiosInstance.get("/employee/me");
    setEmployeeName(res.data.data.fullName);
  } catch (err) {
    console.error("Failed to load employee profile", err);
  }
};

useEffect(() => {
  fetchEmployeeProfile();
}, []);
  /* ================= LOGOUT ================= */

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
    } finally {
      navigate("/employee", { replace: true });
    }
  };

  /* ================= FETCH LINKS ================= */
const fetchLinks = async () => {
  try {
    const employeePromise = axiosInstance.get("/employee-links");
    const globalPromise = axiosInstance.get("/global-links");

    const [employeeRes, globalRes] = await Promise.allSettled([
      employeePromise,
      globalPromise,
    ]);

    if (employeeRes.status === "fulfilled") {
      setEmployeeLinks(employeeRes.value.data.data || []);
    } else {
      setEmployeeLinks([]);
    }

    if (globalRes.status === "fulfilled") {
      const globals = globalRes.value.data.data || [];
      setGlobalLinks(globals);

      const firstActive = globals.find((l) => l.isActive);
      if (firstActive) setSelectedUrl(firstActive.url);
    } else {
      setGlobalLinks([]);
    }
  } catch (err) {
    console.error("Failed to fetch links", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchLinks();
  }, []);

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex flex-col items-center px-4 py-10">
      {/* Header */}{/* w-full">*/}

   {/* Header */}
<div className="max-w-5xl mx-auto mb-6 w-full grid grid-cols-3 items-center">

  {/* ✅ LEFT: Employee profile */}
{/* LEFT: Profile */}
<div className="flex items-center gap-3 justify-start">
  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold shadow">
    {employeeName ? employeeName.charAt(0).toUpperCase() : "E"}
  </div>
  <span className="text-sm font-medium text-gray-800">
    {employeeName || "Employee"}
  </span>
</div>

  {/* ✅ CENTER: Title */}
  <h1 className="text-2xl font-medium text-gray-800 tracking-tight text-center">
    Employee Form
  </h1>

  {/* ✅ RIGHT: Logout */}
  <div className="flex justify-end">
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
    >
      Logout
    </button>
  </div>

</div>


      {/* ✅ SELECT GLOBAL FORM */}
      {!loading && globalLinks.length > 0 && (
        <div className="w-full max-w-2xl mb-4">
          <select
            value={selectedUrl}
            onChange={(e) => setSelectedUrl(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
          >
            {globalLinks
              .filter((link) => link.isActive)
              .map((link) => (
                <option key={link._id} value={link.url}>
                  {link.linkName}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* ✅ IFRAME */}
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-white mb-12">
        {selectedUrl ? (
          <iframe
            src={selectedUrl}
            className="w-full min-h-[620px] border-0 block"
            title="Employee Form"
          />
        ) : (
          <div className="p-6 text-center text-gray-500">
            No form available
          </div>
        )}
      </div>

      {/* ✅ EMPLOYEE QUICK LINKS */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Links
        </h2>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading links...</p>
        ) : employeeLinks.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No links assigned to you.
          </p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {employeeLinks
              .filter((link) => link.isActive)
              .map((link) => (
                <button
                  key={link._id}
                  onClick={() => window.open(link.url, "_blank")}
                  className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition"
                >
                  {link.linkName}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
