import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import "./style/notification.css";
import Auth from "../../controllers/Auth";

const Notification = ({ notificaiton, setNotification }) => {
  const [loginTrue, setloginTrue] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        const loggedin = await Auth();
        // console.log(loggedin);
        if (!loggedin) {
          setloginTrue(true);
        } else {
          setloginTrue(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);
  async function clearNotification() {
    setNotification([]);
    await axios.post("http://localhost:5000/api/clearNotification", {
      id: Cookies.get("id"),
    });
  }

  return (
    <div className="notifContainer">
        
      <div className="headNoti">
        <h2>Notification</h2>

        <button onClick={clearNotification}>Clear</button>
      </div>
      <div className="notimapcontainer">
        {notificaiton.length!==0 ? <>
        {notificaiton.map((notiData, i) => {
          return (
            <div className="notiContent" key={i}>
              <hr />
              Alert {notiData.coin} price is {notiData.price}
            </div>
          );
        })}</>
    :<> No alerts now, Come back Later </>}
      </div>
    </div>
  );
};

export default Notification;
