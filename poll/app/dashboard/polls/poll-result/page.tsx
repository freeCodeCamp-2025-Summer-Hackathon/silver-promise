"use client";


import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);


export default function PollResultPage() {
  const poll = {
    question: "What part of the application would you like to work on?",
    description: "A poll about user dev preference",
    results: [
      { id: 1, text: "Frontend", voteCount: 99, color: "bg-red-400" },
      { id: 2, text: "Backend", voteCount: 36, color: "bg-cyan-400" },
      { id: 3, text: "I can do both", voteCount: 25, color: "bg-gray-300" },
    ],
  };


  const totalVotes = poll.results.reduce((sum, r) => sum + r.voteCount, 0);


  return (
    <section className="w-full min-h-screen bg-[#F5F5F5] p-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Poll Result</h1>
          <p className="text-gray-500 text-sm">Start creating polls</p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Poll Summary + Results */}
          <div className="lg:col-span-2 space-y-6 bg-white rounded-2xl p-6 shadow">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-gray-800">
                {poll.question}
              </h2>
              <p className="text-sm text-gray-500">{poll.description}</p>
            </div>


            {/* Options */}
            <div className="space-y-4 mt-4">
              {poll.results.map((option) => {
                const percent = totalVotes
                  ? Math.round((option.voteCount / totalVotes) * 100)
                  : 0;


                return (
                  <div key={option.id} className="space-y-1">
                    <div className="flex justify-between font-medium text-gray-800">
                      <span>{option.text}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-2 rounded-full ${option.color}`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500">{option.voteCount} votes</p>
                  </div>
                );
              })}
            </div>
          </div>


          {/* RIGHT: Chart + Meta */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl shadow space-y-4">
              <h3 className="text-gray-800 font-semibold text-lg">Votes</h3>
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-800">{totalVotes}</p>
              </div>
              <div className="w-40 mx-auto mt-2">
                <Pie
                  data={{
                    labels: poll.results.map((r) => r.text),
                    datasets: [
                      {
                        data: poll.results.map((r) => r.voteCount),
                        backgroundColor: ["#ef4444", "#06b6d4", "#d1d5db"],
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: { display: false },
                    },
                    rotation: -90,
                    circumference: 360,
                  }}
                />
              </div>
              <p className="text-sm text-center text-gray-600">
                Poll expiry date <br />
                <span className="font-semibold text-black">12 June, 2025</span>
              </p>
            </div>


            <div className="bg-white p-6 rounded-2xl shadow space-y-2">
              <h3 className="text-gray-800 font-semibold text-lg">Share</h3>
              <button className="text-blue-500 text-sm hover:underline w-full text-left">
                Twitter
              </button>
              <button className="text-blue-700 text-sm hover:underline w-full text-left">
                Facebook
              </button>
              <button className="text-gray-700 text-sm hover:underline w-full text-left">
                Copy link
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



