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
        {data ? (
          <p>
            Success! <Link to="/">Go back to the homepage.</Link>
          </p>
        ) : (
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
                    value={formState.username}
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
              </div>
              <div className="inputFields"></div>

              <div className="submitBtn">
                <button style={{ cursor: "pointer" }} type="submit">
                  Sign Me Up
                </button>
              </div>
            </form>
          </div>
        )}
        {error && <div className="">{error.message}</div>}
      </div>
    </main>
  );
};

export default Signup;
