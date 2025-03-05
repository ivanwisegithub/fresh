import { useEffect, useState } from "react";
import axios from "axios";

const FarmSales = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/submissions")
      .then(response => setSubmissions(response.data))
      .catch(error => console.error("Error fetching submissions", error));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Farm Sales Submissions</h2>
      {submissions.map((submission, index) => (
        <div key={index} className="p-4 border rounded mb-4">
          <p><strong>Name:</strong> {submission.name}</p>
          <p><strong>Email:</strong> {submission.email}</p>
          <p><strong>Message:</strong> {submission.message}</p>
          <p className="text-blue-600"><strong>AI Analysis:</strong> {submission.aiResponse}</p>
        </div>
      ))}
    </div>
  );
};

export default FarmSales;
