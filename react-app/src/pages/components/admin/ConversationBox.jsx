import userImage from "../../../images/user.jpg";
import { BsSend, BsStar, BsTrash } from "react-icons/bs";
import Message from "../../components/admin/Message";
import { useEffect, useRef, useState } from "react";

const ConversationBox = ({ conversation }) => {
    
  const messages = [
    [
      {
        id: 1,
        fromUnit: true,
        message: "salam an chwia onkon 3andek",
        read: true,
      },
      {
        id: 2,
        fromUnit: false,
        message: "Wa alaikum assalam, an mzyan, chokran.",
        read: true,
      },
      {
        id: 3,
        fromUnit: true,
        message: "Mzyan, chwia nkhedem?",
        read: false,
      },
      {
        id: 4,
        fromUnit: false,
        message: "Iwa, nkhedem.",
        read: false,
      },
      {
        id: 5,
        fromUnit: true,
        message:
          "Awdiii sir ghi bhlk mtkhdem lia mnkhdem lik dima din mok khawi bia,mais hania walh mara jaya ghnrod lbal ,daba gol lia wach ghtkhdem ah la?",
        read: false,
      },
      {
        id: 6,
        fromUnit: true,
        message: "Iwa, nkhedem.",
        read: false,
      },
      {
        id: 7,
        fromUnit: false,
        message: "ok",
        read: false,
      },
    ],
    [
      {
        id: 1,
        fromUnit: true,
        message: "Hi, how are you?",
        read: true,
      },
      {
        id: 2,
        fromUnit: false,
        message: "I am fine, thank you.",
        read: true,
      },
      {
        id: 3,
        fromUnit: true,
        message: "Great, shall we start working?",
        read: false,
      },
      {
        id: 4,
        fromUnit: false,
        message: "Yes, let's start.",
        read: false,
      },
    ],
    [
      {
        id: 1,
        fromUnit: true,
        message: "Bonjour, comment ça va?",
        read: true,
      },
      {
        id: 2,
        fromUnit: false,
        message: "Je vais bien, merci.",
        read: true,
      },
      {
        id: 3,
        fromUnit: true,
        message: "Super, commençons-nous à travailler?",
        read: false,
      },
      {
        id: 4,
        fromUnit: false,
        message: "Oui, commençons.",
        read: false,
      },
    ],
    [
      {
        id: 1,
        fromUnit: true,
        message: "Hola, ¿cómo estás?",
        read: true,
      },
      {
        id: 2,
        fromUnit: false,
        message: "Estoy bien, gracias.",
        read: true,
      },
      {
        id: 3,
        fromUnit: true,
        message: "Genial, ¿empezamos a trabajar?",
        read: false,
      },
      {
        id: 4,
        fromUnit: true,
        message: "Sí, comencemos.",
        read: false,
      },
    ],
  ];

  const messageBoxRef=useRef()
  
  const [inputValue,setInputValue]=useState('')
  const conversationMessages = messages[conversation.id - 1];
  
  
  useEffect(()=>{
    scrollToBottom()

  },[conversationMessages])
 
  const scrollToBottom=()=>{
    messageBoxRef.current.scrollTop =messageBoxRef.current.scrollHeight
  }
  const handleInputChnge=(e)=>{
    setInputValue(e.target.value)
  }


  
  const addMessage=(e)=>{
    e.preventDefault()
    const newMessage={
        id:conversationMessages.length+1 ,
        fromUnit:Math.random()<0.5,
        message:inputValue
    }
    console.log(conversation.id,conversation.name,newMessage)
    
    setInputValue('')
    
  }
  return (
    <div className="conversation">
      <div className="top">
        <div>
          <img src={userImage} alt="" />
          <div>
            <span>{conversation.name}</span>
            <span>Last seen {conversation.lastSeen} ago</span>
          </div>
        </div>
        <div>
          <BsStar className="star"></BsStar>
          <BsTrash className="trash"></BsTrash>
        </div>
      </div>
      <div className="conversation-box" ref={messageBoxRef}>
        {conversationMessages.map((message, i) => (
          <Message key={i} message={message}></Message>
        ))}
      </div>
      <div className="send-box">
        <form onSubmit={addMessage}>
          <div className="input-group">
            <input type="text" placeholder="Your message" value={inputValue} onChange={handleInputChnge}/>
            <button >
              <BsSend className="send"></BsSend>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConversationBox;
