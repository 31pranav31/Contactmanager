import React, { Component } from "react";
import { Consumer } from "../../Context";
import TextInputGroup from "../layout/TextInputGroup";
import { v4 as uuid } from "uuid";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {
      name: "",
      email: "",
      phone: "",
    },
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    if ("" == name) {
      this.setState({ errors: { name: "Name is required." } });
      return;
    }
    if ("" == email) {
      this.setState({ errors: { email: "Email is required." } });
      return;
    }
    if ("" == phone) {
      this.setState({ errors: { phone: "Phone is required." } });
      return;
    }

    const contact = {
      name: name,
      email: email,
      phone: phone,
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      contact
    );

    dispatch({
      type: "ADD_CONTACT",
      payload: res.data,
    });

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: "",
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.handleOnSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="Enter Name..."
                    value={name}
                    handleOnChange={this.handleOnChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter Email..."
                    value={email}
                    handleOnChange={this.handleOnChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    type="text"
                    name="phone"
                    placeholder="Enter Phone..."
                    value={phone}
                    error={errors.phone}
                    handleOnChange={this.handleOnChange}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-block btn-light"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
