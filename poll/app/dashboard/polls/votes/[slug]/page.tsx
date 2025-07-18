"use client"

import { SideNavbar } from "@/app/ui-components/navbars/side-navbar"
import { useState } from "react"
import { toast } from "sonner"

export default function PollDetailPage() {
  const [submitting, setSubmitting] = useState(false)

  const poll = {
    title: "Dev Direction Poll",
    description: "Help us decide which area to improve next.",
    question: "Which part of the app should we improve?",
    options: [
      { id: "1", text: "Login / Signup flow" },
      { id: "2", text: "Poll Creation UX" },
      { id: "3", text: "Voting Page Design" },
      { id: "4", text: "Results & Analytics" },
    ],
  }

  const handleVote = (optionId: string) => {
    setSubmitting(true)
    setTimeout(() => {
      toast.success("✅ Vote submitted!")
      setSubmitting(false)
    }, 700)
  }

  return (
    <div className="flex min-h-screen bg-panel-background text-foreground">
      {/* Sidebar */}
      {/* <SideNavbar /> */}

      {/* Main Content */}
      <section className="m-4 flex-1 rounded-2xl bg-cards-background p-6">
        <div className="flex flex-col gap-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold">Poll Voting</h1>
            <p className="text-sm text-cards-foreground">
              Choose one option below
            </p>
          </div>

          {/* Poll Container */}
          <div className="rounded-xl bg-white p-6 shadow max-w-3xl">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-semibold">{poll.question}</h2>
              <p className="text-sm text-gray-700">{poll.description}</p>
            </div>

            <div className="space-y-4">
              {poll.options.map((opt, idx) => (
                <div
                  key={opt.id}
                  className="flex justify-between items-center rounded-lg bg-gray-100 px-4 py-3"
                >
                  <span className="font-medium">
                    {idx + 1}. {opt.text}
                  </span>
                  <button
                    onClick={() => handleVote(opt.id)}
                    disabled={submitting}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 disabled:opacity-50"
                  >
                    Vote
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
