import { BsCheck2All } from "react-icons/bs";
import userImageFromUnit from "../../../images/user.png";
import userImageToUnit from "../../../images/userTo.png";
import { useNavigate } from 'react-router-dom';
// import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {setChatNotification,clearChatNotification} from "../../../toolkit/chatNotification/chatNotificationActions"

import io from 'socket.io-client'
const endPoint = 'http://localhost:9000'
const TenWordsSpan = ({ conversation }) => {
  const tenWords = conversation.split(' ').length > 6 ? conversation.split(' ').slice(0, 5).join('') : conversation;

  return tenWords?.split(' ').length > 4 ? <span className="alert-message">{tenWords}...</span> : <span className="alert-message">{tenWords}</span>;
}



const ConversationList = ({ getMessagesByConversation, conversation }) => {
  const user = useSelector((state) => state.auth.user?.user);
  let counter =useSelector((state) => state.chatNotification.chatNotificationCounter);
  const socket = useRef(io(endPoint))
  const [online, setOnline] = useState('')
const dispatch=useDispatch()
  useEffect(() => {
    if(conversation.fromUnit===user._id){
      if(!conversation.readedByFromUnit){
        dispatch(setChatNotification(counter++))
        
      }
      else{
        dispatch(clearChatNotification())
      }
    }
    if(conversation.toUnit===user._id){
      if(!conversation.readedBytoUnit){
        dispatch(setChatNotification(counter++))
        
      }
      else{
        dispatch(clearChatNotification())
      }
    }
    socket.current.on('getOnlineUsers', users => {
      const exists = users.some(item => item.userId === user._id);
      if (exists) {
        setOnline(true)
      }
      else {
        setOnline(false)
      }
    })
  }, [online, user._id,conversation,counter,dispatch])
  const navigate = useNavigate();
  const handleSelection = () => {
    getMessagesByConversation(conversation.conversionGeneId)
    const route = `/chat/${conversation.conversionGeneId}`;
    navigate(route);
  };

  return (
    <div className="conversation-list" onClick={handleSelection}>
      <div className='row'>
        <div className={online ? 'user-img-online' : 'user-img-offline'}>
        <img src={(conversation.fromUnit !== user._id && conversation.fromUnitImg) ? conversation.fromUnitImg : (conversation.fromUnit === user._id && conversation.toUnitImg) ? conversation.toUnitImg : !conversation.fromUnitImg  ? userImageFromUnit : userImageToUnit} alt="" />
          <span className="online"></span>
        </div>
        <div className="div-conv">
          <span>{(conversation.fromUnit !== user._id) ? conversation.fromUnitName : conversation.toUnitName}</span>
          {/* {online?<span >online </span>:(conversation.fromUnit !== user._id) ? <span >{moment(conversation.fromUnitLastSeen).fromNow()}</span> : <span >{moment(conversation.toUnitLastSeen).fromNow()}</span>}  */}
          <div className="last-message">
          {conversation.lastMessage && <TenWordsSpan conversation={conversation.lastMessage} />}
          {conversation.readedByToUnit && conversation.lastMessage && <BsCheck2All className="ckeckers"></BsCheck2All>}

        </div>
        </div>
        
      </div>
    </div>
  );
};

export default ConversationList;
