import userImage from "../../../images/user.jpg";
import { BsSend, BsStar, BsTrash } from "react-icons/bs";
import Message from "../../components/admin/Message";
import { useEffect, useRef, useState } from "react";
import { clearRequest, clearRequestWithDelay, completeRequest, errorRequests, startRequest } from "../../../toolkit/request/requestActions";
import api from "../../../toolkit/auth/config";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
const ConversationBox = ({ id}) => {
  const user = useSelector((state) => state.auth.user?.user);

  const dispatch = useDispatch();
    const { lastRequest } = useSelector((state) => state.request);
    const [messages,setMessages]=useState('')
    
 
    const containerRef = useRef(null)
  
  const [inputValue,setInputValue]=useState('')
  const [conversation,setConverstion]=useState('')
  
  

  useEffect(() => {
    const fetchFilteredConversation = async () => {
        try {
            const response = await api.get(`messages/${id}`);
            const conversationResponse= await api.get(`conversations/${id}`);
            const messages = response.data.messages;
            const conversation = conversationResponse.data.conversation
            // Check if the response contains the error message
            if (!response.data.error) {
                setMessages(messages);
                
            }
            if (!conversationResponse.data.error) {
              setConverstion(conversation);
          }
            dispatch(clearRequestWithDelay());
        } catch (error) {

        }
    };



    fetchFilteredConversation();
}, [lastRequest, dispatch,id]);

useEffect(() => {
  const container = containerRef.current;

  // Reverse the scroll direction by adjusting the scrollTop property
  container.scrollTop = container.scrollHeight;

  // Add an event listener to handle scrolling
  const handleScroll = () => {
    const maxScrollTop = container.scrollHeight - container.clientHeight;
    if (container.scrollTop === 0) {
      // When at the top, scroll to the bottom
      container.scrollTop = maxScrollTop;
    } else if (container.scrollTop === maxScrollTop) {
      // When at the bottom, scroll to the top
      container.scrollTop = 0;
    }
  };

  container.addEventListener('scroll', handleScroll);

  // Clean up the event listener when the component unmounts
  return () => {
    container.removeEventListener('scroll', handleScroll);
  };
}, [conversation]);
  const handleInputChnge=(e)=>{
    setInputValue(e.target.value)
  }


  
  const addMessage= async(e)=>{
    e.preventDefault()
    const newMessage={
        message:inputValue
    }
    
    dispatch(clearRequest())
   
      dispatch(startRequest());
      await api.post(`messages/create/${id}`, newMessage).then(() => dispatch(completeRequest())).catch((e)=>dispatch(errorRequests()))
      dispatch(clearRequestWithDelay())
      setInputValue('')
    
  }
  return (
    <div className="conversation">
      <div className="top">
        <div>
          <img src={(conversation.fromUnit ===user._id )?conversation.fromUnitImg:conversation.toUnitImg} alt="" />
          <div>
            <span>{messages.name}</span>
            <span>Last seen {moment(conversation.updatedAt).fromNow()} </span>
          </div>
        </div>
        <div>
          <BsStar className="star"></BsStar>
          <BsTrash className="trash"></BsTrash>
        </div>
      </div>
      <div className="conversation-box" ref={containerRef}>
        {messages &&messages.map((message, i) => (
          <Message key={i} message={message} conversation={conversation}></Message>
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
