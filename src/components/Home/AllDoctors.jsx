import React, { useEffect, useState } from "react";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // ✅ Fetch all doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:7000/api/doctors/getDoctor");
        const data = await res.json();
        if (data.success) {
          setDoctors(data.doctors);
        } else {
          console.error("Failed to load doctors:", data.message);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-6">
          Meet All Our Doctors 👨‍⚕️👩‍⚕️
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Our HealthMate medical team brings together expert doctors from multiple
          specializations — ready to help you understand your reports and stay healthy.
        </p>

        {/* ✅ Doctor Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <img
                src={doc.imageUrl}
                alt={doc.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover border-4 border-green-300 dark:border-green-600"
              />
              <h3 className="text-xl font-semibold mb-1">{doc.name}</h3>
              <p className="text-green-600 dark:text-green-400 font-medium mb-1">
                {doc.specialization}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-1">
                {doc.hospitalName}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Experience: {doc.experience} years
              </p>
              <button
                onClick={() => setSelectedDoctor(doc)}
                className="bg-green-600 text-white py-2 px-5 rounded-full text-sm hover:bg-green-700 active:scale-95 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl max-w-lg w-full relative">
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl"
              onClick={() => setSelectedDoctor(null)}
            >
              &times;
            </button>
            <div className="text-center">
              <img
                src={selectedDoctor.imageUrl}
                alt={selectedDoctor.name}
                className="w-28 h-28 mx-auto rounded-full border-4 border-green-400 mb-4 object-cover"
              />
              <h2 className="text-2xl font-bold mb-1">{selectedDoctor.name}</h2>
              <p className="text-green-600 dark:text-green-400 mb-3">
                {selectedDoctor.specialization}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Qualification:</strong> {selectedDoctor.qualification}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Hospital:</strong> {selectedDoctor.hospitalName}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Address:</strong> {selectedDoctor.hospitalAddress}, {selectedDoctor.city}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Experience:</strong> {selectedDoctor.experience} years
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Consultation Fee:</strong> Rs. {selectedDoctor.consultationFee}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Available Days:</strong> {selectedDoctor.availableDays.join(", ")}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Timings:</strong> {selectedDoctor.timings.start} - {selectedDoctor.timings.end}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4 italic">
                “{selectedDoctor.bio}”
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDoctors;
