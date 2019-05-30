import React from "react";

import classes from "./Level.module.css";

function Level(props) {
  return (
    <div className={classes.Level}>
      <span>1</span>
      <div className={classes.stars}>
        <span className={classes.star} />
        <span className={classes.star} />
        <span className={classes.star} />
      </div>
    </div>
  );
}

export default Level;
