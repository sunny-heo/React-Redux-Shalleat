import React from "react";
import { connect } from "react-redux";
import { signUpUser } from "../../actions/userAction";
import { getAllFormInput } from "../../_helpers/formHelper.js";

import SignUpForm from "../forms/SignUpForm";

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.userReducer.user,
    pendingSignUp: state.userReducer.pendingSignUp,
    signedUp: state.userReducer.signedUp
  };
};

const SignUpPage = props => {
  const handleSignUp = e => {
    e.preventDefault();
    const { currentTarget } = e;
    const userInput = getAllFormInput(currentTarget);
    console.log(props);
    props.dispatch(signUpUser(userInput));
    console.log(props);
  };

  return (
    <div className="SignUpPage d-flex flex-column justify-content-center align-items-center w-100">
      <SignUpForm onSignUpClick={handleSignUp} />
    </div>
  );
};

export default connect(mapStateToProps)(SignUpPage);
