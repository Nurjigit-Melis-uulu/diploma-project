import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import classes from "./Level.module.css";

function Level(props) {
  let time = props.time;
  return (
    <NavLink to="/Game" onClick={props.onLevelParams(time)} style={{textDecoration: "none", color: "black"}}>
      <div className={classes.Level}>
        <i>time: {props.time}</i>
        <span>{props.level}</span>
        <div className={classes.stars}>
          <span className={classes.star} />
          <span className={classes.star} />
          <span className={classes.star} />
        </div>
      </div>
    </NavLink>
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
