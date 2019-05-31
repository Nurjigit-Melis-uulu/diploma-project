import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import classes from "./Level.module.css";

function Level(props) {
  let time = props.time;

  let transportParams = () => {
    props.onLevelParams(time);
  }

  return (
    <NavLink onClick={transportParams} to="/Game" style={{textDecoration: "none", color: "black"}}>
      <div className={classes.Level}>
        <i>time: {time}</i>
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
