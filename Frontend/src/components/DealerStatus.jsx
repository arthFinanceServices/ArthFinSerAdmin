import React, { useState } from "react";
import axiosInstance from "../Api/AxiosInstance";

const DealerStatus = () => {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [dealer, setDealer] = useState(null);
  const [error, setError] = useState("");
  const [inactiveMsg, setInactiveMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInactiveMsg("");
    setDealer(null);

    try {
      const res = await axiosInstance.get(
        `/dealer-by-email?email=${email}`
      );

      setSubmittedEmail(email);

      // ✅ NEW LOGIC: check dealer active status
      if (!res.data.isActive) {
        setInactiveMsg("Dealer is inactive");
        return;
      }

      setDealer(res.data);
    } catch (err) {
      setError("No dealer found for this email");
      setSubmittedEmail(email);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-6">
          Dealer Status
        </h1>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
          <input
            type="email"
            placeholder="Enter dealer email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600"
          >
            Submit
          </button>
        </form>

        {/* After submit text */}
        {submittedEmail && (
          <p className="text-slate-600 mb-4">
            Details of <span className="font-medium">{submittedEmail}</span>
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* Inactive Dealer Message */}
        {inactiveMsg && (
          <p className="text-orange-600 font-medium mb-4">
            {inactiveMsg}
          </p>
        )}

        {/* Dealer Table (ONLY if active) */}
        {dealer && (
          <table className="w-full border text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="border px-4 py-2 text-left">
                  Dealer Code
                </th>
                <th className="border px-4 py-2 text-left">
                  Dealer Name
                </th>
                <th className="border px-4 py-2 text-left">
                  Comment
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-mono">
                  {dealer.dealerCode}
                </td>
                <td className="border px-4 py-2">
                  {dealer.dealerName}
                </td>
                <td className="border px-4 py-2">
                  {dealer.comment || "—"}
                </td>
              </tr>
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
};

export default DealerStatus;
