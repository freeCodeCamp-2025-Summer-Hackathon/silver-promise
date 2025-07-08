"use client";

import { FormEvent } from "react";
import FloatingLabelInput from "@/app/ui-components/inputs/FloatingLabelInput";
import FloatingLabelSelectInput from "@/app/ui-components/inputs/FloatingLabelSelectInput";
import { EditIcon } from "@/public/svgs/edit";
import { DeleteIcon } from "@/public/svgs/delete";
import { PrimaryButtonWithArrowRight } from "@/app/ui-components/buttons/PrimaryButton";

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

interface CreatePollFormProps {
    pollType: string;
    singlechoiceOptions: pollOption[];
    multichoiceOptions: pollOption[];
    editingOptionId: string | null;
    editedValue: string;
    createPollValues: pollData;
    editRef: React.RefObject<HTMLDivElement | null>;
    handleCreatePollValueChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    handleSelectPollType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateAndExitEditMode: () => void;
    handleStartEditing: (option: pollOption) => void;
    handleDeleteOption: (id: string) => void;
    handleAddSingleChoiceOption: (
        e: React.MouseEvent<HTMLButtonElement>
    ) => void;
    handleAddMultiChoiceOption: (
        e: React.MouseEvent<HTMLButtonElement>
    ) => void;
    handleCreatePoll: (e: FormEvent<HTMLButtonElement>) => void;
}

const pollTypes = [
    { value: "single-choice", label: "Single Choice" },
    { value: "multiple-choice", label: "Multiple Choice" },
    { value: "open-ended", label: "Open Ended" },
];

export const CreatePollForm: React.FC<CreatePollFormProps> = ({
    pollType,
    singlechoiceOptions,
    multichoiceOptions,
    editingOptionId,
    editedValue,
    createPollValues,
    editRef,
    handleCreatePollValueChange,
    handleSelectPollType,
    handleInputChange,
    handleUpdateAndExitEditMode,
    handleStartEditing,
    handleDeleteOption,
    handleAddSingleChoiceOption,
    handleAddMultiChoiceOption,
    handleCreatePoll,
}) => {
    return (
        <form>
            <fieldset>
                <legend></legend>

                <div className="mt-6 flex flex-col gap-6">
                    <FloatingLabelInput
                        label="Enter poll title"
                        type="text"
                        name="poll_title"
                        value={createPollValues.poll_title}
                        onChange={handleCreatePollValueChange}
                    />

                    <FloatingLabelInput
                        label="Write brief description about the poll"
                        type="text"
                        name="poll_description"
                        value={createPollValues.poll_description}
                        onChange={handleCreatePollValueChange}
                    />
                </div>
            </fieldset>

            <fieldset className="border-dark-gray mt-6 rounded-xl border p-6">
                <legend>Create questions</legend>
                <div className="mt-6 flex flex-col gap-6">
                    <FloatingLabelInput
                        label="Enter poll question"
                        type="text"
                        name="poll_question"
                        value={createPollValues.poll_question}
                        onChange={handleCreatePollValueChange}
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
                                {singlechoiceOptions.map((option) => (
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
                                        {editingOptionId === option.id ? (
                                            <div
                                                ref={editRef}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="text"
                                                    name="value"
                                                    value={editedValue}
                                                    onChange={handleInputChange}
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
                                            <div className="flex items-center gap-6">
                                                <p>{option.value}</p>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleStartEditing(
                                                            option
                                                        )
                                                    }
                                                    className="text-blue-500"
                                                >
                                                    <EditIcon />
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
                                                    <span className="block h-5 w-5">
                                                        <DeleteIcon />
                                                    </span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={handleAddSingleChoiceOption}
                                    className="mt-2 text-blue-500"
                                >
                                    Add options
                                </button>
                            </div>
                        )}
                        {pollType === "multiple-choice" && (
                            <div className="text-dark-gray text-sm">
                                {multichoiceOptions.map((option, index) => (
                                    <div
                                        key={index}
                                        className="mb-2 flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            id={option.id}
                                            name="multi-choice"
                                            className="mr-2"
                                            value={option.value}
                                        />
                                        {editingOptionId === option.id ? (
                                            <div
                                                ref={editRef}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="text"
                                                    name="value"
                                                    value={editedValue}
                                                    onChange={handleInputChange}
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
                                            <div className="flex items-center gap-6">
                                                <p>{option.value}</p>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleStartEditing(
                                                            option
                                                        )
                                                    }
                                                    className="text-blue-500"
                                                >
                                                    <EditIcon />
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
                                                    <span className="block h-5 w-5">
                                                        <DeleteIcon />
                                                    </span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={handleAddMultiChoiceOption}
                                    className="mt-2 text-blue-500"
                                >
                                    Add options
                                </button>
                            </div>
                        )}
                        {pollType === "open-ended" && (
                            <div className="text-dark-gray text-sm">
                                <textarea
                                    className="w-full rounded-xl border border-[#e1e1e1] p-4"
                                    rows={3}
                                    cols={10}
                                    placeholder="Briefly tell us about your option"
                                ></textarea>
                            </div>
                        )}
                    </div>
                </div>
            </fieldset>
            <div className="mt-6 w-full">
                <PrimaryButtonWithArrowRight
                    label="Submit"
                    type="submit"
                    onClick={handleCreatePoll}
                />
            </div>
        </form>
    );
};
