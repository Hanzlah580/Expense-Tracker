import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../Redux/Data/data.actions";
import Item from "./profileItem";
import Pie from "./piechart";

const Data = ({ getCurrentProfile, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          {loading ? (
            <h5>.....</h5>
          ) : (
            <Fragment>
              <div className="profiles">
                {profile.length > 0 ? (
                  profile.map(profil => (
                    <Item key={profil._id} profile={profil} />
                  ))
                ) : (
                  <h4> No Expense is found...</h4>
                )}
              </div>
            </Fragment>
          )}
        </div>

        <div className="col-md">
          <Pie style={{ position: "static" }} />
        </div>
      </div>
    </div>
  );
};

Data.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profileReducer
});

export default connect(mapStateToProps, { getCurrentProfile })(Data);
