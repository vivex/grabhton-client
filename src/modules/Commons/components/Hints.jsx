import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { FormHelperText } from '@material-ui/core';
import '../styles/hints.css';

const Hints = (props) => {
  const { hints } = props;
  let currentIndex = 0;
  const [activeHint, setActiveHint] = useState(hints[currentIndex]);

  if (hints.length > 1) {
    useEffect(() => {
      const interval = setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= hints.length) newIndex = 0;
        currentIndex = newIndex;
        setActiveHint(null);
        setTimeout(() => {
          setActiveHint(hints[currentIndex]);
        }, 100);
      }, 3000);
      return () => clearInterval(interval);
    }, []);
  }

  return (
    <FormHelperText>
      {activeHint ? (
        <span className="rw-words">
          <span>{activeHint}</span>
        </span>
      ) : null}
    </FormHelperText>
  );
};

Hints.defaultProps = {
  hints: [],
};

Hints.propTypes = {
  hints: PropTypes.array,
};

export default Hints;
