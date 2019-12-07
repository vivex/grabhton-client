import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Moment from '@date-io/moment';

import Header from './modules/Commons/containers/Header';


const placeholder = {
  color: 'blue',
};

const theme = createMuiTheme({
  palette: {
    white: {500: '#fffff'},
    primary: { 500: '#075aa0' },
    secondary: { 500: '#55c6a5', main: '#55c6a5' },
    danger: { 500: '#c61f03', main: '#c61f03' },
  },
  spacing: 8,
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '1.2em',
      },
    },
    MuiTableRow: {
      root: {
        '&$selected': {
          backgroundColor: '#fff1f4',
        },
        '&$hover:hover': {
          backgroundColor: '#fff1f4',
        },
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: '1px solid #065aa0',
        },
      },
      input: {
        '&::-webkit-input-placeholder': placeholder,
        '&::-moz-placeholder': placeholder, // Firefox 19+
        '&:-ms-input-placeholder': placeholder, // IE 11
        '&::-ms-input-placeholder': placeholder, // Edge
      },
    },
    MuiButton: {
      root: {
        color: 'white',
      },
    },
  },
});

class Theme extends PureComponent {
  render() {
    const { children, showHeader } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={Moment}>
          <>
            {showHeader && <Header />}
            {children}
          </>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

Theme.propTypes = {
  children: PropTypes.element,
  showHeader: PropTypes.bool.isRequired,
};

Theme.defaultProps = {
  children: null,
};

const mapStateToProps = (state) => {
  const { appConfig: { showHeader } = {} } = state;
  return {
    showHeader,
  };
};

export default connect(mapStateToProps, null)(Theme);
