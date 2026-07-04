"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resume) {
      alert("Please upload resume.");
      return;
    }

    if (!jobDescription) {
      alert("Please enter Job Description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyResume = () => {
    if (!result) return;

    navigator.clipboard.writeText(result.customized_resume);

    alert("Resume copied successfully!");
  };

  const downloadResume = () => {
    if (!result) return;

    const blob = new Blob([result.customized_resume], {
      type: "text/plain",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "Customized_Resume.txt";

    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-5xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          AI Resume Customizer
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6">

          <label className="block font-semibold mb-2">
            Upload Resume (PDF)
          </label>

          <input
            type="file"
            accept=".pdf"
            className="mb-6"
            onChange={(e) => {
              if (e.target.files) {
                setResume(e.target.files[0]);
              }
            }}
          />

          <label className="block font-semibold mb-2">
            Job Description
          </label>

          <textarea
            rows={10}
            placeholder="Paste Job Description..."
            className="w-full border rounded-lg p-4 mb-6"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {loading
              ? "Customizing Resume..."
              : "Customize Resume"}
          </button>

        </div>

        {result && (

          <div className="bg-white shadow-lg rounded-lg mt-10 p-6">

            <h2 className="text-3xl font-bold text-green-700 mb-5">
              Customized Resume
            </h2>

            <div className="bg-gray-50 border rounded-lg p-5 whitespace-pre-wrap">
              {result.customized_resume}
            </div>

            <div className="flex gap-4 mt-6">

              <button
                onClick={copyResume}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
              >
                Copy Resume
              </button>

              <button
                onClick={downloadResume}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
              >
                Download Resume
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}