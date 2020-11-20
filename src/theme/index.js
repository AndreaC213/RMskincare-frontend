import _ from 'lodash';
import {
  colors,
  createMuiTheme
} from '@material-ui/core';
import { THEMES } from 'src/constants';
import { softShadows } from './shadows';
import typography from './typography';

const baseTheme = {
  direction: 'ltr',
  name: THEMES.LIGHT,
  typography,
  overrides: {
    MuiInputBase: {
      input: {
        '&::placeholder': {
          opacity: 1,
          color: colors.blueGrey[600]
        }
      }
    }
  },
  palette: {
    type: 'light',
    action: {
      active: colors.blueGrey[600]
    },
    background: {
      default: colors.common.white,
      dark: '#f4f6f8',
      paper: colors.common.white
    },
    primary: {
      main: colors.indigo[600]
    },
    secondary: {
      main: '#5850EC'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows: softShadows
};

export const createTheme = () => {

  let theme = createMuiTheme(
    _.merge(
      {},
      baseTheme,
    )
  );

  return theme;
}
