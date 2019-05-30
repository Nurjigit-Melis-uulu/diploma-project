import React from 'react';

import classes from './LevelsPage.module.css';
import Level from '../../Levels/Level/Level';

function LevelsPage(props) {
  return (
    <div className={classes.LevelsPage}>
      <h1>Levels</h1>
      <div className={classes.content}>
        <div className={classes.carousel}>
          <Level />
          <Level />
          <Level />
          <Level />
          <Level />
        </div>
      </div>
      LevelsPage
    </div>
  );
}

export default LevelsPage;