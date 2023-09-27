import { useState } from "react";
import userImage from "../../../images/user.jpg";
import moment from "moment";

const Message = ({ message,conversation}) => {
  const [hideTime,setHide]=useState(true)


  const hideHandler=()=>{
    setHide(!hideTime)
  }

  return (
    <div className={(conversation.fromUnit === message?.userId)? "message-box-unit" : "message-box "}>
      {(conversation.fromUnit === message?.userId) && <img src={conversation.fromUnitImg ?conversation.fromUnitImg:userImage} alt="" />}
      <div className="message-content">
      <div
      onClick={hideHandler}
        className={
          (conversation.fromUnit === message?.userId) ? "message-from-unit message" : "message-to-unit message"
        }
      >
        <span >
          {message?.message}
        </span>
       
        
      </div>
      <span className={hideTime ? 'hide-time time':'show-time time'} >
          {moment(message?.createdAt).fromNow()}
      </span>
      </div>
      {!(conversation.fromUnit === message?.userId)  && <img src={conversation.toUnitImg ?conversation.toUnitImg:userImage} alt="" className="from-unit-img" />}
    </div>
  );
};

export default Message;
