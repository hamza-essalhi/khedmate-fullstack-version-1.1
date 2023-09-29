import { useEffect, useState } from "react";
import ConversationList from "../components/admin/ConversationList";

import ConversationBox from "../components/admin/ConversationBox";
import waitinBnner from "../../images/user-interface-8.png"
import api from "../../toolkit/auth/config";
import { clearRequestWithDelay, } from "../../toolkit/request/requestActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BsFillChatLeftFill, BsXCircle } from "react-icons/bs";

const Chat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
    const { lastRequest } = useSelector((state) => state.request);
  const [converstion, setConverstion] = useState("");
  const [showSideBar, setShowSideBar] = useState("");
  // const [_id,putId]=useState('')
  
  
const showSideBarHandler=()=>{
  setShowSideBar(!showSideBar)
}

 
  useEffect(() => {
    const fetchFilteredConversation = async () => {
        try {
            const response = await api.get(`conversations/`);
            const conversation = response.data.conversation;
            // Check if the response contains the error message
            if (!response.data.error) {
                setConverstion(conversation);

            }

            dispatch(clearRequestWithDelay());
        } catch (error) {

        }
    };



    fetchFilteredConversation();
}, [lastRequest, dispatch,id]);
const getMessagesByConversation =(e)=>{
  // putId(e)
}

  return (
    <div className="chat-container">
      <div className={showSideBar ? 'show-side-menu side-menu-icon-hide':'show-side-menu top'} 
      onClick={showSideBarHandler}>
        <BsFillChatLeftFill className={showSideBar ? 'show-side-menu-icon side-menu-icon-hide':'show-side-menu-icon '}></BsFillChatLeftFill>
        </div>
      <div className={showSideBar ? 'left show':'left'}>
      <div className="show-side-menu in-m" onClick={showSideBarHandler}>
        <BsXCircle className="show-side-menu-icon in-menu"></BsXCircle>
        </div>
        <div className="conversation-box">
          {converstion ?converstion.map((conversation, i) => (
            <ConversationList
              key={i}
              conversation={conversation}
              defaultValue={conversation}
              getMessagesByConversation={getMessagesByConversation}
              
            />
          )):<h4>There is No Conversation</h4>}
        </div>
      </div>
      <div className={showSideBar ? 'right show':'right'}>
        {id ? (
          <ConversationBox  id={id}/>
        ) : (
          <div className="no-selected-conversation">
            <span>Pleas select a&#160;<strong> Conversation</strong></span>
            <img src={waitinBnner} alt="" className="waiting-banner"/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
