import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import style from "../assets/css/signup.css";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    title: "",
    customer: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="mainContainer">
      <div className="containersign">
        <div className="signupTitle">
          <div className="titleSign">
            <h3>Sign Up to use Orderly</h3>
          </div>
          <div>
            <p>Get your backlog organised by taking the first step</p>
          </div>
        </div>
        <div className="signupcontainer">
          <form className="formInput" onSubmit={handleFormSubmit}>
            <div className="inputFields">
              <div>
                <h4>Display Name</h4>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <h4>Email</h4>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="inputFields">
              <div>
                <h4>Password</h4>
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <h4>Confirm Password</h4>
                <input
                  className="form-input"
                  placeholder="******"
                  name="confirm_password"
                  type="confirm_password"
                  // value={formState.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="inputFields">
              <div>
                <h4>Title</h4>
                <input
                  className="form-input"
                  placeholder="e.g. Service Delivery Manager"
                  name="title"
                  type="title"
                  value={formState.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="customerContainer">
              <div>
                {" "}
                <h4>Customers</h4>
              </div>
              <div className="customerInputs">
                <div>
                  <input
                    className="form-input"
                    placeholder="e.g. AusGrid"
                    name="customerOne"
                    type="text"
                    value={formState.customerOne}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="form-input"
                    placeholder="e.g. PowerCor"
                    name="customerTwo"
                    type="text"
                    value={formState.customerTwo}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="form-input"
                    placeholder="e.g. Dodo Energy"
                    name="customerThree"
                    type="text"
                    value={formState.customerThree}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="submitBtn">
              <button style={{ cursor: "pointer" }} type="submit">
                Sign Me Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
