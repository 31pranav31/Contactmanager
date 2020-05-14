import React, { Component } from "react";
import { Consumer } from "../../Context";
import TextInputGroup from "../layout/TextInputGroup";
import { v4 as uuid } from "uuid";
import axios from "axios";

class EditContact extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    phone: "",
    errors: {
      name: "",
      email: "",
      phone: "",
    },
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/users/" + id
    );

    this.setState({
      id: id,
      name: res.data.name,
      email: res.data.email,
      phone: res.data.phone,
    });
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = async (dispatch, id, e) => {
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

    const res = await axios.put(
      "https://jsonplaceholder.typicode.com/users/" + id,
      contact
    );

    dispatch({
      type: "UPDATE_CONTACT",
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
    const { id, name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.handleOnSubmit.bind(this, dispatch, id)}>
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
                    value="Update Contact"
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

export default EditContact;
