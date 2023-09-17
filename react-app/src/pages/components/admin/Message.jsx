import userImage from "../../../images/user.jpg";
const Message = ({ message,conversation }) => {

  return (
    <div className={(conversation.fromUnit === message.userId)? "message-box-unit" : "message-box "}>
      {(conversation.fromUnit === message.userId) && <img src={conversation.fromUnitImg ?conversation.fromUnitImg:userImage} alt="" />}
      <div
        className={
          (conversation.fromUnit === message.userId) ? "message-from-unit message" : "message-to-unit message"
        }
      >
        <span>
          {message.message}
        </span>
      </div>
      {!(conversation.fromUnit === message.userId)  && <img src={conversation.toUnitImg ?conversation.toUnitImg:userImage} alt="" className="from-unit-img" />}
    </div>
  );
};

export default Message;
