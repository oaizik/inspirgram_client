import { createMuiTheme } from '@material-ui/core/styles';
import {grey, red, pink} from '@material-ui/core/colors';


const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: grey,
        secondary: pink,
        error: red,
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
      },
    typography: { useNextVariants: true },
});

export default theme;