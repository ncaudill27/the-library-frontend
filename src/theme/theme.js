import { createMuiTheme } from "@material-ui/core/styles"

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6dcbe0",
      light: "#a2feff",
      dark: "#349aae",
    },
    secondary: {
      main: "#eaa29f",
      light: "#ffd4d0",
      dark: "#b67371",
    },
    /* ----------
      DEFAULT BREAKPOINTS
      xs, extra-small: 0px
      sm, small: 600px
      md, medium: 900px
      lg, large: 1200px
      xl, extra-large: 1536px
    ---------- */
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#ffd4d0",
      },
    },
  },
})
