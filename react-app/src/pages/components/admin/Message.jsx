import userImage from "../../../images/user.jpg";
const Message = ({ message }) => {
  
  return (
    <div className={
        message.fromUnit ? "message-box-unit" : "message-box "
      }>
      {message.fromUnit  && <img src={userImage} alt="" />}
      <div
        className={
          message.fromUnit ? "message-from-unit message" : "message-to-unit message"
        }
      >
        <span>
          {message.message}
        </span>
      </div>
      {!message.fromUnit  && <img src={userImage} alt="" className="from-unit-img" />}
    </div>
  );
};

export default Message;
