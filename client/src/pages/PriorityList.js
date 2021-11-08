import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import "../assets/css/priority.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";

import { priorities as PRIORITIES } from "../utils/constants";
import {
  CREATE_PRIORITY,
  MUTATION_CHANGE_PRIORITY_STATUS,
} from "../utils/mutations";
import { QUERY_PRIORITIES } from "../utils/queries";

const initialFormState = {
  zendesk: "",
  title: "",
  description: "",
  jira: "",
  dateCreated: "",
  customer: "",
  currentStatus: "",
  sdm: "",
  comment: "",
};

function Priority() {
  const [formState, setFormState] = useState(initialFormState);
  const [mutation] = useMutation(CREATE_PRIORITY);
  const [changePriorityStatusMutation] = useMutation(
    MUTATION_CHANGE_PRIORITY_STATUS
  );
  const { data, loading, error } = useQuery(QUERY_PRIORITIES);

  const [priorityState, setPriorityState] = useState(null);

  useEffect(() => {
    setPriorityState({
      high: {
        title: "High",
        items:
          data?.priorities.filter(
            (priority) => priority.currentStatus === "high"
          ) ?? [],
      },
      medium: {
        title: "Medium",
        items:
          data?.priorities.filter(
            (priority) => priority.currentStatus === "medium"
          ) ?? [],
      },
      low: {
        title: "Low",
        items:
          data?.priorities.filter(
            (priority) => priority.currentStatus === "low"
          ) ?? [],
      },
      done: {
        title: "Done",
        items:
          data?.priorities.filter(
            (priority) => priority.currentStatus === "done"
          ) ?? [],
      },
    });
  }, [data]);

  const handleInputChange = (event) => {
    const {
      target: { value, name },
    } = event;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDragEnd = async ({ destination, source, draggableId }) => {
    console.log(destination, source, draggableId);
    try {
      if (
        !destination ||
        (destination.index === source.index &&
          destination.droppableId === source.droppableId)
      ) {
        return;
      }
      try {
        await changePriorityStatusMutation({
          variables: {
            id: draggableId,
            newStatus: destination.droppableId,
          },
        });
      } catch (err) {
        console.log(err);
      }

      setPriorityState((prev) => {
        const changedItem = prev[source.droppableId].items.find(
          (item) => item.id === draggableId
        );
        const newState = {
          ...prev,
          [source.droppableId]: {
            ...prev[source.droppableId],
            items: [
              ...prev[source.droppableId].items.filter(
                (item) => item.id !== draggableId
              ),
            ],
          },
          [destination.droppableId]: {
            ...prev[destination.droppableId],
            items: [...prev[destination.droppableId].items, changedItem],
          },
        };

        console.log(newState);
        return newState;
      });
    } catch (e) {}
  };

  const addItem = (data) => {
    const { currentStatus } = data;

    setPriorityState((prev) => ({
      ...prev,
      [currentStatus]: {
        title: prev[currentStatus].title,
        items: [
          {
            ...data,
          },
          ...prev[currentStatus].items,
        ],
      },
    }));

    setFormState(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        data: { createPriority },
      } = await mutation({ variables: formState });
      addItem(createPriority);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  if (!priorityState) return null;

  return (
    <div className="priority">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="submitForm">
            <div className="iteminput">
              <h4>Zendesk</h4>
              <input
                className="inputField"
                type="text"
                name="zendesk"
                value={formState.zendesk ?? ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Title</h4>
              <input
                className="inputField"
                type="text"
                name="title"
                value={formState.title ?? ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Description</h4>
              <input
                className="inputField"
                type="text"
                name="description"
                value={formState.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Jira</h4>
              <input
                className="inputField"
                type="text"
                name="jira"
                value={formState.jira}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Date Created</h4>
              <input
                className="inputField"
                type="text"
                name="dateCreated"
                value={formState.dateCreated}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Customer</h4>
              <input
                className="inputField"
                type="text"
                name="customer"
                value={formState.customer}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>SDM</h4>
              <input
                className="inputField"
                type="text"
                name="sdm"
                value={formState.sdm}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Comment</h4>
              <input
                className="inputField"
                type="text"
                name="comment"
                value={formState.comment}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Current Status</h4>
              <select onChange={handleInputChange} name="currentStatus">
                <option value="">Please select</option>
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority.toLowerCase()}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="itemAdd">
            <button type="submit">Add Item</button>
          </div>
        </form>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(priorityState, (data, key) => {
          return (
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
              <div className="itemList">
                <div>Zendesk</div>
                <div>Title</div>
                <div>Description</div>
                <div>Jira</div>
                <div>Date Created</div>
                <div>Customer</div>
                <div>SDM</div>
                <div>Comment</div>
              </div>

              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return (
                    <div
                      id={data.title}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      {data.items.map((el, index) => {
                        return (
                          <Draggable
                            key={el.id}
                            index={index}
                            draggableId={el.id}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  className={`item ${
                                    snapshot.isDragging && "dragging"
                                  }`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="itemdivs">
                                    <div>{el.zendesk}</div>
                                    <div>{el.title}</div>
                                    <div>{el.description}</div>
                                    <div>{el.jira}</div>
                                    <div>{el.dateCreated}</div>
                                    <div>{el.customer}</div>
                                    <div>{el.sdm}</div>
                                    <div>{el.comment}</div>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Priority;
