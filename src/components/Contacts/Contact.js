import React, { Component } from "react";
import { Consumer } from "../../Context";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

class Contact extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired,
  };
  state = {
    showContactInfo: false,
  };
  onShowClick = () => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };

  onEditClick = (id, dispatch) => {
    this.props.history.push("/");
  };

  onDeleteClick = async (id, dispatch) => {
    axios.delete("https://jsonplaceholder.typicode.com/users/" + id);
    dispatch({ payload: id, type: "DELETE_CONTACT" });
  };

  render() {
    return (
      <Consumer>
        {(value) => {
          const { id, name, email, phone } = this.props.contact;
          const { dispatch } = value;
          const { showContactInfo } = this.state;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                ></i>
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                ></i>
                <Link to={"/contacts/edit/" + id}>
                  <i
                    className="fas fa-pencil-alt mr-2"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                    }}
                  ></i>
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone : {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contact;
