import React from "react";
import classnames from "classnames";
import Aux from "../hoc/Aux";

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
    <Aux>
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
        {name.toUpperCase()}
      </label>
      {info && <small>{info}</small>}
      {error && <div className="red-text">{error}</div>}
    </Aux>
  );
};

TextFieldGroup.defaultProps = {
  type: "text"
};
export default TextFieldGroup;
