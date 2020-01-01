import React from 'react'
import Form from './form'
import Data from './getdata'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

 const Home = ({ifAuthorized}) => {

    if (ifAuthorized === null) {
        return <Redirect to="/signup" />;
       }
    return (
        <div>
            <Form />
            <Data />
        </div>
    )
}

const mapStateToProps = state => ({
    ifAuthorized: state.authReducer.isAuthenticated
  });
  
export default connect(mapStateToProps,null)(Home)
