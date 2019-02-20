import React from "react";
import classnames from "classnames";

const TextFieldGroup = ({
  name,
  value,
  htmlFor,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="row">
      <div className="input-field col s12">
        <input
          className={classnames("validate", { invalid: error })}
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <label className="active" htmlFor={htmlFor}>
          Enter your {name}
        </label>
        {info && <small>{info}</small>}
        {error && <div className="red-text">{error}</div>}
      </div>
    </div>
  );
};

TextFieldGroup.defaultProps = {
  type: "text"
};
export default TextFieldGroup;
