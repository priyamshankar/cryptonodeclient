import React, { useState } from "react";
import "./Style/AlertBox.css";
import cookies from "js-cookie";
import axios from "axios";

const AlertBox = ({ setAlert, coinId, coinPrice }) => {
  const [limits, setLimits] = useState({
    userId: cookies.get("id"),
    coinId: coinId,
    min: coinPrice,
    max: coinPrice,
    notify: false,
  });

  function handleChange(e) {
    setLimits({ ...limits, [e.target.name]: e.target.value });
    
  }

  function handlesubmit() {
    axios.post("https://cryptonodeserver.vercel.app/api/alert", limits).then((res) => {
      // if(res.status===200){
      //     alert("alert added successfully");
      // }
      // else {
      //     alert("some Error occurred");
      // }
      setAlert(false);
    });
  }
  function handlecheck(e) {
    setLimits({ ...limits, ["notify"]: e.target.checked });
  }

  return (
    <div className="alertBoxContainer">
      <h2>Create an Alert</h2>
      <div className="inputBoxes">
        <span>
          <input
            type="number"
            placeholder="Enter the minimunm limit"
            onChange={handleChange}
            value={limits.min}
            name="min"
          />
          <label htmlFor="min">Minimum Limit</label>
        </span>
        <span>
          <input
            type="number"
            value={limits.max}
            onChange={handleChange}
            placeholder="Enter the Maximum Limit"
            name="max"
          />
          <label htmlFor="max">MaximumLimit</label>
        </span>
      </div>
      <div className="check">
        <input type="checkbox" name="notify" onChange={handlecheck} /> Also
        Notify via Email.
      </div>
      <div className="alertButtons">
        <button
          onClick={() => {
            setAlert(false);
          }}
        >
          cancel
        </button>
        <button onClick={handlesubmit}>Add</button>
      </div>
    </div>
  );
};

export default AlertBox;
