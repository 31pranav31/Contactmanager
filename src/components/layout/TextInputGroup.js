import React from "react";
import classnames from "classnames";

const TextInputGroup = (props) => {
  const {
    label,
    type,
    name,
    placeholder,
    value,
    handleOnChange,
    error,
  } = props;

  return (
    <div className="form-group">
      <label htmlFor="name">{label}</label>
      <input
        type={type}
        name={name}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
};

export default TextInputGroup;
