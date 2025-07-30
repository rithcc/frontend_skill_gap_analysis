import React, { useState } from "react";

const useCases = [
  {
    title: "ADAS Parking Assistance",
    desc: "Assists drivers in parking by automating steering, acceleration, and braking.",
    tags: ["Comfort", "Level 2", "Automation", "Comfort"],
  },
  {
    title: "Lane Keep Assist (LKA)",
    desc: "Automatically keeps the vehicle centered in the lane.",
    tags: ["Safety", "Level 2", "Safety", "Automation"],
  },
  {
    title: "Adaptive Cruise Control",
    desc: "Maintains safe distance by adapting vehicle speed based on traffic ahead.",
    tags: ["Comfort", "Level 2", "Comfort", "Safety"],
  },
  {
    title: "Automatic Emergency Braking (AEB)",
    desc: "Detects possible collisions and applies brakes to prevent/mitigate impact.",
    tags: ["Safety", "Level 2", "Safety", "Critical"],
  },
  {
    title: "Blind Spot Detection",
    desc: "Alerts driver to vehicles in blind spots using radar or camera sensors.",
    tags: ["Safety", "Level 2"],
  },
  {
    title: "Traffic Sign Recognition",
    desc: "Uses cameras to detect and interpret traffic signs for display or control.",
    tags: ["Safety", "Level 2", "Vision"],
  },
  {
    title: "Cross Traffic Alert",
    desc: "Warns of crossing vehicles when reversing out of parking spots.",
    tags: ["Safety", "Level 1"],
  },
  {
    title: "Driver Monitoring System",
    desc: "Tracks driver attention level using camera-based tracking or sensors.",
    tags: ["Safety", "Level 2"],
  },
];

export default function ADASUseCaseSelection() {
  const [search, setSearch] = useState("");
  const filteredUseCases = useCases.filter((u) =>
    u.title.toLowerCase().includes(search.toLowerCase()) ||
    u.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center h-full">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-6 mt-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Select ADAS Use Case</h2>
            <p className="text-gray-600 text-base">Choose one or more ADAS use cases for skill, resource, or roadmap analysis</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search use cases..."
              className="border rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select className="border rounded-lg px-2 py-2 bg-white">
              <option>All Categories</option>
              <option>Comfort</option>
              <option>Safety</option>
              <option>Automation</option>
              <option>Critical</option>
              <option>Vision</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mb-8">
          {filteredUseCases.map((u, idx) => (
            <div key={u.title} className="bg-white rounded-xl shadow border border-gray-100 p-5 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                  {/* Icon placeholder */}
                  <span className="text-lg">{String.fromCodePoint(0x1F697 + idx)}</span>
                </span>
                <span className="font-semibold text-gray-900 text-base">{u.title}</span>
              </div>
              <div className="text-gray-600 text-sm mb-3 min-h-[40px]">{u.desc}</div>
              <div className="flex flex-wrap gap-1 mb-3">
                {u.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">{tag}</span>
                ))}
              </div>
              <button className="mt-auto text-blue-600 hover:underline text-sm font-medium text-left">Learn More &gt;</button>
            </div>
          ))}
        </div>
        <div className="flex justify-end w-full">
          <button className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg font-semibold cursor-not-allowed" disabled>Continue &gt;</button>
        </div>
      </div>
  );
}
