import React from 'react';
import { useState } from 'react';

import classes from './LevelsPage.module.css';

function LevelsPage(props) {

  const [status, setStatus] = useState(); 

  return (
    <div className={classes.LevelsPage}>
      LevelsPage
    </div>
  );
}

export default LevelsPage;