"use client";

import { useState, useRef, useEffect, useCallback, FormEvent } from "react";
import { CreatePollForm } from "@/app/ui-components/forms/create-poll-form";
import { PollList } from "@/app/ui-components/cards/poll-list";
import { mockApi } from "@/lib/mockApi";
import { PollData, PollOption, PollTypes } from "@/lib/types/PollTypes";

// Custom hook to handle clicks outside a specified element
const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
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
    const [pollTypeValue, setPollTypeValue] = useState("");

    //sets state for single choice options
    const [singleChoiceOptions, setSingleChoiceOptions] = useState<
        PollOption[]
    >([{ id: "Option1", label: "Option 1", value: "Option 1" }]);

    //sets state for multi choice options
    const [multipleChoiceOptions, setMultipleChoiceOptions] = useState<PollOption[]>([
        { id: "choice1", label: "Choice 1", value: "Choice 1" },
    ]);

    //sets state for open choice options
    const [openChoiceOptions] = useState<PollOption[]>([
        { id: "shortAnswer1", label: "shortAnswer 1", value: "shortAnswer 1" },
    ]);

    //sets the id when the user clicks on the edit Icon button in the
    //single or multiple choice options
    const [editingOptionId, setEditingOptionId] = useState<string | null>(null);

    //sets the value of the edited option when the user clicks
    //on the edit icon button for the single or multiple choice option
    const [editedValue, setEditedValue] = useState<string>("");

    //sets a reference to the dialog element that is later
    //called with other methods (we are going to make it reusable)
    const isUpdateModalOpenRef = useRef<HTMLDialogElement | null>(null);

    const editRef = useRef<HTMLDivElement | null>(null);

    //sets the state to the current poll data that is about to be updated
    const [updatingPollData, setUpdatingPollData] = useState<PollData | null>(
        null
    );

    //sets the state of the previous poll type
    const [editingPollType, setEditingPollType] = useState("");

    //helps to track if the component is in edit mode or not
    const [isEditing, setIsEditing] = useState(false);

    //init the all the values needed to create a poll
    const [createPollValues, setCreatePollValues] = useState<PollData>({
        pollTitle: "",
        pollDescription: "",
        pollType: "",
        pollOptions: [],
        pollQuestion: "",
    });

    //a state to track the submitted values on each poll
    const [submittedPoll, setSubmittedPoll] = useState<PollData | null>(null);

    //adds all the polls to an array object
    //it's like an array of all submitted polls
    //this helps us to manage a list of all submitted polls
    const [allPolls, setAllPolls] = useState<PollData[]>([]);

    //useEffect to retrieve the stored createPollData after the component renders
    useEffect(() => {
        const fetchPolls = async () => {
            const polls = await mockApi.getPolls();
            setAllPolls(polls);
        };
        fetchPolls();
    }, [submittedPoll]);

    /**
     * handles updating an option label/value when in edit mode and exits edit mode afterward.
     * if editingOptionId exists and editedValue is not empty:
     * Determines the poll type (single-choice or multiple-choice)
     * updates the corresponding option in the list by matching its ID
     * after update, resets editing state (editingOptionId and editedValue)
     */
    const handleUpdateAndExitEditMode = useCallback(() => {
        const valueToSet = editedValue.trim();

        if (editingOptionId || valueToSet) {
            //a state setter function that updates the value and label
            const updateOptions = (
                setter: React.Dispatch<React.SetStateAction<PollOption[]>>
            ) => {
                setter((prev) =>
                    prev.map((opt) =>
                        opt.id === editingOptionId
                            ? { ...opt, label: valueToSet, value: valueToSet }
                            : opt
                    )
                );
            };

            const type = isEditing ? editingPollType : pollTypeValue;

            if (type === PollTypes.SINGLE) {
                updateOptions(setSingleChoiceOptions);
            } else if (type === PollTypes.MULTIPLE) {
                updateOptions(setMultipleChoiceOptions);
            }
        }
        setEditingOptionId(null);
        setEditedValue("");
    }, [
        editingOptionId,
        editedValue,
        pollTypeValue,
        editingPollType,
        isEditing,
    ]);

    //@ts-expect-error Type 'HTMLDivElement | null' is not assignable to type 'Node'
    useOnClickOutside(editRef, handleUpdateAndExitEditMode);

    //we use this to select poll type from dropdown
    const handleSelectPollType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPollTypeValue(e.target.value);
    };

    //this function handles adding single choice options
    //when user clicks the add button after selecting
    //single choice from the dropdown
    const handleAddSingleChoiceOption = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        const newId = `Option${singleChoiceOptions.length + 1}`;
        const newOption: PollOption = {
            id: newId,
            label: `Option ${singleChoiceOptions.length + 1}`,
            value: `Option ${singleChoiceOptions.length + 1}`,
        };
        setSingleChoiceOptions((prev) => [...prev, newOption]);
    };

    //this function does the same as handleAddSingleChoiceOption
    //might look into a way to not repeat this code (DRY)
    const handleAddMultiChoiceOption = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        const newId = `choice${multipleChoiceOptions.length + 1}`;
        const newChoice: PollOption = {
            id: newId,
            label: `choice ${multipleChoiceOptions.length + 1}`,
            value: `choice ${multipleChoiceOptions.length + 1}`,
        };
        setMultipleChoiceOptions((prev) => [...prev, newChoice]);
    };

    //this sets the editing state for the single and multiple choice options
    const handleStartEditing = (option: PollOption) => {
        setEditingOptionId(option.id);
        setEditedValue(option.value);
    };

    //this handles the updating poll data
    const handleUpdateCreatedPoll = (index: number) => {
        setIsEditing(true);
        isUpdateModalOpenRef.current?.showModal();
        const currentPollData = allPolls[index];

        setUpdatingPollData(currentPollData);
        setEditingPollType(currentPollData.pollType);

        //init single choice and multiple choice options based on the poll being edited
        if (currentPollData.pollType === PollTypes.SINGLE) {
            setSingleChoiceOptions(currentPollData.pollOptions);
            setMultipleChoiceOptions([]);
        } else if (currentPollData.pollType === PollTypes.MULTIPLE) {
            setMultipleChoiceOptions(currentPollData.pollOptions);
            setSingleChoiceOptions([]);
        } else {
            setSingleChoiceOptions([]);
            setMultipleChoiceOptions([]);
        }
    };

    //this closes the updatePoll modal
    const handleCloseUpdateModal = () => {
        setIsEditing(false);
        isUpdateModalOpenRef.current?.close();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedValue(e.target.value);
    };

    const handleDeleteOption = (id: string) => {
        const type = isEditing ? editingPollType : pollTypeValue;
        if (type === PollTypes.SINGLE) {
            setSingleChoiceOptions((prev) =>
                prev.filter((opt) => opt.id !== id)
            );
        } else if (type === PollTypes.MULTIPLE) {
            setMultipleChoiceOptions((prev) =>
                prev.filter((opt) => opt.id !== id)
            );
        }
    };

    const handleCreatePollValueChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        if (isEditing) {
            setUpdatingPollData((prev) => {
                if (prev) {
                    return {
                        ...prev,
                        [name]: value,
                    };
                }
                return prev;
            });
        } else {
            setCreatePollValues((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    //creates polls and store them in localstorage
    const handleCreatePoll = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const pollData: PollData = {
            ...createPollValues,
            pollType: pollTypeValue as PollTypes,
            pollOptions:
                pollTypeValue === PollTypes.SINGLE
                    ? singleChoiceOptions
                    : pollTypeValue === PollTypes.MULTIPLE
                      ? multipleChoiceOptions
                      : openChoiceOptions,
        };

        setSubmittedPoll(pollData);

        //this will be replaced with a post request when a real endpoint
        //is provided
        const newPoll = await mockApi.createPoll(pollData);
        setAllPolls((prevPolls) => [...prevPolls, newPoll]);

        setCreatePollValues({
            pollTitle: "",
            pollDescription: "",
            pollType: "",
            pollOptions: [],
            pollQuestion: "",
        });
        setPollTypeValue("");
        setSingleChoiceOptions([
            { id: "Option1", label: "Option 1", value: "Option 1" },
        ]);
        setMultipleChoiceOptions([
            { id: "choice1", label: "Choice 1", value: "Choice 1" },
        ]);
    };

    //this handles updating created poll by
    //checking if the poll type to be edited
    //and also the poll option to be edited
    //then update the values with the updated poll values
    const handleUpdatePoll = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (updatingPollData) {
            const updatedPollOptions =
                editingPollType === PollTypes.SINGLE
                    ? singleChoiceOptions
                    : editingPollType === PollTypes.MULTIPLE
                      ? multipleChoiceOptions
                      : openChoiceOptions;

            const updatedPoll: PollData = {
                ...updatingPollData,
                pollType: editingPollType as PollTypes,
                pollOptions: updatedPollOptions,
            };

            //this will be replaced with a post request when a real endpoint
            //is provided
            await mockApi.updatePoll(updatedPoll);
            setAllPolls((prevPolls) =>
                prevPolls.map((poll) =>
                    poll.pollTitle === updatedPoll.pollTitle
                        ? updatedPoll
                        : poll
                )
            );
            handleCloseUpdateModal();
        }
    };

    return (
        <section className="m-4 flex min-h-screen flex-col rounded-2xl bg-panel-background p-6">
            <h4 className="text-2xl font-bold">Create Poll</h4>
            <p className="mb-6 text-cards-foreground">Start creating polls</p>
            <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                <div className="min-h-screen rounded-xl bg-cards-background p-6">
                    <CreatePollForm
                        pollTypeValue={pollTypeValue}
                        singleChoiceOptions={singleChoiceOptions}
                        editingOptionId={editingOptionId}
                        editedValue={editedValue}
                        createPollValues={createPollValues}
                        editRef={editRef}
                        isEditing={false}
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
                        multipleChoiceOptions={multipleChoiceOptions}
                    />
                </div>
                <div className="min-h-screen rounded-xl bg-cards-background p-6">
                    {allPolls.length > 0 && (
                        <PollList
                            allPolls={allPolls}
                            handleUpdateCreatedPoll={handleUpdateCreatedPoll}
                            setAllPolls={(polls: PollData[]) =>
                                setAllPolls(polls)
                            }
                        />
                    )}
                </div>
            </section>
            <dialog ref={isUpdateModalOpenRef}>
                <button onClick={handleCloseUpdateModal}>Close</button>
                {updatingPollData && (
                    <CreatePollForm
                        pollTypeValue={editingPollType}
                        singleChoiceOptions={singleChoiceOptions}
                        editingOptionId={editingOptionId}
                        editedValue={editedValue}
                        createPollValues={updatingPollData}
                        editRef={editRef}
                        isEditing={true}
                        handleCloseUpdateModal={handleCloseUpdateModal}
                        handleCreatePollValueChange={
                            handleCreatePollValueChange
                        }
                        handleSelectPollType={(e) =>
                            setEditingPollType(e.target.value)
                        }
                        handleInputChange={handleInputChange}
                        handleUpdateAndExitEditMode={
                            handleUpdateAndExitEditMode
                        }
                        handleStartEditing={handleStartEditing}
                        handleDeleteOption={handleDeleteOption}
                        handleAddSingleChoiceOption={
                            handleAddSingleChoiceOption
                        }
                        handleCreatePoll={handleUpdatePoll}
                        handleUpdatePoll={handleUpdatePoll}
                        handleAddMultiChoiceOption={handleAddMultiChoiceOption}
                        multipleChoiceOptions={multipleChoiceOptions}
                    />
                )}
            </dialog>
        </section>
    );
};
export const metadata = {
    title: "Create Poll",
    description: "Create a new poll for your audience.",
};
