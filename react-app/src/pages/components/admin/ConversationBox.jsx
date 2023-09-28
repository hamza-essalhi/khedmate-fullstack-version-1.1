import userImageFromUnit from "../../../images/user.png";
import userImageToUnit from "../../../images/userTo.png";
import { BsSend, BsTrash } from "react-icons/bs";
import Message from "../../components/admin/Message";
import { useEffect, useRef, useState } from "react";
import { clearRequest, clearRequestWithDelay, completeRequest, errorRequests, startRequest } from "../../../toolkit/request/requestActions";
import api from "../../../toolkit/auth/config";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client'
const endPoint = 'http://localhost:9000'



const ConversationBox = ({ id }) => {
  const user = useSelector((state) => state.auth.user?.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { lastRequest } = useSelector((state) => state.request);
  const [messages, setMessages] = useState('')
  const [online, setOnline] = useState('')
  const containerRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  const [conversation, setConverstion] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const socket = useRef()

  useEffect(() => {
    socket.current = io(endPoint)
    socket.current.emit('postUser', user._id)
    socket.current.on('getOnlineUsers', (users) => {
      const exists = users.some((item) => item.userId === user._id);
      setOnline(exists); // Set the online status based on the server response
    });
    socket.current.on('getMessage', message => {
      setArrivalMessage({
        userId: message.userId,
        message: message.message,
        conversationId: message.conversationId,
        createdAt: Date.now(),
      });

      

    })
    socket.current.on('typing', (conversationId) => {
      if (id=== conversationId) {
        setIsTyping(true);
    
        // Scroll to the bottom if needed
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    
        setTimeout(() => {
          setIsTyping(false);
        }, 800);
      }
    });
  
    

  }, [user, online,socket,id])

  useEffect(() => {
    setMessages((prev) => [...prev, arrivalMessage]);

  }, [arrivalMessage])

  useEffect(() => {
    const fetchFilteredConversation = async () => {
      try {
        const response = await api.get(`messages/${id}`);
        const conversationResponse = await api.get(`conversations/${id}`);
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

  }, [lastRequest, dispatch, id]);


  useEffect(() => {
    const fetchFilteredConversation = async () => {
      try {
        const response = await api.get(`messages/${id}`);
        const messages = response.data.messages;
        // Check if the response contains the error message
        if (!response.data.error) {
          setMessages(messages);

        }
        dispatch(clearRequestWithDelay());
      } catch (error) {

      }
    };

    fetchFilteredConversation();
  }, [lastRequest, dispatch, id]);

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
  }, [conversation, messages,online]);
  const handleInputChnge = (e) => {
    setInputValue(e.target.value)
  }

  

  const addMessage = async (e) => {
    e.preventDefault()
    const newMessage = {
      message: inputValue
    }

    dispatch(clearRequest())

    dispatch(startRequest());
    const to = conversation.toUnit === user._id ? conversation.fromUnit : conversation.toUnit
    try {
      const response = await api.post(`messages/create/${id}`, newMessage);
      if (response.data.message) {
        socket.current.emit('sendMessage', {
          userId: user._id,
          message: inputValue,
          conversationId: id,
          toUnit: to
        })
        setIsTyping(false);
      } else {
        // Handle the case where the new message creation failed
        // You can log an error or take appropriate action
      }
      dispatch(completeRequest());
    } catch (e) {
      // Handle errors here
      dispatch(errorRequests());
    }
    setInputValue('')

  }
  const handleDelete = async () => {
    dispatch(clearRequest())
    dispatch(startRequest());
    await api.delete(`conversations/delete/${id}`,).then(() => {
      dispatch(completeRequest())
      navigate(`/chat/`)
    }).catch((e) => dispatch(errorRequests()))
    dispatch(clearRequestWithDelay())
  }

  const handleTyping = () => {
    const to = conversation.toUnit === user._id ? conversation.fromUnit : conversation.toUnit
    socket.current.emit('typing', {
      toUnit:to,
      conversationId: id,
      userId: user._id, // Replace with the actual user ID
    });
    
  };


  return (
    <div className="conversation">
      <div className="top">
        <div>
        <div className={online ? 'user-img-online' : 'user-img-offline'}>
          <img src={(conversation.fromUnit !== user._id && conversation.fromUnitImg) ? conversation.fromUnitImg : (conversation.fromUnit === user._id && conversation.toUnitImg) ? conversation.toUnitImg : !conversation.fromUnitImg  ? userImageFromUnit : userImageToUnit} alt="" />
          <span className="online"></span>
        </div>
          <div>
            <span>{(conversation.fromUnit !== user._id) ? conversation.fromUnitName : conversation.toUnitName}</span>
            {online ? <span >online </span> : (conversation.fromUnit !== user._id) ? <span >{moment(conversation.fromUnitLastSeen).fromNow()}</span> : <span >{moment(conversation.toUnitLastSeen).fromNow()}</span>}
          </div>
        </div>
        <div>
          <BsTrash className="trash" onClick={handleDelete}></BsTrash>
        </div>
      </div>
      <div className="conversation-box" ref={containerRef}>
        {messages && messages.map((message, i) => (
          <Message key={i} message={message} conversation={conversation} isTyping={isTyping}></Message>
        ))}
        {isTyping &&
        <div className="typing-box">
          <div className={(conversation.fromUnit !== user._id) ? "message-box-unit" : "message-box "}>
          {(conversation.fromUnit !== user._id) && <img src={conversation.fromUnitImg ?conversation.fromUnitImg:userImageFromUnit} alt="" />}          <div className="message-content">
            <div


              className={
                (conversation.fromUnit !== user._id) ? "message-from-unit message" : "message-to-unit message"
              }
            >
              
              <div className="typing">
                <span></span>
                <span></span>
                <span></span>
              </div>

            </div>

          </div>
          {!(conversation.fromUnit !== user._id)  && <img src={conversation.toUnitImg ?conversation.toUnitImg:userImageToUnit} alt="" className="from-unit-img" />}

        </div>
        </div>
        
      }
      </div>
      

      <div className="send-box">
        <form onSubmit={addMessage}>
          <div className="input-group">
            <input type="text" placeholder="Your message" value={inputValue} onChange={handleInputChnge} onKeyUp={handleTyping} />
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
