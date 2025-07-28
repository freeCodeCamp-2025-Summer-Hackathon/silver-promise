"use client";

import { FormEvent } from "react";
import FloatingLabelInput from "@/app/ui-components/inputs/FloatingLabelInput";
import FloatingLabelSelectInput from "@/app/ui-components/inputs/FloatingLabelSelectInput";
import { EditIcon } from "@/public/svgs/edit";
import { DeleteIcon } from "@/public/svgs/delete";
import { PrimaryButtonWithArrowRight } from "@/app/ui-components/buttons/PrimaryButton";

import { Poll, PollOption, PollType } from "@/lib/types/Poll";

interface CreatePollFormProps {
    pollTypeValue: PollType;
    singleChoiceOptions: PollOption[];
    multipleChoiceOptions: PollOption[];
    editingOptionId: number | null;
    editedValue: string;
    isEditing?: boolean;
    createPollValues: Poll;
    editRef: React.RefObject<HTMLDivElement | null>;
    handleCloseUpdateModal?: () => void;
    handleCreatePollValueChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    handleSelectPollType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateAndExitEditMode: () => void;
    handleStartEditing: (option: PollOption) => void;
    handleDeleteOption: (id: number) => void;
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
    { value: PollType.SINGLE, label: PollType.SINGLE },
    { value: PollType.MULTIPLE, label: PollType.MULTIPLE },
];

/**
 * @param {CreatePollFormProps} props - The props passed to the CreatePollForm component.
 * @description This component renders the form for creating or updating polls,
 * handling input values and displaying options based on the poll type.
 */

export const CreatePollForm: React.FC<CreatePollFormProps> = ({
    pollTypeValue,
    singleChoiceOptions,
    multipleChoiceOptions,
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
        <form className="bg-inherit">
            <fieldset className="bg-inherit">
                <legend></legend>

                <div className="mt-6 flex flex-col gap-6 bg-inherit">
                    <FloatingLabelInput
                        label="Enter poll title"
                        type="text"
                        name="title"
                        value={createPollValues.title}
                        onChange={handleCreatePollValueChange}
                    />

                    <FloatingLabelInput
                        label="Write brief description about the poll"
                        type="text"
                        name="description"
                        value={createPollValues.description}
                        onChange={handleCreatePollValueChange}
                    />
                </div>
            </fieldset>

            <fieldset className="border-dark-gray mt-6 rounded-xl border bg-inherit p-6">
                <legend className="px-2">Create questions</legend>
                <div className="mt-6 flex flex-col gap-6 bg-inherit">
                    <FloatingLabelInput
                        label="Enter poll question"
                        type="text"
                        name="question"
                        value={createPollValues.question}
                        onChange={handleCreatePollValueChange}
                    />
                    <FloatingLabelSelectInput
                        label="Select poll type"
                        value={pollTypeValue}
                        options={pollType}
                        onChange={handleSelectPollType}
                    />

                    <div>
                        {pollTypeValue === PollType.SINGLE && (
                            <div className="text-dark-gray text-sm">
                                {singleChoiceOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        className="mb-2 flex items-center"
                                    >
                                        <input
                                            type="radio"
                                            id={option.id + ""}
                                            name={PollType.SINGLE}
                                            className="mr-2"
                                            value={option.text}
                                            disabled
                                        />
                                        {editingOptionId === option.id ? (
                                            <div
                                                ref={editRef}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="text"
                                                    name="text"
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
                                                <p>{option.text}</p>
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
                        {pollTypeValue === PollType.MULTIPLE && (
                            <div className="text-dark-gray text-sm">
                                {multipleChoiceOptions.map((option, index) => (
                                    <div
                                        key={index}
                                        className="mb-2 flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            id={option.id + ""}
                                            name={PollType.MULTIPLE}
                                            className="mr-2"
                                            value={option.text}
                                        />
                                        {editingOptionId === option.id ? (
                                            <div
                                                ref={editRef}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="text"
                                                    name="text"
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
                                                <p>{option.text}</p>
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
