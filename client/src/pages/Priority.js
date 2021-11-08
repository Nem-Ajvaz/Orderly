import React, { useEffect, useState } from "react";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import "../assets/css/priorityId.css";
import { UPDATE_PRIORITY } from "../utils/mutations";
import { QUERY_PRIORITIES } from "../utils/queries";
import { priorities } from "../utils/constants";
import { priorities as PRIORITIES } from "../utils/constants";

const initialState = {
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

const Priorityid = () => {
  const { data, loading, error } = useQuery(QUERY_PRIORITIES);
  const [mutation] = useMutation(UPDATE_PRIORITY);

  const windowLocation = window.location.href.substr(31, 50);

  const dataPriorities = data?.priorities.find(
    (priorities) => priorities.id === windowLocation.trim()
  );

  const [formState, setFormState] = useState(initialState);

  const handleInputChange = (event) => {
    const {
      target: { value, name },
    } = event;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { editPriority },
      } = await mutation({ variables: formState });
      addItem();
    } catch (e) {
      console.log(e);
    }
  };

  const addItem = (data) => {
    setFormState(initialState);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }
  return (
    <div className="priorityUpdateContainer">
      <div className="priorityidTitleDiv">
        <h2> --- {dataPriorities.title} ---</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="submitForm">
            <div className="iteminput">
              <h4>Zendesk</h4>
              <p>Previous Value: {dataPriorities.zendesk}</p>
              <input
                className="updateField"
                type="text"
                name="zendesk"
                value={formState.zendesk}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Title</h4>
              <p>Previous Value: {dataPriorities.title}</p>
              <input
                className="updateField"
                type="text"
                name="title"
                value={formState.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Comment</h4>
              <p>Previous Value: {dataPriorities.comment}</p>
              <input
                className="updateField"
                type="text"
                name="comment"
                value={formState.comment}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Jira</h4>
              <p>Previous Value: {dataPriorities.jira}</p>
              <input
                className="updateField"
                type="text"
                name="jira"
                value={formState.jira}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="submitForm">
            <div className="iteminput">
              <h4>Date Created</h4>
              <p>Previous Value: {dataPriorities.dateCreated}</p>
              <input
                className="updateField"
                type="text"
                name="dateCreated"
                value={formState.dateCreated}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Customer</h4>
              <p>Previous Value: {dataPriorities.customer}</p>
              <input
                className="updateField"
                type="text"
                name="customer"
                value={formState.customer}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>SDM</h4>
              <p>Previous Value: {dataPriorities.sdm}</p>
              <input
                className="updateField"
                type="text"
                name="sdm"
                value={formState.sdm}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div className="iteminput">
              <h4>Description</h4>
              <p>Previous Value: {dataPriorities.description}</p>
              <textarea
                id="description"
                className="updateField"
                type="text"
                name="description"
                value={formState.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div className="iteminput">
              <h4>Current Status</h4>
              <select
                onChange={handleInputChange}
                name="currentStatus"
                className="changeStatus"
              >
                <option value="">Please select</option>
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority.toLowerCase()}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="itemUpdate">
            <button type="submit">Update Item</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Priorityid;
