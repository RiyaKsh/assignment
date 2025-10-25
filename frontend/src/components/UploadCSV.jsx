import React, { useState } from "react";
import { Upload } from "lucide-react";
import API from "../axios";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!validTypes.includes(selected.type)) {
      alert("Please upload a valid file format (.csv, .xls, .xlsx)");
      return;
    }

    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setMessage("");
      const { data } = await API.post("/lists/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("File uploaded and distributed successfully!");
      setFile(null); // reset file input
      console.log("Distributed data:", data);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 w-full">
      <h3 className="text-base font-medium text-gray-800 mb-4">Upload CSV File</h3>

      {message && (
        <p className={`mb-4 text-sm ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}

      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">CSV Format:</span> FirstName, Phone, Notes
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Accepted formats: <code>.csv</code>, <code>.xlsx</code>, <code>.xls</code>
      </p>

      <div className="flex items-center gap-3">
        <label
          htmlFor="fileInput"
          className="flex items-center gap-2 bg-[#0A0A17] text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-black transition"
        >
          <Upload size={16} />
          Choose File
        </label>

        <input
          id="fileInput"
          type="file"
          accept=".csv, .xls, .xlsx"
          className="hidden"
          onChange={handleFileChange}
        />

        {file && <span className="text-sm text-gray-700">{file.name}</span>}
      </div>

      {file && (
        <button
          onClick={handleUpload}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md transition"
        >
          Upload
        </button>
      )}
    </div>
  );
};

export default UploadCSV;
