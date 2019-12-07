import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { SketchPicker } from 'react-color';

const styles = theme => ({
  color: {
    height: '14px',
    borderRadius: '2px',
  },
  swatch: {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
    width: '70%',
  },
  popover: {
    position: 'absolute',
    zIndex: '2',
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
});

const ColorPicker = (props) => {
  const {
    classes, name, value, onChange,
  } = props;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(value);
  const handleClick = () => {
    if (displayColorPicker) {
      onChange(name, color);
    }
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleChange = (evt) => {
    if (evt) {
      setColor(evt.hex);
      // onChange(name, evt.hex);
    }
  };
  return (
    <>
      <div className={classes.swatch} onClick={handleClick} role="button">
        <div className={classes.color} style={{ background: value }} />
      </div>
      { displayColorPicker ? (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={handleClick} role="button" />
          <SketchPicker color={{ hex: color }} onChangeComplete={handleChange} />
        </div>
      ) : null }

    </>
  );
};
ColorPicker.defaultProps = {
  value: '',
  classes: {},
  onChange: () => {},
  name: 'no_name',
};

ColorPicker.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

export default withStyles(styles)(ColorPicker);
