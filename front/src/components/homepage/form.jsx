import React, { useState } from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import { connect } from "react-redux";
import { createProfile } from "../Redux/Data/data.actions";

const Form = ({ createProfile }) => {
  const [state, setstate] = useState({
    category: "",
    cost: "",
    description: ""
  });

  const { category, cost, description } = state;

  const onChange = e => setstate({ ...state, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    createProfile(state);
    window.alert("Expense Added");
  };

  return (
    <div className="col text-center">
      <Popup
        trigger={
          <button className="btn btn-primary col text-center">
            Add Expense
          </button>
        }
        position="bottom center"
      >
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <select
              name="category"
              value={category}
              onChange={e => onChange(e)}
            >
              <option value="0">Select Category</option>
              <option value="Food">Food </option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utility">Utility</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group social-input">
            <input
              type="number"
              placeholder="cost in rupee"
              name="cost"
              value={cost}
              onChange={e => onChange(e)}
            />
          </div>

          <div className="form-group">
            <textarea
              placeholder="Description of product"
              name="description"
              value={description}
              onChange={e => onChange(e)}
            ></textarea>
          </div>

          <input type="submit" className="btn btn-primary my-1" />
        </form>
      </Popup>
    </div>
  );
};

Form.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(Form);
