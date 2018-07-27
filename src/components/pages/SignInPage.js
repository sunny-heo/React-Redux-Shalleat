import React from "react";
import { connect } from "react-redux";
import { signInUser } from "../../actions/userAction";
import { getAllFormInput } from "../../_helpers/formHelper.js";

import SignInForm from "../forms/SignInForm";

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.userReducer.user,
    pendingSignIn: state.userReducer.pendingSignIn,
    signedIn: state.userReducer.signedIn
  };
};

const SignInPage = props => {
  const handleSignIn = e => {
    e.preventDefault();
    const { currentTarget } = e;
    const userInput = getAllFormInput(currentTarget);
    console.log(props);
    props.dispatch(signInUser(userInput));
    console.log(props);
  };

  const handleGuestMode = e => {
    e.preventDefault();
    const guest = {
      email: "guest@shalleat.com",
      password: "guest1!2@"
    };
    props.dispatch(signInUser(guest));
  };

  return (
    <SignInForm
      onSignInClick={handleSignIn}
      onGuestModeClick={handleGuestMode}
      // thirdPartySignIn={thirdPartySignIn}
      // updateThirdPartySignIn={updateThirdPartySignIn}
    />
  );
};

// return user ? (
//   <Redirect to="/" />
// ) : (
//   <div
//     className="SignInPage d-flex flex-column justify-content-center align-items-center w-100"
//     style={
//       isMobile
//         ? {}
//         : {
//             height: "94vh"
//           }
//     }
//   >
//     <div
//       className="SignInMethods shadow-sm bg-white rounded"
//       style={
//         isMobile
//           ? {
//               padding: "48px 40px"
//             }
//           : {
//               width: "450px",
//               height: "448px",
//               minHeight: "390px",
//               padding: "48px 40px"
//             }
//       }
//     >
//       <h1 className="display-4 auth-title mb-4">Sign In</h1>
//       <Animated
//         animationIn="fadeIn"
//         animationOut="fadeOut"
//         isVisible={thirdPartySignIn}
//         style={
//           thirdPartySignIn
//             ? {
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-around",
//                 height: "80%"
//               }
//             : { display: "none" }
//         }
//       >
//         <GoogleSignIn setAuthType={(setAuthType, authType)} />
//         <FacebookSignIn setAuthType={setAuthType} />

//         <button
//           className="btn btn-info text-capitalize ml-auto"
//           onClick={e => {
//             e.preventDefault();
//             updateThirdPartySignIn(!thirdPartySignIn);
//           }}
//         >
//           Sign in with ShallEat Account
//         </button>
//       </Animated>

//       <Animated
//         animationIn="fadeIn"
//         animationOut="fadeOut"
//         isVisible={!thirdPartySignIn}
//         style={!thirdPartySignIn ? {} : { display: "none" }}
//       >
//         <SignInForm
//           onSignInClick={handleSignIn}
//           onGuestModeClick={handleGuestMode}
//           thirdPartySignIn={thirdPartySignIn}
//           updateThirdPartySignIn={updateThirdPartySignIn}
//         />
//       </Animated>
//     </div>
//   </div>
// );
// }
// );

// export default SignInPage;
export default connect(mapStateToProps)(SignInPage);
