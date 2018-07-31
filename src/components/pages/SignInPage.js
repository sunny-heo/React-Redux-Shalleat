// import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";

// import { signInUser } from "../../actions/userAction";
// import { getAllFormInput } from "../../_helpers/formHelper.js";

// import Loader from "react-loader-spinner";
// import SignInForm from "../authentications/SignInForm";
// // import GoogleSignIn from "../authentications/GoogleSignIn";

// const mapStateToProps = (state, ownProps) => {
//   return {
//     user: state.userReducer.user,
//     pendingSignIn: state.userReducer.pendingSignIn,
//     signedIn: state.userReducer.signedIn
//   };
// };

// class SignInPage extends Component {
//   state = {
//     // googleSignIn: false,
//     // facebookSignIn: false
//     thirdPartySignIn: true
//   };

//   handleSignIn = e => {
//     e.preventDefault();
//     const userInput = getAllFormInput(e.currentTarget);
//     this.props.dispatch(signInUser(userInput));
//   };

//   handleGuestMode = e => {
//     e.preventDefault();
//     const guest = {
//       email: "guest@shalleat.com",
//       password: "guest1!2@"
//     };
//     this.props.dispatch(signInUser(guest));
//   };
//   SwitchComponent = () => {
//     switch (true) {
//       // case this.state.thirdPartySignIn:
//       //   return <GoogleSignIn />;
//       case this.props.pendingSignIn:
//         return (
//           <Loader type="TailSpin" color="#00BFFF" height="100" width="100" />
//         );
//       case this.props.signedIn:
//         return (
//           <div className="SignInPage d-flex flex-column justify-content-center align-items-center w-100">
//             Signed In!
//           </div>
//         );

//       default:
//         return (
//           <div>
//             <h1 className="display-4 auth-title mb-4">Sign In</h1>
//             <SignInForm
//               onSignInClick={this.handleSignIn}
//               onGuestModeClick={this.handleGuestMode}
//               thirdPartySignIn={thirdPartySignIn}
//               // updateThirdPartySignIn={updateThirdPartySignIn}
//             />
//           </div>
//         );
//     }
//   };
//   render() {
//     return (
//       <div
//         className="SignInPage d-flex flex-column justify-content-center align-items-center w-100"
//         style={{ height: "94vh" }}
//       >
//         <div
//           className="SignInMethods shadow-sm bg-white rounded"
//           style={{
//             width: "450px",
//             height: "448px",
//             minHeight: "390px",
//             padding: "48px 40px"
//           }}
//         >
//           <this.SwitchComponent />
//         </div>
//       </div>
//     );
//   }
// }

// export default withRouter(connect(mapStateToProps)(SignInPage));

import React from "react";
import { compose, withReducer } from "recompose";
import { withRouter } from "react-router-dom";

import userReducer from "../../reducers/userReducer";
import { withStyles } from "@material-ui/core/styles";

import SignInHeader from "../Headers/SignInHeader";

const styles = theme => {
  return {
    SignInMethod: {
      background: "linear-gradient(to right, #5433ff, #20bdff);"
    }
  };
};

const enhance = compose(
  withStyles(styles),
  withReducer("state", "dispatch", userReducer)
);
const SignInPage = enhance(props => (
  <div
    className="SignInPage d-flex justify-content-center align-items-center w-100"
    style={{ height: "94vh" }}
  >
    <div
      className={
        props.classes.SignInMethod + " SignInMethods shadow-sm bg-white rounded"
      }
      style={{
        width: "450px",
        maxWidth: "100%",
        height: "448px",
        minHeight: "390px"
      }}
    >
      <SignInHeader {...props} />
    </div>
  </div>
));
export default withRouter(SignInPage);
