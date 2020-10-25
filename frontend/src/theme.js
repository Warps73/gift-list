import {createMuiTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#333333',
        },
        secondary: {
            main: '#809594',
        },
        error: {
            main: '#bc5959',
        },
        success: {
            main: '#59bc81',
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;
