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
    updatePoll: async (updatedPoll: pollData): Promise<void> => {
        const existingPolls = await mockApi.getPolls();
        const updatedPolls = existingPolls.map((poll) =>
            poll.poll_title === updatedPoll.poll_title ? updatedPoll : poll
        );
        localStorage.setItem("createpolldata", JSON.stringify(updatedPolls));
    },
};

export const CreatePoll = () => {
    const [pollType, setPollType] = useState("");

    //setting single choice options
    const [singlechoiceOptions, setSingleChoiceOptions] = useState<
        pollOption[]
    >([{ id: "Option1", label: "Option 1", value: "Option 1" }]);

    //setting multi choice options
    const [multichoiceOptions, setMultiChoiceOptions] = useState<pollOption[]>([
        { id: "choice1", label: "Choice 1", value: "Choice 1" },
    ]);

    //setting open choice options
    const [openChoiceOptions] = useState<pollOption[]>([
        { id: "shortAnswer1", label: "shortAnswer 1", value: "shortAnswer 1" },
    ]);

    //this sets the id when the user clicks on the edit Icon button in the
    //single or multichoice options
    const [editingOptionId, setEditingOptionId] = useState<string | null>(null);

    //this is used to set the value of the edited option when the user clicks
    //on the edit icon button for the single or multichoice option
    const [editedValue, setEditedValue] = useState<string>("");

    //this set a reference to the dialog element that is later
    //called with other methods
    const isUpdateModalOpenref = useRef<HTMLDialogElement | null>(null);

    const editRef = useRef<HTMLDivElement | null>(null);

    //this set the state to the current poll data that is about to be updated
    const [updatingPollData, setUpdatingPollData] = useState<pollData | null>(
        null
    );

    //this sets the state of the previous polltype
    const [editingPollType, setEditingPollType] = useState("");

    //this helps to track if the component is in edit mode or not
    const [isEditing, setIsEditing] = useState(false);

    //here we init the all the values needed to create a poll
    const [createPollValues, setCreatePollValues] = useState<pollData>({
        poll_title: "",
        poll_description: "",
        poll_type: "",
        poll_options: [],
        poll_question: "",
    });

    //we use this state to track the submitted values on each poll
    const [submittedPoll, setSubmittedPoll] = useState<pollData | null>(null);

    //we created this is add all the polls to an array object
    //it's like an array of all submitted polls
    //this helps us to manage a list of all submitted polls
    const [allPolls, setAllPolls] = useState<pollData[]>([]);

    //to retrieve the stored createpolldata after the component renders
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
        if (editingOptionId) {
            const valueToSet = editedValue.trim();
            if (valueToSet) {
                const type = isEditing ? editingPollType : pollType;
                if (type === "single-choice") {
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
                } else if (type === "multiple-choice") {
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
    }, [editingOptionId, editedValue, pollType, editingPollType, isEditing]);

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

    const handleEditCreatedPoll = (index: number) => {
        setIsEditing(true);
        isUpdateModalOpenref.current?.showModal();
        const currentPolldata = allPolls[index];

        setUpdatingPollData(currentPolldata);
        setEditingPollType(currentPolldata.poll_type);

        //init singlechoice and multichoice options based on the poll being edited
        if (currentPolldata.poll_type === "single-choice") {
            setSingleChoiceOptions(currentPolldata.poll_options);
            setMultiChoiceOptions([]);
        } else if (currentPolldata.poll_type === "multiple-choice") {
            setMultiChoiceOptions(currentPolldata.poll_options);
            setSingleChoiceOptions([]);
        } else {
            setSingleChoiceOptions([]);
            setMultiChoiceOptions([]);
        }
    };

    const handleCloseEditModal = () => {
        setIsEditing(false);
        isUpdateModalOpenref.current?.close();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedValue(e.target.value);
    };

    const handleDeleteOption = (id: string) => {
        const type = isEditing ? editingPollType : pollType;
        if (type === "single-choice") {
            setSingleChoiceOptions((prev) =>
                prev.filter((opt) => opt.id !== id)
            );
        } else if (type === "multiple-choice") {
            setMultiChoiceOptions((prev) =>
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
        const pollData = {
            ...createPollValues,
            poll_type: pollType,
            poll_options:
                pollType === "single-choice"
                    ? singlechoiceOptions
                    : pollType === "multi-choice"
                      ? multichoiceOptions
                      : openChoiceOptions,
        };
        setSubmittedPoll(pollData);

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

    const handleUpdatePoll = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (updatingPollData) {
            const updatedPollOptions =
                editingPollType === "single-choice"
                    ? singlechoiceOptions
                    : editingPollType === "multiple-choice"
                      ? multichoiceOptions
                      : openChoiceOptions;

            const updatedPoll = {
                ...updatingPollData,
                poll_type: editingPollType,
                poll_options: updatedPollOptions,
            };

            await mockApi.updatePoll(updatedPoll);
            setAllPolls((prevPolls) =>
                prevPolls.map((poll) =>
                    poll.poll_title === updatedPoll.poll_title
                        ? updatedPoll
                        : poll
                )
            );
            handleCloseEditModal();
        }
    };

    return (
        <section className="m-4 flex min-h-screen flex-col rounded-2xl bg-[#f7f7f7] p-6">
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
                        multichoiceOptions={multichoiceOptions}
                    />
                </div>
                <div className="min-h-screen rounded-xl bg-white p-6">
                    {allPolls.length > 0 && (
                        <PollList
                            allPolls={allPolls}
                            handleEditCreatedPoll={handleEditCreatedPoll}
                            setAllPolls={(polls: pollData[]) =>
                                setAllPolls(polls)
                            }
                        />
                    )}
                </div>
            </section>
            <dialog ref={isUpdateModalOpenref}>
                <button onClick={handleCloseEditModal}>Close</button>
                {updatingPollData && (
                    <CreatePollForm
                        pollType={editingPollType}
                        singlechoiceOptions={singlechoiceOptions}
                        editingOptionId={editingOptionId}
                        editedValue={editedValue}
                        createPollValues={updatingPollData}
                        editRef={editRef}
                        isEditing={true}
                        handleCloseEditModal={handleCloseEditModal}
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
                        multichoiceOptions={multichoiceOptions}
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
