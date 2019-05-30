import React from "react";
import { connect } from "react-redux";

import classes from "./Level.module.css";

function Level(props) {
  return (
    <div className={classes.Level} onClick={props.onLevelParams(props.time)}>
      <i>time: {props.time}</i>
      <span>{props.level}</span>
      <div className={classes.stars}>
        <span className={classes.star} />
        <span className={classes.star} />
        <span className={classes.star} />
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLevelParams: params => dispatch({ type: "TRANS_LEVEL_PARAMS", params })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Level);
