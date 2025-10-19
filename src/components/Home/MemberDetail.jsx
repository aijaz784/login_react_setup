import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MemberDetail = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    testName: "",
    hospitalOrLab: "",
    doctorName: "",
    date: "",
    price: "",
    additionalNotes: "",
    bpSystolic: "",
    bpDiastolic: "",
    temperature: "",
    fastingSugar: "",
    height: "",
    weight: "",
    files: [],
  });

  const navigate = useNavigate();

  // 🧍 Fetch family member
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch(`http://localhost:7000/api/family/${id}`);
        const data = await res.json();
        if (data.success) setMember(data.member);
      } catch (err) {
        console.error("Error fetching member:", err);
      }
    };
    fetchMember();
  }, [id]);

  // 📄 Fetch all reports of this member
  const fetchReports = async () => {
    try {
      const res = await fetch(`http://localhost:7000/api/reports/member/${id}`);
      const data = await res.json();
      if (data.success) setReports(data.reports);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [id]);

  // ✍️ Handle inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, files: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 📤 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("familyMember", id);
      for (let key in formData) {
        if (key === "files") {
          for (let file of formData.files) fd.append("files", file);
        } else {
          fd.append(key, formData[key]);
        }
      }

      const res = await fetch("http://localhost:7000/api/reports/add", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (data.success) {
        alert("Report uploaded successfully!");
        setShowModal(false);
        fetchReports();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    }
  };

  if (!member) return <p className="text-center mt-20">Loading...</p>;

  return (
    
    <div className=" mt-20 bg-white dark:bg-gray-900  rounded-2xl p-6">
      

      <div className="text-center mb-6">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-24 h-24 mx-auto rounded-full border-4 border-green-400 mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
        <p className="text-green-600 dark:text-green-400 font-medium mb-2">
          {member.relation}
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Added on: {new Date(member.createdAt).toLocaleDateString()}
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="mt-4 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          ➕ Add Report
        </button>
      </div>

      {/* 📋 Reports Table */}
      <div className="mt-8 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-3">🧾 Uploaded Reports</h3>

        {reports.length === 0 ? (
          <p className="text-gray-500">No reports uploaded yet.</p>
        ) : (
          <table className="w-full text-left border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Test</th>
                <th className="p-2">Hospital</th>
                <th className="p-2">Doctor</th>


                <th className="p-2">BP</th>
                <th className="p-2">Temp</th>
                <th className="p-2">Sugar</th>
                <th className="p-2">Date</th>
                <th className="p-2 text-center">Files</th>
                <th className="p-2 text-center">Feedback</th>


              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr
                  key={r._id}
                  className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-2">{r.title}</td>
                  <td className="p-2">{r.testName}</td>
                  <td className="p-2">{r.hospitalOrLab}</td>
                  <td className="p-2">{r.doctorName}</td>
                  <td className="p-2">
                    {r.bpSystolic && r.bpDiastolic
                      ? `${r.bpSystolic}/${r.bpDiastolic}`
                      : "—"}
                  </td>
                  <td className="p-2">{r.temperature || "—"}</td>
                  <td className="p-2">{r.fastingSugar || "—"}</td>
                  <td className="p-2">
                    {new Date(r.date).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-center">
                    {r.files.map((f, i) => (
                      <a
                        key={i}
                        href={f.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline mr-2"
                      >
                        {f.fileType === "pdf" ? "📄 PDF" : "🖼️ Img"}
                      </a>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 🧾 Modal for Upload */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Upload Report
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Basic Info */}
              <input
                name="title"
                placeholder="Report Title"
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                name="testName"
                placeholder="Test Name"
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                name="hospitalOrLab"
                placeholder="Hospital / Lab"
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                name="doctorName"
                placeholder="Doctor Name"
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                name="date"
                type="date"
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
              />

              {/* Health Vitals */}
              <h4 className="mt-3 mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Health Vitals
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  name="bpSystolic"
                  type="number"
                  placeholder="BP Systolic"
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
                <input
                  name="bpDiastolic"
                  type="number"
                  placeholder="BP Diastolic"
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
                <input
                  name="temperature"
                  type="number"
                  placeholder="Temp (°C)"
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
                <input
                  name="fastingSugar"
                  type="number"
                  placeholder="Sugar (mg/dL)"
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
                <input
                  name="height"
                  type="number"
                  placeholder="Height (cm)"
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
                <input
                  name="weight"
                  type="number"
                  placeholder="Weight (kg)"
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
              </div>

              <textarea
                name="additionalNotes"
                placeholder="Additional Notes"
                onChange={handleChange}
                className="w-full p-2 mt-2 border rounded"
              />
              <input
                name="files"
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={handleChange}
                className="w-full p-2 mt-2 mb-3 border rounded"
                required
              />

              <div className="flex justify-between mt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDetail;
