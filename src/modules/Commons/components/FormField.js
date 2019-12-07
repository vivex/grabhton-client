import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import Hints from './Hints';

const FormField = (props) => {
  const {
    name, label, value, onChange, fieldType, index, hints, blockId,
  } = props;
  const [inFocus, setInFocus] = useState(false);
  const showHints = (inFocus && hints && hints.length > 0);

  const onFocus = () => {
    setInFocus(true);
  };

  const onBlur = () => {
    setInFocus(false);
  }

  if (fieldType === 'date') {
    const dateOnChange = (date) => {
      const fakeEvent = {
        target: {
          getAttribute: (key) => {
            if (key === 'name') {
              return name;
            }
            if (key === 'data-block-id') {
              return blockId;
            }
            if (key === 'data-index') {
              return index;
            }
            return null;
          },
          value: date._d,
        },
      };
      onChange(fakeEvent);
    };
    return (
      <DatePicker
        value={value}
        name={name}
        label={label}
        format="MMM - YYYY"
        keyboardbuttonprops={{
          'aria-label': 'change date',
        }}
        variant="dialog"
        inputVariant="standard"
        onChange={dateOnChange}
        style={{ width: '100%' }}
      />
    );
  }
  return (
    <>
      <TextField
        label={label}
        name={name}
        fullWidth
        value={value || ''}
        onChange={onChange}
        type={fieldType}
        inputProps={{ 'data-index': index, 'data-block-id': blockId }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {showHints ? (<Hints hints={hints} />) : null}
    </>
  );
};

FormField.defaultProps = {
  label: '',
  fieldType: 'text',
  index: 0,
  hints: [],
  value: null,
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  index: PropTypes.number,
  hints: PropTypes.array,
  value: PropTypes.string,
  blockId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  fieldType: PropTypes.oneOf(['text', 'select', 'date']),
};

export default FormField;
