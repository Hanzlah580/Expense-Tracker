import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  Authorized: { isAuthenticated, loading },
  ...restProps
}) => (
  <Route
    {...restProps}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to="/signin" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  Authorized: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  Authorized: state.authReducer
});

export default connect(mapStateToProps)(PrivateRoute);
