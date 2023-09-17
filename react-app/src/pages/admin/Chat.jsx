import { useEffect, useState } from "react";
import Select from "../components/Select";
import ConversationList from "../components/admin/ConversationList";

import ConversationBox from "../components/admin/ConversationBox";
import waitinBnner from "../../images/user-interface-8.png"
import api from "../../toolkit/auth/config";
import { clearRequest, clearRequestWithDelay, completeRequest, errorRequests, startRequest } from "../../toolkit/request/requestActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
    const { lastRequest } = useSelector((state) => state.request);
  const [selectedOption, setSelectedOption] = useState("All");
  const [converstion, setConverstion] = useState("");
  const [_id,putId]=useState('')
  
  const options = [
    { label: "All", value: "All" },
    { label: "Unread", value: "Unread" },
  ];


  const handleSelectOption = (value) => {
    setSelectedOption(value);
  };
  useEffect(() => {
    const fetchFilteredConversation = async () => {
        try {
            const response = await api.get(`conversations/`);

            const conversation = response.data.conversation;
            console.log(conversation)
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
  console.log(e)
  putId(e)
}

  return (
    <div className="chat-container">
      <div className="left">
        <div>
          <Select
            options={options}
            op="All"
            onChange={handleSelectOption}
          ></Select>
          {converstion &&converstion.map((conversation, i) => (
            <ConversationList
              key={i}
              conversation={conversation}
              defaultValue={conversation}
              getMessagesByConversation={getMessagesByConversation}
              
            />
          ))}
        </div>
      </div>
      <div className="right">
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
