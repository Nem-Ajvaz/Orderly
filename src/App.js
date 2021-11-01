import React, { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";

function App() {
  const [input, setInput] = useState({
    zendesk: "",
    title: "",
    jira: "",
    date_created: "",
    customer: "",
    current_status: "",
    comment: "",
  });
  const [state, setState] = useState({
    todo: {
      title: "High",
      items: [],
    },
    "in-progress": {
      title: "Medium",
      items: [],
    },
    done: {
      title: "Low",
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
      prev = { ...prev };

      prev[source.droppableId].items.splice(source.index, 1);

      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  const addItem = () => {
    setState((prev) => {
      return {
        ...prev,
        todo: {
          title: "High",
          items: [
            {
              id: v4(),
              input: input,
            },
            ...prev.todo.items,
          ],
        },
      };
    });

    const handleChange = (e) => {
      setState({
        ...input,
        [e.target.name]: e.target.value,
      });
    };

    console.log({ input });
    setInput("");
  };

  return (
    <div className="App">
      <div>
        <div>
          <input
            type="text"
            name="zendesk"
            value={input.zendesk}
            onChange={handleChange}
          />
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            value={input.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="date_created"
            value={input.date_created}
            onChange={handleChange}
          />
          <input
            type="text"
            name="customer"
            value={input.customer}
            onChange={handleChange}
          />
          <input
            type="text"
            name="current_status"
            value={input.current_status}
            onChange={handleChange}
          />
          <input
            type="text"
            name="comment"
            value={input.comment}
            onChange={handleChange}
          />

          <button onClick={addItem}>Add</button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
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
                                  {el.input}
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

export default App;
