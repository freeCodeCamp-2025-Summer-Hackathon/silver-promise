"use client";

import { useState, useRef, useEffect, useCallback, FormEvent } from "react";
import { CreatePollForm } from "@/app/ui-components/forms/create-poll-form";
import { PollList } from "@/app/ui-components/cards/poll-list";
import { Poll, PollOption, PollType } from "@/lib/types/Poll";

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
    const [pollTypeValue, setPollTypeValue] = useState<PollType>(
        PollType.SINGLE
    );

    //sets state for single choice options
    const [singleChoiceOptions, setSingleChoiceOptions] = useState<
        PollOption[]
    >([{ id: 1, text: "Option 1" }]);

    //sets state for multi choice options
    const [multipleChoiceOptions, setMultipleChoiceOptions] = useState<
        PollOption[]
    >([{ id: 1, text: "Choice 1" }]);

    //sets state for open choice options
    const [openChoiceOptions] = useState<PollOption[]>([
        { id: 1, text: "shortAnswer 1" },
    ]);

    //sets the id when the user clicks on the edit Icon button in the
    //single or multiple choice options
    const [editingOptionId, setEditingOptionId] = useState<number | null>(null);

    //sets the value of the edited option when the user clicks
    //on the edit icon button for the single or multiple choice option
    const [editedValue, setEditedValue] = useState<string>("");

    //sets a reference to the dialog element that is later
    //called with other methods (we are going to make it reusable)
    const isUpdateModalOpenRef = useRef<HTMLDialogElement | null>(null);

    const editRef = useRef<HTMLDivElement | null>(null);

    //sets the state to the current poll data that is about to be updated
    const [updatingPoll, setUpdatingPoll] = useState<Poll | null>(null);

    //sets the state of the previous poll type
    const [editingPollType, setEditingPollType] = useState("");

    //helps to track if the component is in edit mode or not
    const [isEditing, setIsEditing] = useState(false);

    //init the all the values needed to create a poll
    const [createPollValues, setCreatePollValues] = useState<Poll>({
        title: "",
        description: "",
        type: PollType.SINGLE,
        options: [],
        question: "",
        id: Date.now(), // Unique ID based on current timestamp
        authorId: 1, // Assuming a default author ID for now
        createdAt: new Date(),
        status: "active",
        pollLinks: [],
        results: [],
    } as Poll);

    //a state to track the submitted values on each poll
    const [submittedPoll, setSubmittedPoll] = useState<Poll | null>(null);

    //adds all the polls to an array object
    //it's like an array of all submitted polls
    //this helps us to manage a list of all submitted polls
    const [allPolls, setAllPolls] = useState<Poll[]>([]);

    //useEffect to retrieve the stored createPoll after the component renders
    useEffect(() => {
        const fetchPolls = async () => {
            const polls = await fetch("/api/polls", {
                headers: {
                    Authorization: `Bearer ${
                        document.cookie
                            .split("; ")
                            .find((cookie) =>
                                cookie.trim().startsWith("auth-token=")
                            )
                            ?.split("=")[1] || ""
                    }`,
                },
            });
            const data = await polls.json();
            setAllPolls(data);
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
        if (editingOptionId !== null && editedValue.trim()) {
            if (pollTypeValue === PollType.SINGLE) {
                setSingleChoiceOptions((prev) =>
                    prev.map((option) =>
                        option.id === editingOptionId
                            ? { ...option, text: editedValue.trim() }
                            : option
                    )
                );
            } else if (pollTypeValue === PollType.MULTIPLE) {
                setMultipleChoiceOptions((prev) =>
                    prev.map((option) =>
                        option.id === editingOptionId
                            ? { ...option, text: editedValue.trim() }
                            : option
                    )
                );
            }
        }
        setEditingOptionId(null);
        setEditedValue("");
    }, [editingOptionId, editedValue, pollTypeValue]);

    //@ts-expect-error Type 'HTMLDivElement | null' is not assignable to type 'Node'
    useOnClickOutside(editRef, handleUpdateAndExitEditMode);

    //we use this to select poll type from dropdown
    const handleSelectPollType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPollTypeValue(e.target.value as PollType);
    };

    //this function handles adding single choice options
    //when user clicks the add button after selecting
    //single choice from the dropdown
    const handleAddSingleChoiceOption = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        const newId = singleChoiceOptions.length + 1;
        const newOption: PollOption = {
            id: newId,
            text: `Option ${singleChoiceOptions.length + 1}`,
        };
        setSingleChoiceOptions((prev) => [...prev, newOption]);
    };

    //this function does the same as handleAddSingleChoiceOption
    //might look into a way to not repeat this code (DRY)
    const handleAddMultiChoiceOption = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        const newId = multipleChoiceOptions.length + 1;
        const newChoice: PollOption = {
            id: newId,
            text: `Option ${multipleChoiceOptions.length + 1}`,
        };
        setMultipleChoiceOptions((prev) => [...prev, newChoice]);
    };

    //this sets the editing state for the single and multiple choice options
    const handleStartEditing = (option: PollOption) => {
        setEditingOptionId(option.id);
        setEditedValue(option.text);
    };

    //this handles the updating poll data
    const handleUpdateCreatedPoll = (index: number) => {
        setIsEditing(true);
        isUpdateModalOpenRef.current?.showModal();
        const currentPoll = allPolls[index];

        setUpdatingPoll(currentPoll);
        setEditingPollType(currentPoll.type);

        //init single choice and multiple choice options based on the poll being edited
        if (currentPoll.type === PollType.SINGLE) {
            setSingleChoiceOptions(currentPoll.options);
            setMultipleChoiceOptions([]);
        } else if (currentPoll.type === PollType.MULTIPLE) {
            setMultipleChoiceOptions(currentPoll.options);
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

    const handleDeleteOption = (id: number) => {
        const type = isEditing ? editingPollType : pollTypeValue;
        if (type === PollType.SINGLE) {
            setSingleChoiceOptions((prev) =>
                prev.filter((opt) => opt.id !== id)
            );
        } else if (type === PollType.MULTIPLE) {
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
            setUpdatingPoll((prev) => {
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

        if (isEditing) {
            handleUpdateAndExitEditMode();
            return;
        }

        // Ensure all required fields are filled
        if (
            !createPollValues.question ||
            (pollTypeValue === PollType.SINGLE &&
                singleChoiceOptions.length <= 1) ||
            (pollTypeValue === PollType.MULTIPLE &&
                multipleChoiceOptions.length === 0)
        ) {
            alert(
                "Please fill in the question and at least " +
                    (pollTypeValue === PollType.SINGLE
                        ? "2 options"
                        : "1 option")
            );
            return;
        }

        const pollData: Poll = {
            ...createPollValues,
            type: pollTypeValue as PollType,
            options:
                pollTypeValue === PollType.SINGLE
                    ? singleChoiceOptions
                    : pollTypeValue === PollType.MULTIPLE
                      ? multipleChoiceOptions
                      : openChoiceOptions,
        };

        setSubmittedPoll(pollData);

        //this will be replaced with a post request when a real endpoint
        //is provided
        const newPoll = await fetch("/api/polls/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    document.cookie
                        .split("; ")
                        .find((cookie) =>
                            cookie.trim().startsWith("auth-token=")
                        )
                        ?.split("=")[1] || ""
                }`,
            },
            body: JSON.stringify(pollData),
        });
        const createdPoll = (await newPoll.json())?.poll;
        setAllPolls((prevPolls) => [createdPoll, ...prevPolls]);

        setCreatePollValues({
            title: "",
            description: "",
            type: PollType.SINGLE,
            options: [],
            question: "",
            id: Date.now(),
            authorId: -1,
            createdAt: new Date(),
            status: "active",
            pollLinks: [],
            results: [],
        } as Poll);
        setPollTypeValue(PollType.SINGLE);
        setSingleChoiceOptions([{ id: 1, text: "Option 1" }]);
        setMultipleChoiceOptions([{ id: 1, text: "Choice 1" }]);
    };

    //this handles updating created poll by
    //checking if the poll type to be edited
    //and also the poll option to be edited
    //then update the values with the updated poll values
    const handleUpdatePoll = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (updatingPoll) {
            const updatedPollOptions =
                editingPollType === PollType.SINGLE
                    ? singleChoiceOptions
                    : editingPollType === PollType.MULTIPLE
                      ? multipleChoiceOptions
                      : openChoiceOptions;

            const updatedPoll: Poll = {
                ...updatingPoll,
                type: editingPollType as PollType,
                options: updatedPollOptions,
            };

            //this will be replaced with a post request when a real endpoint
            //is provided
            setAllPolls((prevPolls) =>
                prevPolls.map((poll) =>
                    poll.id === updatedPoll.id
                        ? { ...poll, ...updatedPoll }
                        : poll
                )
            );

            const response = await fetch(`/api/polls/${updatingPoll.id}/edit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${
                        document.cookie
                            .split("; ")
                            .find((cookie) =>
                                cookie.trim().startsWith("auth-token=")
                            )
                            ?.split("=")[1] || ""
                    }`,
                },
                body: JSON.stringify(updatedPoll),
            });
            if (!response.ok) {
                console.error("Failed to update poll");
                alert("Failed to update poll");
                handleCloseUpdateModal();
                return;
            }
            handleCloseUpdateModal();
        }
    };

    return (
        <section className="bg-panel-background m-4 flex min-h-screen flex-col rounded-2xl p-6">
            <h4 className="text-2xl font-bold">Create Poll</h4>
            <p className="text-cards-foreground mb-6">Start creating polls</p>
            <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                <div className="bg-cards-background min-h-screen rounded-xl p-6">
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
                <div className="bg-cards-background min-h-screen rounded-xl p-6">
                    {allPolls.length > 0 && (
                        <PollList
                            allPolls={allPolls}
                            handleUpdateCreatedPoll={handleUpdateCreatedPoll}
                            setAllPolls={(polls: Poll[]) => setAllPolls(polls)}
                        />
                    )}
                </div>
            </section>
            <dialog ref={isUpdateModalOpenRef}>
                <button onClick={handleCloseUpdateModal}>Close</button>
                {updatingPoll && (
                    <CreatePollForm
                        pollTypeValue={editingPollType as PollType}
                        singleChoiceOptions={singleChoiceOptions}
                        editingOptionId={editingOptionId}
                        editedValue={editedValue}
                        createPollValues={updatingPoll}
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
