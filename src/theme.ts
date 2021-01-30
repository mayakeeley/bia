import { createMuiTheme } from "@material-ui/core";

const defaultFonts = [
  "Open Sans",
  "Arial",
  "Helvetica Neue",
  "Helvetica",
  "sans-serif",
].join(",");

const headingFonts = ["Poppins", "sans-serif"].join(",");

export const white = "#ffffff";
export const black = "#000000";
export const grey = "#868686";
export const darkPink = "#ef7d95";
export const pink = "#f7c0cb";
export const lightPink = "#fff3f7";
export const blue = "#88b6ec";
export const green = "#adcdb8";
export const yellow = "#f6b45c";
export const orange = "#f07a48";

const textColor = black;
const contrastText = white;
const primaryColor = pink;
const secondaryColor = blue;

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    primary: {
      main: primaryColor,
      contrastText,
    },
    secondary: {
      main: secondaryColor,
      contrastText,
    },
    success: {
      main: green,
      contrastText,
    },
    error: {
      main: orange,
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
      fontSize: "25px",
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
      fontFamily: defaultFonts,
      color: textColor,
      fontWeight: 400,
      fontSize: "20px",
      // subtitle1 = Title 7
    },
    subtitle2: {
      fontFamily: defaultFonts,
      color: textColor,
      fontWeight: 400,
      fontSize: "16px",
      // subtitle2 = Title 8
    },
    body1: {
      fontFamily: defaultFonts,
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
});

export default theme;
