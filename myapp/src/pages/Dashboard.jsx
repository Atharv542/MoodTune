import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [top3, setTop3] = useState([]);
  const [daily, setDaily] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("https://moodtune-backend-production.up.railway.app/dashboard-data");
      const data = await res.json();
      if (data.error) {
        console.error(data.error);
        return;
      }
      setTop3(data.top3 || []);
      setDaily(data.daily || {});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">Your Mood Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Top 3 Emotions</h2>
          <img src="https://moodtune-backend-production.up.railway.app/plot/top3.png" alt="Top3" />
          <div className="mt-4">
            {top3.length === 0 && <p className="text-gray-400">No data yet.</p>}
            {top3.map((t) => (
              <div key={t.emotion} className="flex justify-between text-gray-200">
                <span>{t.emotion}</span>
                <span>{t.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Last 7 Days — Emotions</h2>
          <img src="https://moodtune-backend-production.up.railway.app/plot/daily.png" alt="Daily" />
          <div className="mt-4 text-sm text-gray-400">
            This chart shows stacked counts per emotion for the last 7 days.
          </div>
        </div>
      </div>
    </div>
  );
}
