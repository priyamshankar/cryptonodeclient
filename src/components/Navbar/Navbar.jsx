import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import "./style/Navbar.css";
import bell from "../../Global/GlobalImages/bell.png";
import Notification from '../notiifcation/Notification';
import Auth from '../../controllers/Auth';

const Navbar = () => {
const [notiToggle , setnotiToggle ] = useState(false);
  const [notificaiton,setNotification] = useState([]);
  
  const [loginTrue, setloginTrue] = useState(true);
  const fetch = async () => {
    try {
      const loggedin = await Auth();
      // console.log(loggedin);
      if(!loggedin){
        setloginTrue(true);
      }else{
        setloginTrue(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {

    fetch();
  }, []);

  const fetchNotifications = async () =>{
    await axios.post("http://localhost:5000/api/notification",{id:Cookies.get("id")}).then((res)=>{
      setNotification(res.data);
      // console.log(res.data);
    });
  }

  useEffect(() => {
    fetchNotifications(); 

    const interval = setInterval(() => {
      fetchNotifications(); 
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  function toggleHandle(){
    setnotiToggle(!notiToggle);
  }

  return (
    <div className='navbar-container'>
      <div className="logopart">
      <div className="cmpName">CryptoNodes</div>
      <img src="https://blockspot-io.b-cdn.net/wp-content/uploads/luganodes-company-logo.webp" alt="logo" />
      </div>
      <div className="btnContents">
          <a href="/">
        <button>
          Home
        </button>
          </a>
        {/* <button>
          Favourites
        </button> */}
        {loginTrue?<button>
          <a href="/login">Login</a>
        </button>:<button> <a href="/logout">Logout</a></button>}
        
      </div>
        <div className="lastEmb">
          {!loginTrue ?<>
          {notiToggle && <div className="closeban"onClick={toggleHandle}></div>}
          <div className="bell" >
          <img src={bell} alt="" onClick={toggleHandle}/>
          <p>{notificaiton.length}</p>
         {notiToggle && <Notification notificaiton={notificaiton} setNotification={setNotification}/>}
          </div>
          </>:<></>}
          <a href="https://github.com/priyamshankar">
            <button> Contact us</button>
            </a>
        </div>

    </div>
  )
}

export default Navbar