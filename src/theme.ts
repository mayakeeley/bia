import { createMuiTheme } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const defaultFonts = [
  "Open Sans",
  "Arial",
  "Helvetica Neue",
  "Helvetica",
  "sans-serif",
].join(",");

const defaultFontsLight = [
  "Open Sans Light",
  "Arial Light",
  "Helvetica Neue Light",
  "Helvetica light",
  "sans-serif",
].join(",");

const headingFonts = ["Poppins", "sans-serif"].join(",");

const drawerWidth = 225;

const textColor = "#666666";
const contrastText = "#ffffff";
const inputFontSize = "1.2rem";
const secondaryColor = "#329be2";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#ee2e24",
      contrastText,
    },
    secondary: {
      main: secondaryColor,
      contrastText,
    },
    success: {
      main: green[600],
      contrastText,
    },
    error: {
      main: red[600],
      contrastText,
    },
    info: {
      main: "#d3d3d3",
      dark: "#000000",
    },
    text: {
      primary: textColor,
    },
  },
  typography: {
    /* 
      `htmlFontSize` is the font size for the <html> element, browser default is 16px, (62.5% of 16px = 10px)  
    */
    htmlFontSize: 10,
    fontFamily: defaultFonts,
    h1: {
      fontFamily: headingFonts,
      color: textColor,
      fontWeight: 700,
      fontSize: "36px",
      // h1 should be used for Home Product Headline
    },
    h2: {
      fontFamily: headingFonts,
      fontSize: "24px",
      color: textColor,
      // h2 should be used for Page Headline
    },
    h3: {
      fontFamily: headingFonts,
      fontSize: "20px",
      color: textColor,
      // h3 should be used for Section Headlines
    },
    subtitle1: {
      fontFamily: defaultFontsLight,
      fontSize: "25px",
      color: textColor,
      // subtitle1 should be used for Large Figures
    },
    subtitle2: {
      fontFamily: defaultFonts,
      fontSize: "20px",
      // subtitle2 should be used for Promotion Text and applied a colour subject to Field Colour
    },
    body1: {
      fontFamily: defaultFonts,
      fontSize: "1.4rem",
      color: textColor,
      // using rem here as that's what's used in UPP
      // body1 should be used for body text, and used in "semi-bold" for bold body text and table headers
    },
    body2: {
      fontFamily: defaultFonts,
      fontSize: "1.2rem",
      color: textColor,
      // using rem here as that's what's used in UPP
      // body2 should be used for small body text
    },
    button: {
      fontFamily: defaultFonts,
      textTransform: "none",
      fontSize: "13px",
    },
  },
  props: {
    MuiToolbar: {
      variant: "dense",
    },
    MuiTextField: {
      size: "small",
      color: "secondary",
    },
  },

  overrides: {
    MuiAppBar: {
      colorDefault: { backgroundColor: "#fafafa" },
    },
    MuiCard: {
      root: {
        borderTop: "#ee2e24 2px solid",
        borderRadius: "0 0 2px 2px",
        padding: "16px",
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        "border-color": "lightGrey",
      },
    },
    MuiInputBase: {
      input: {
        fontSize: inputFontSize,
      },
      root: {
        borderRadius: 4,
        backgroundColor: "white",
        "&.MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: "#bdbdbd",
          },
          "&.Mui-focused fieldset": {
            borderColor: secondaryColor,
          },
        },
      },
    },
    MuiFormControl: {
      root: {
        borderRadius: 4,
        backgroundColor: "white",
        "&.MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: "#bdbdbd",
          },
          "&.Mui-focused fieldset": {
            borderColor: secondaryColor,
          },
        },
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: inputFontSize,
      },
    },
    MuiTab: {
      root: {
        backgroundColor: "#f5f5f5",
        "&$selected": {
          backgroundColor: "#eeeeee",
        },
      },
    },
    MuiDrawer: {
      root: {
        width: drawerWidth,
      },
      paper: {
        width: drawerWidth,
        backgroundColor: "#e1e1e1",
      },
    },
  },
});

export default theme;
