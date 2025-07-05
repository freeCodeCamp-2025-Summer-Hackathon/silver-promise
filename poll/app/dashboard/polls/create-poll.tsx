"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import FloatingLabelInput from "@/app/ui-components/inputs/FloatingLabelInput";
import FloatingLabelSelectInput from "@/app/ui-components/inputs/FloatingLabelSelectInput";

const pollTypes = [
    { value: "single-choice", label: "Single Choice" },
    { value: "multiple-choice", label: "Multiple Choice" },
    { value: "open-ended", label: "Open Ended" },
];

interface PollOption {
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

export const CreatePoll = () => {
    const [pollType, setPollType] = useState("");
    const [singlechoiceOptions, setSingleChoiceOptions] = useState<
        PollOption[]
    >([{ id: "Option1", label: "Option 1", value: "Option 1" }]);
    const [editingOptionId, setEditingOptionId] = useState<string | null>(null);
    const [editedValue, setEditedValue] = useState<string>("");
    const editRef = useRef<HTMLDivElement | null>(null);

    const handleUpdateAndExitEditMode = useCallback(() => {
        if (editingOptionId) {
            const valueToSet = editedValue.trim();
            if (valueToSet) {
                setSingleChoiceOptions((prev) =>
                    prev.map((opt) =>
                        opt.id === editingOptionId
                            ? { ...opt, label: valueToSet, value: valueToSet }
                            : opt
                    )
                );
            }
        }
        setEditingOptionId(null);
        setEditedValue("");
    }, [editingOptionId, editedValue]);

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
        const newOption: PollOption = {
            id: newId,
            label: `Option ${singlechoiceOptions.length + 1}`,
            value: `Option ${singlechoiceOptions.length + 1}`,
        };
        setSingleChoiceOptions((prev) => [...prev, newOption]);
    };

    const handleStartEditing = (option: PollOption) => {
        setEditingOptionId(option.id);
        setEditedValue(option.value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedValue(e.target.value);
    };

    const handleDeleteOption = (id: string) => {
        setSingleChoiceOptions((prev) => prev.filter((opt) => opt.id !== id));
    };

    return (
        <section className="m-4 flex max-h-screen flex-col rounded-2xl bg-[#f7f7f7] p-6">
            <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                <div className="min-h-screen rounded-xl bg-white p-6">
                    <form>
                        <fieldset>
                            <legend></legend>

                            <div className="mt-6 flex flex-col gap-6">
                                <FloatingLabelInput
                                    label="Enter poll title"
                                    type="text"
                                    name="pollTitle"
                                    value=""
                                    onChange={() => {}}
                                />

                                <FloatingLabelInput
                                    label="Write brief description about the poll"
                                    type="text"
                                    name="pollDescription"
                                    value=""
                                    onChange={() => {}}
                                />
                            </div>
                        </fieldset>

                        <fieldset className="border-dark-gray mt-6 rounded-xl border p-6">
                            <legend>Create questions</legend>
                            <div className="mt-6 flex flex-col gap-6">
                                <FloatingLabelInput
                                    label="Enter poll question"
                                    type="text"
                                    name="pollQuestion"
                                    value=""
                                    onChange={() => {}}
                                />
                                <FloatingLabelSelectInput
                                    label="Select poll type"
                                    value={pollType}
                                    options={pollTypes}
                                    onChange={handleSelectPollType}
                                />

                                <div>
                                    {pollType === "single-choice" && (
                                        <div className="text-dark-gray text-sm">
                                            {singlechoiceOptions.map(
                                                (option) => (
                                                    <div
                                                        key={option.id}
                                                        className="mb-2 flex items-center"
                                                    >
                                                        <input
                                                            type="radio"
                                                            id={option.id}
                                                            name="singlechoice"
                                                            className="mr-2"
                                                            value={option.value}
                                                        />
                                                        {editingOptionId ===
                                                        option.id ? (
                                                            <div
                                                                ref={editRef}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <input
                                                                    type="text"
                                                                    name="value"
                                                                    value={
                                                                        editedValue
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                    className="rounded border p-1"
                                                                    placeholder="Option"
                                                                    autoFocus
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={
                                                                        handleUpdateAndExitEditMode
                                                                    }
                                                                    className="text-blue-500"
                                                                >
                                                                    Update
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-4">
                                                                <p>
                                                                    {
                                                                        option.value
                                                                    }
                                                                </p>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleStartEditing(
                                                                            option
                                                                        )
                                                                    }
                                                                    className="text-blue-500"
                                                                >
                                                                    edit
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleDeleteOption(
                                                                            option.id
                                                                        )
                                                                    }
                                                                    className="text-red-500"
                                                                >
                                                                    delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            )}

                                            <button
                                                type="button"
                                                onClick={
                                                    handleAddSinglChoiceOption
                                                }
                                                className="mt-2 text-blue-500"
                                            >
                                                Add options
                                            </button>
                                        </div>
                                    )}
                                    {pollType === "multiple-choice" && (
                                        <p className="text-dark-gray text-sm">
                                            You selected Multiple Choice Poll
                                            Type
                                        </p>
                                    )}
                                    {pollType === "open-ended" && (
                                        <p className="text-dark-gray text-sm">
                                            You selected Open Ended Poll Type
                                        </p>
                                    )}
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div className="min-h-screen rounded-xl bg-white p-6">
                    This is the poll section
                </div>
            </section>
        </section>
    );
};
export const metadata = {
    title: "Create Poll",
    description: "Create a new poll for your audience.",
};
