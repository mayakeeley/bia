import {createMuiTheme} from "@material-ui/core";

const defaultFonts = [
  "Open Sans",
  "Arial",
  "Helvetica Neue",
  "Helvetica",
  "sans-serif",
].join(",");

const headingFonts = ["Poppins", "sans-serif"].join(",");

export const white = "#FFFFFF";
export const black = "#000000";
export const grey = "#868686";
export const lavenderBlush = "#FFF3F7";
export const azalea = "#F7C0CB";
export const mauvelous = "#EF7D95";
export const jordyBlue = "#88B6EC";
export const springRain = "#ADCDB8";
export const rajah = "#F6B45C";
export const jaffa = "#F07A48";

const textColor = black;
const contrastText = white;
const theme = createMuiTheme({
  palette: {
    background: {
      default: white,
    },
    primary: {
      main: azalea,
      contrastText,
    },
    secondary: {
      main: jordyBlue,
      contrastText,
    },
    success: {
      main: springRain,
      contrastText,
    },
    error: {
      main: jaffa,
      contrastText,
    },
    info: {
      main: grey,
      dark: black,
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
      // h1 = Title 1
    },
    h2: {
      fontFamily: headingFonts,
      color: textColor,
      fontWeight: 700,
      fontSize: "30px",
      // h2 = Title 2
    },
    h3: {
      fontFamily: headingFonts,
      color: textColor,
      fontWeight: 700,
      fontSize: "24px",
      // h3 = Title 3
    },
    h4: {
      fontFamily: headingFonts,
      color: textColor,
      fontWeight: 700,
      fontSize: "20px",
      // h4 = Title 4
    },
    h5: {
      fontFamily: headingFonts,
      color: textColor,
      fontWeight: 700,
      fontSize: "16px",
      // h5 = Title 5
    },
    h6: {
      fontFamily: headingFonts,
      color: textColor,
      fontWeight: 700,
      fontSize: "14px",
      // h6 = Title 6
    },
    subtitle1: {
      fontFamily: headingFonts,
      color: textColor,
      fontWeight: 400,
      fontSize: "20px",
      // subtitle1 = Title 7
    },
    subtitle2: {
      fontFamily: headingFonts,
      color: textColor,
      fontWeight: 400,
      fontSize: "16px",
      // subtitle2 = Title 8
    },
    body1: {
      fontFamily: headingFonts,
      color: textColor,
      fontWeight: 400,
      fontSize: "14px",
      // body1 = Title 9
    },
    button: {
      fontFamily: defaultFonts,
      textTransform: "none",
      fontSize: "14px",
      color: contrastText,
      fontWeight: 700,
    },
  },
  props: {
    MuiToolbar: {
      variant: "dense",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        "&.MuiButton-contained": {
          backgroundColor: jordyBlue,
          color: white,
          "&$hover": {
            backgroundColor: jordyBlue,
            color: white,
          },
        },
      },
    },
  },
});

export default theme;
