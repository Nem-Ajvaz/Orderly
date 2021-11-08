import orderlyimg from "../assets/images/orderly.gif";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import style from "../assets/css/priorityId.css";

import { QUERY_PRIORITIES } from "../utils/queries";
import { priorities } from "../utils/constants";
import { priorities as PRIORITIES } from "../utils/constants";

const Priorityid = () => {
  const { data, loading, error } = useQuery(QUERY_PRIORITIES);

  const windowLocation = window.location.href.substr(31, 50);

  const dataPriorities = data?.priorities.find(
    (priorities) => priorities.id === windowLocation
  );

  const handleInputChange = (event) => {
    const {
      target: { value, name },
    } = event;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }
  console.log(dataPriorities);

  //   let id = dataPriorities.id;

  return (
    <div className="priorityUpdateContainer">
      <div className="priorityidTitleDiv">
        <h2>Update: --- {dataPriorities.title} ---</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="submitForm">
            <div className="iteminput">
              <h4>Zendesk</h4>
              <input
                className="inputField"
                type="text"
                name="zendesk"
                value={dataPriorities.zendesk}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Title</h4>
              <input
                className="inputField"
                type="text"
                name="title"
                value={dataPriorities.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Description</h4>
              <input
                className="inputField"
                type="text"
                name="description"
                value={dataPriorities.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Jira</h4>
              <input
                className="inputField"
                type="text"
                name="jira"
                value={dataPriorities.jira}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="submitForm">
            <div className="iteminput">
              <h4>Date Created</h4>
              <input
                className="inputField"
                type="text"
                name="dateCreated"
                value={dataPriorities.dateCreated}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Customer</h4>
              <input
                className="inputField"
                type="text"
                name="customer"
                value={dataPriorities.customer}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>SDM</h4>
              <input
                className="inputField"
                type="text"
                name="sdm"
                value={dataPriorities.sdm}
                onChange={handleInputChange}
              />
            </div>
            <div className="iteminput">
              <h4>Comment</h4>
              <input
                className="inputField"
                type="text"
                name="comment"
                value={dataPriorities.comment}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
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
          <div className="itemUpdate">
            <button type="submit">Update Item</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Priorityid;
