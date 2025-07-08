"use client";

import { useState, useRef, useEffect, useCallback, FormEvent } from "react";
import { CreatePollForm } from "@/app/ui-components/forms/create-poll-form";
import { PollList } from "@/app/ui-components/cards/poll-list";

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

// Custom hook to handle clicks outside a specified element
const useOnClickOutside = <T extends Node = Node>(
    ref: React.RefObject<T>,
    handler: (event: MouseEvent | TouchEvent) => void
) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};

/**
 *
 * @returns JSX.Element
 * @description function that creates user polls
 */

// Mock API functions
const mockApi = {
    getPolls: async (): Promise<pollData[]> => {
        const savedPolls = localStorage.getItem("createpolldata");
        if (savedPolls) {
            return JSON.parse(savedPolls);
        }
        return [];
    },
    createPoll: async (pollData: pollData): Promise<pollData> => {
        const existingPolls = await mockApi.getPolls();
        const updatedPolls = [...existingPolls, pollData];
        localStorage.setItem("createpolldata", JSON.stringify(updatedPolls));
        return pollData;
    },
};

export const CreatePoll = () => {
    const [pollType, setPollType] = useState("");

    //setting single choice options
    const [singlechoiceOptions, setSingleChoiceOptions] = useState<
        pollOption[]
    >([{ id: "Option1", label: "Option 1", value: "Option 1" }]);

    const [multichoiceOptions, setMultiChoiceOptions] = useState<pollOption[]>([
        { id: "choice1", label: "Choice 1", value: "Choice 1" },
    ]);

    console.log(singlechoiceOptions);

    const [editingOptionId, setEditingOptionId] = useState<string | null>(null);
    const [editedValue, setEditedValue] = useState<string>("");
    const editRef = useRef<HTMLDivElement | null>(null);

    const [createPollValues, setCreatePollValues] = useState<pollData>({
        poll_title: "",
        poll_description: "",
        poll_type: "",
        poll_options: [],
        poll_question: "",
    });
    const [submittedPoll, setSubmittedPoll] = useState<pollData | null>(null);
    const [allPolls, setAllPolls] = useState<pollData[]>([]);

    console.log(createPollValues);

    //to retrieve the stored createpolldata after the component renders
    useEffect(() => {
        const fetchPolls = async () => {
            const polls = await mockApi.getPolls();
            setAllPolls(polls);
        };
        fetchPolls();
    }, [submittedPoll]);

    //handles component update and exit update mode
    const handleUpdateAndExitEditMode = useCallback(() => {
        if (editingOptionId) {
            const valueToSet = editedValue.trim();
            if (valueToSet) {
                if (pollType === "single-choice") {
                    setSingleChoiceOptions((prev) =>
                        prev.map((opt) =>
                            opt.id === editingOptionId
                                ? {
                                      ...opt,
                                      label: valueToSet,
                                      value: valueToSet,
                                  }
                                : opt
                        )
                    );
                } else if (pollType === "multiple-choice") {
                    setMultiChoiceOptions((prev) =>
                        prev.map((opt) =>
                            opt.id === editingOptionId
                                ? {
                                      ...opt,
                                      label: valueToSet,
                                      value: valueToSet,
                                  }
                                : opt
                        )
                    );
                }
            }
        }
        setEditingOptionId(null);
        setEditedValue("");
    }, [editingOptionId, editedValue, pollType]);

    //@ts-expect-error Type 'HTMLDivElement | null' is not assignable to type 'Node'
    useOnClickOutside(editRef, handleUpdateAndExitEditMode);

    const handleSelectPollType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPollType(e.target.value);
    };

    const handleAddSingleChoiceOption = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        const newId = `Option${singlechoiceOptions.length + 1}`;
        const newOption: pollOption = {
            id: newId,
            label: `Option ${singlechoiceOptions.length + 1}`,
            value: `Option ${singlechoiceOptions.length + 1}`,
        };
        setSingleChoiceOptions((prev) => [...prev, newOption]);
    };

    const handleAddMultiChoiceOption = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        const newId = `choice${multichoiceOptions.length + 1}`;
        const newChoice: pollOption = {
            id: newId,
            label: `choice ${multichoiceOptions.length + 1}`,
            value: `choice ${multichoiceOptions.length + 1}`,
        };
        setMultiChoiceOptions((prev) => [...prev, newChoice]);
    };

    const handleStartEditing = (option: pollOption) => {
        setEditingOptionId(option.id);
        setEditedValue(option.value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedValue(e.target.value);
    };

    const handleDeleteOption = (id: string) => {
        if (pollType === "single-choice") {
            setSingleChoiceOptions((prev) =>
                prev.filter((opt) => opt.id !== id)
            );
        } else if (pollType === "multiple-choice") {
            setMultiChoiceOptions((prev) =>
                prev.filter((opt) => opt.id !== id)
            );
        }
    };

    const handleCreatePollValueChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setCreatePollValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //creates polls and store them in localstorage
    const handleCreatePoll = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const pollData = {
            ...createPollValues,
            poll_type: pollType,
            poll_options:
                pollType === "single-choice"
                    ? singlechoiceOptions
                    : multichoiceOptions,
        };
        setSubmittedPoll(pollData);
        console.log(pollData);

        const newPoll = await mockApi.createPoll(pollData);
        setAllPolls((prevPolls) => [...prevPolls, newPoll]);

        setCreatePollValues({
            poll_title: "",
            poll_description: "",
            poll_type: "",
            poll_options: [],
            poll_question: "",
        });
        setPollType("");
        setSingleChoiceOptions([
            { id: "Option1", label: "Option 1", value: "Option 1" },
        ]);
        setMultiChoiceOptions([
            { id: "choice1", label: "Choice 1", value: "Choice 1" },
        ]);
    };

    return (
        <section className="m-4 flex max-h-screen flex-col rounded-2xl bg-[#f7f7f7] p-6">
            <h4 className="text-2xl font-bold">Create Poll</h4>
            <p className="mb-6 text-[#7b7b7b]">Start creating polls</p>
            <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                <div className="min-h-screen rounded-xl bg-white p-6">
                    <CreatePollForm
                        pollType={pollType}
                        singlechoiceOptions={singlechoiceOptions}
                        editingOptionId={editingOptionId}
                        editedValue={editedValue}
                        createPollValues={createPollValues}
                        editRef={editRef}
                        handleCreatePollValueChange={
                            handleCreatePollValueChange
                        }
                        handleSelectPollType={handleSelectPollType}
                        handleInputChange={handleInputChange}
                        handleUpdateAndExitEditMode={
                            handleUpdateAndExitEditMode
                        }
                        handleStartEditing={handleStartEditing}
                        handleDeleteOption={handleDeleteOption}
                        handleAddSingleChoiceOption={
                            handleAddSingleChoiceOption
                        }
                        handleCreatePoll={handleCreatePoll}
                        handleAddMultiChoiceOption={handleAddMultiChoiceOption}
                        multichoiceOptions={multichoiceOptions}
                    />
                </div>
                <div className="min-h-screen rounded-xl bg-white p-6">
                    {allPolls.length > 0 && <PollList allPolls={allPolls} />}
                </div>
            </section>
        </section>
    );
};
export const metadata = {
    title: "Create Poll",
    description: "Create a new poll for your audience.",
};
