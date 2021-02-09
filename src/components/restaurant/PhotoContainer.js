import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { compose, withState, withHandlers, lifecycle } from "recompose";

import Fade from "@material-ui/core/Fade";
import DetailList from "./DetailList";

const enhance = compose(withStyles(styles));

const PhotoContainer = enhance(props => {});

export default PhotoContainer;
