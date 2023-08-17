import { useState } from "react";
import Select from "../components/Select";
import ConversationList from "../components/admin/ConversationList";

import ConversationBox from "../components/admin/ConversationBox";
import waitinBnner from "../../images/user-interface-8.png"

const Chat = () => {
  const [selectedOption, setSelectedOption] = useState("All");
  const [conv, setConv] = useState("");
  const options = [
    { label: "All", value: "All" },
    { label: "Unread", value: "Unread" },
  ];
  const conversations = [
    {
      id: 1,
      name: "Hamza Essalhi",
      lastMessage: "Iwa, nkhedem.",
      lastSeen: "1d",
      read: false,
    },
    {
      id: 2,
      name: "Abdo Essalhi",
      lastMessage: "Yes, let's start.",
      lastSeen: "30 min",
      read: false,
    },
    {
      id: 3,
      name: "Kamal Essalhi",
      lastMessage: "Oui, commençons.",
      lastSeen: "2min",
      read: false,
    },
    {
      id: 4,
      name: "Yassine Essalhi",
      lastMessage: "Sí, comencemos.",
      lastSeen: "1h",
      read: true,
    },
  ];

  const handleSelectOption = (value) => {
    setSelectedOption(value);
  };
  const getId = (value) => {
    setConv(filteredConversations[value]);
  };


  const filteredConversations = conversations.filter((message)=>selectedOption==='All' || !message.read)

  return (
    <div className="chat-container">
      <div className="left">
        <div>
          <Select
            options={options}
            defaultValue="All"
            onChange={handleSelectOption}
          ></Select>
          {filteredConversations.map((conversation, i) => (
            <ConversationList
              key={i}
              conversation={conversation}
              defaultValue={filteredConversations[0]}
              func={getId}
            />
          ))}
        </div>
      </div>
      <div className="right">
        {conv ? (
          <ConversationBox conversation={conv} />
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
