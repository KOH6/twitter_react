import React, { Fragment } from "react";
import { createUser } from "../apis/signup";

const TEST_DATA = {
  email: "aa@example.com",
  password: "Abcd1234",
  phone: "1234",
  birthdate: "1990-01-01",
  confirm_success_url: "http://google.com",
};

export const SignUp = () => {
  const handleSubmit = async () => {
    try {
      const res = await createUser(TEST_DATA);
      console.log("res", res);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Fragment>
      <div className="div">SignUp</div>
      <label>mail</label>
      <input />
      <label>password</label>
      <input />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </Fragment>
  );
};
