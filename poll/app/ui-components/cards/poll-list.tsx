"use client";

import { EditIcon } from "@/public/svgs/edit";
import { DeleteIcon } from "@/public/svgs/delete";
import { ShareIcon } from "@/public/svgs/share";

interface pollData {
    poll_title: string;
    poll_description: string;
    poll_question: string;
    poll_type: string;
    poll_options: pollOption[];
}

interface pollOption {
    id: string;
    label: string;
    value: string;
}

interface PollListProps {
    allPolls: pollData[];
}

export const PollList: React.FC<PollListProps> = ({ allPolls }) => {
    return (
        <div>
            <h2 className="text-dark-gray mb-4 font-bold">Polls</h2>
            {allPolls.map((poll, index) => (
                <details
                    key={index}
                    className="mb-6 rounded-lg border border-[#e1e1e1] p-4"
                >
                    <summary className="cursor-pointer font-semibold">
                        {poll.poll_question}
                    </summary>

                    <div className="text-dark-gray mt-4 flex flex-col gap-2 text-sm">
                        {poll.poll_type === "single-choice" &&
                            poll.poll_options.map((option) => (
                                <div
                                    key={option.id}
                                    className="flex items-center"
                                >
                                    <input
                                        type="radio"
                                        id={`${poll.poll_question}-${option.id}`}
                                        name={`poll-option-${poll.poll_question}`}
                                        value={option.value}
                                        className="mr-2"
                                    />
                                    <label
                                        htmlFor={`${poll.poll_question}-${option.id}`}
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        {poll.poll_type === "multiple-choice" &&
                            poll.poll_options.map((option) => (
                                <div
                                    key={option.id}
                                    className="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        id={`${poll.poll_question}-${option.id}`}
                                        name={`poll-option-${poll.poll_question}`}
                                        value={option.value}
                                        className="mr-2"
                                    />
                                    <label
                                        htmlFor={`${poll.poll_question}-${option.id}`}
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        {poll.poll_type === "open-ended" && (
                            <textarea
                                rows={4}
                                className="w-full rounded border p-2"
                                placeholder="Your answer..."
                            ></textarea>
                        )}
                    </div>
                    <div className="text-dark-gray mt-6 flex items-center justify-between text-xs">
                        <div>3hrs ago</div>
                        <div className="flex items-center gap-4">
                            <span className="h-5 w-5">
                                <EditIcon />
                            </span>
                            <span className="block h-5 w-5">
                                <ShareIcon />
                            </span>
                            <span className="block h-5 w-5">
                                {" "}
                                <DeleteIcon />
                            </span>
                        </div>
                    </div>
                </details>
            ))}
        </div>
    );
};
