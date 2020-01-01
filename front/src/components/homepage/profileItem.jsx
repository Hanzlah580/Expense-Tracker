import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Item = ({ profile: { category, cost, description, date } }) => {
  
  
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">Category [{category}]</h5>

        <h6 className="card-subtitle mb-2 text-muted">Rupees [{cost}]</h6>
        <h6 className="card-text">Description: [{description}]</h6>
        <h6 className="card-title">
          <Moment format="YYYY/MM/DD HH:mm:ss">{date}</Moment>
        </h6>
      </div>
    </div>
  );
};

Item.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Item;
