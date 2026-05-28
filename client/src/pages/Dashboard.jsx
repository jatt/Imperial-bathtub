import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => { if (resData.success) setData(resData); });
  }, [token]);

  if (!data) return <div className="text-center p-10">Loading Dashboard...</div>;

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard Summary</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <h3 className="text-gray-500 uppercase text-sm">Total Products</h3>
          <p className="text-3xl font-bold text-gray-700">{data.stats.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <h3 className="text-gray-500 uppercase text-sm">Contact Enquiries</h3>
          <p className="text-3xl font-bold text-gray-700">{data.stats.totalContacts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
          <h3 className="text-gray-500 uppercase text-sm">Quote Requests (Leads)</h3>
          <p className="text-3xl font-bold text-gray-700">{data.stats.totalQuotes}</p>
        </div>
      </div>

      {/* Latest Submissions List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-3 text-gray-700">Recent Contacts</h2>
          {data.latestSubmissions.contacts.map(c => (
            <div key={c._id} className="border-b py-2 text-sm">
              <strong>{c.name}</strong> ({c.email}) - <span className="text-gray-500">{c.message.substring(0, 40)}...</span>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-3 text-gray-700">Recent Quotes</h2>
          {data.latestSubmissions.quotes.map(q => (
            <div key={q._id} className="border-b py-2 text-sm">
              <strong>{q.name}</strong> - Interest: <span className="text-blue-600 font-medium">{q.interest || 'N/A'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}