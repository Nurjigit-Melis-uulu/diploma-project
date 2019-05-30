import React from "react";

import classes from "./Level.module.css";

function Level(props) {
  return (
    <div className={classes.Level}>
      <span>{props.level}</span>
      <div className={classes.stars}>
        <span className={classes.star} />
        <span className={classes.star} />
        <span className={classes.star} />
      </div>
    </div>
  );
}

export default Level;
