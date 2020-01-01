import React from "react";
import PropTypes from "prop-types";

//Meterial ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

//React router dom
import { Link } from "react-router-dom";

//react-redux
import { connect } from "react-redux";
import { userLogout } from "../Redux/Auth/auth.actions";

const theme = createMuiTheme({
  palette: {
    palette: {
      primary: {
        main: "#3d5afe"
      },
      secondary: "#2979ff"
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const ButtonAppBar = ({
  userLogout,
  ifAuthorized: { loading, isAuthenticated }
}) => {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static">
          {!loading &&
            (isAuthenticated ? (
              <Toolbar>
                <Typography
                  variant="h6"
                  className={classes.title}
                  component={Link}
                  to="/"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Home
                </Typography>
                <Button color="inherit" onClick={userLogout}>
                  Logout
                </Button>
              </Toolbar>
            ) : (
              <Toolbar>
                <Button color="inherit" component={Link} to={"/signup"}>
                  Register
                </Button>
              </Toolbar>
            ))}
        </AppBar>
      </div>
    </MuiThemeProvider>
  );
};

ButtonAppBar.propTypes = {
  userLogout: PropTypes.func.isRequired,
  ifAuthorized: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ifAuthorized: state.authReducer
});

export default connect(mapStateToProps, { userLogout })(ButtonAppBar);
