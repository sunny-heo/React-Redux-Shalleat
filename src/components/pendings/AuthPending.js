import React from "react";
import Loader from "react-loader-spinner";

const AuthPending = ({ height, width }) => (
  <Loader type="TailSpin" color="#00BFFF" height={height} width={width} />
);

export default AuthPending;
