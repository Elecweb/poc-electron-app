import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import lightBlue from '@material-ui/core/colors/lightBlue';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: lightBlue[500],
    },
  },
});

export default theme;
