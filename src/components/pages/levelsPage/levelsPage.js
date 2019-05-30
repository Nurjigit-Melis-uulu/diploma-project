import React from "react";
import { connect } from "react-redux";

import classes from "./LevelsPage.module.css";
import Level from "../../Levels/Level/Level";

function LevelsPage(props) {
  console.log(props.levels);
  
  let levels = props.levels.map(level => {
    return <Level level={level.level} />
  });

  return (
    <div className={classes.LevelsPage}>
      <h1>Levels</h1>
      <div className={classes.content}>
        <div className={classes.carousel}>{levels}</div>
      </div>
      LevelsPage
    </div>
  );
}

const mapStateToProps = state => {
  return {
    levels: state.levels
  };
};

export default connect(
  mapStateToProps,
  null
)(LevelsPage);
