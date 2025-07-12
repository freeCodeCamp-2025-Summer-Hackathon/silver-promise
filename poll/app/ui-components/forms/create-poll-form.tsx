"use client";

import { FormEvent } from "react";
import FloatingLabelInput from "@/app/ui-components/inputs/FloatingLabelInput";
import FloatingLabelSelectInput from "@/app/ui-components/inputs/FloatingLabelSelectInput";
import { EditIcon } from "@/public/svgs/edit";
import { DeleteIcon } from "@/public/svgs/delete";
import { PrimaryButtonWithArrowRight } from "@/app/ui-components/buttons/PrimaryButton";

import { pollData, pollOption, PollTypes } from "@/lib/types/polltypes";

interface CreatePollFormProps {
    pollTypeValue: string;
    singlechoiceOptions: pollOption[];
    multichoiceOptions: pollOption[];
    editingOptionId: string | null;
    editedValue: string;
    isEditing?: boolean;
    createPollValues: pollData;
    editRef: React.RefObject<HTMLDivElement | null>;
    handleCloseUpdateModal?: () => void;
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
    handleUpdatePoll?: (e: FormEvent<HTMLButtonElement>) => void;
}

const pollType = [
    { value: PollTypes.SINGLECHOICE, label: PollTypes.SINGLECHOICE },
    { value: PollTypes.MULTICHOICE, label: PollTypes.MULTICHOICE },
    { value: PollTypes.OPEN, label: PollTypes.OPEN },
];

/**
 * @param {CreatePollFormProps} props - The props passed to the CreatePollForm component.
 * @description This component renders the form for creating or updating polls,
 * handling input values and displaying options based on the poll type.
 */

export const CreatePollForm: React.FC<CreatePollFormProps> = ({
    pollTypeValue,
    singlechoiceOptions,
    multichoiceOptions,
    editingOptionId,
    editedValue,
    isEditing,
    createPollValues,
    editRef,
    handleCreatePollValueChange,
    handleCloseUpdateModal,
    handleSelectPollType,
    handleInputChange,
    handleUpdateAndExitEditMode,
    handleStartEditing,
    handleDeleteOption,
    handleAddSingleChoiceOption,
    handleAddMultiChoiceOption,
    handleCreatePoll,
    handleUpdatePoll,
}) => {
    return (
        <form>
            <fieldset>
                <legend></legend>

                <div className="mt-6 flex flex-col gap-6">
                    <FloatingLabelInput
                        label="Enter poll title"
                        type="text"
                        name="pollTitle"
                        value={createPollValues.pollTitle}
                        onChange={handleCreatePollValueChange}
                    />

                    <FloatingLabelInput
                        label="Write brief description about the poll"
                        type="text"
                        name="pollDescription"
                        value={createPollValues.pollDescription}
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
                        name="pollQuestion"
                        value={createPollValues.pollQuestion}
                        onChange={handleCreatePollValueChange}
                    />
                    <FloatingLabelSelectInput
                        label="Select poll type"
                        value={pollTypeValue}
                        options={pollType}
                        onChange={handleSelectPollType}
                    />

                    <div>
                        {pollTypeValue === PollTypes.SINGLECHOICE && (
                            <div className="text-dark-gray text-sm">
                                {singlechoiceOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        className="mb-2 flex items-center"
                                    >
                                        <input
                                            type="radio"
                                            id={option.id}
                                            name={PollTypes.SINGLECHOICE}
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
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            handleUpdateAndExitEditMode();
                                                        }
                                                    }}
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
                        {pollTypeValue === PollTypes.MULTICHOICE && (
                            <div className="text-dark-gray text-sm">
                                {multichoiceOptions.map((option, index) => (
                                    <div
                                        key={index}
                                        className="mb-2 flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            id={option.id}
                                            name={PollTypes.MULTICHOICE}
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
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            handleUpdateAndExitEditMode();
                                                        }
                                                    }}
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
                        {pollTypeValue === PollTypes.OPEN && (
                            <div className="text-dark-gray text-sm">
                                <textarea
                                    className="w-full rounded-xl border border-[#e1e1e1] p-4"
                                    rows={2}
                                    cols={10}
                                    name="value"
                                    placeholder="Short answer"
                                ></textarea>
                            </div>
                        )}
                    </div>
                </div>
            </fieldset>

            {isEditing ? (
                <div className="mt-6 flex w-full gap-12">
                    <PrimaryButtonWithArrowRight
                        label="Update"
                        type="submit"
                        onClick={handleUpdatePoll}
                    />
                    <button
                        type="button"
                        onClick={handleCloseUpdateModal}
                        className="w-full cursor-pointer rounded-2xl border-2 border-slate-300 p-2 text-slate-400"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="mt-6 w-full">
                    <PrimaryButtonWithArrowRight
                        label="Submit"
                        type="submit"
                        onClick={handleCreatePoll}
                    />
                </div>
            )}
        </form>
    );
};
