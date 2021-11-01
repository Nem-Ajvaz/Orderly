import React, { useState } from "react";
import "./App.css";
import "./index.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";

function App() {
  const [zendesk, setZendesk] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jira, setJira] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [customer, setCustomer] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [sdm, setSDM] = useState("");
  const [comment, setComment] = useState("");

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
    console.log(zendesk, state);
    setState((prev) => {
      return {
        ...prev,
        todo: {
          title: "High",
          items: [
            {
              id: v4(),
              zendesk: zendesk,
              title: title,
              description: description,
              jira: jira,
              dateCreated: dateCreated,
              customer: customer,
              currentStatus: currentStatus,
              comment: comment,
            },
            ...prev.todo.items,
          ],
        },
      };
    });

    setZendesk("");
    setTitle("");
    setDescription("");
    setJira("");
    setDateCreated("");
    setCustomer("");
    setCurrentStatus("");
    setSDM("");
    setComment("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let item = {};
    item.zendesk = zendesk;
    item.title = title;
    item.description = description;
    item.jira = jira;
    item.dateCreated = dateCreated;
    item.customer = customer;
    item.currentStatus = currentStatus;
    item.sdm = sdm;
    addItem();
    console.log(item);
  };

  return (
    <div className="App">
      <header>Welcome to Orderly</header>
      <div>
        <form className="submitForm" onSubmit={handleSubmit}>
          <div className="item">
            <h4>Zendesk</h4>
            <input
              className="inputField"
              type="text"
              value={zendesk}
              onChange={(e) => setZendesk(e.target.value)}
            />
          </div>
          <div className="item">
            <h4>Title</h4>
            <input
              className="inputField"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="item">
            <h4>Description</h4>
            <input
              className="inputField"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="item">
            <h4>Jira</h4>
            <input
              className="inputField"
              type="text"
              value={jira}
              onChange={(e) => setJira(e.target.value)}
            />
          </div>
          <div className="item">
            <h4>Date Created</h4>
            <input
              className="inputField"
              type="text"
              value={dateCreated}
              onChange={(e) => setDateCreated(e.target.value)}
            />
          </div>
          <div className="item">
            <h4>Customer</h4>
            <input
              className="inputField"
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>
          <div className="item">
            <h4>Current Status</h4>
            <input
              className="inputField"
              type="text"
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
            />
          </div>
          <div className="item">
            <h4>SDM</h4>
            <input
              className="inputField"
              type="text"
              value={sdm}
              onChange={(e) => setSDM(e.target.value)}
            />
          </div>
          <div className="item">
            <h4>Comment</h4>
            <input
              className="inputField"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
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
                <div>Current Status</div>
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
                                    <div>
                                      <div>{el.zendesk}</div>
                                    </div>
                                    <div>
                                      <div>{el.title}</div>
                                    </div>
                                    <div>
                                      <div>{el.description}</div>
                                    </div>
                                    <div>
                                      <div>{el.jira}</div>
                                    </div>
                                    <div>
                                      <div>{el.dateCreated}</div>
                                    </div>
                                    <div>
                                      <div>{el.customer}</div>
                                    </div>
                                    <div>
                                      <div>{el.currentStatus}</div>
                                    </div>
                                    <div>
                                      <div>{el.comment}</div>
                                    </div>
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

export default App;
