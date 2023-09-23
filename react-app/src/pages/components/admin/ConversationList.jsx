import { BsCheck2All } from "react-icons/bs";
// import { useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import { useSelector } from "react-redux";

const TenWordsSpan = ({conversation}) => {
    const tenWords = conversation.split(' ').length > 6 ? conversation.split(' ').slice(0, 5).join('') :conversation;
    
    return tenWords?.split(' ').length > 4 ? <span className="alert-message">{tenWords}...</span>:<span className="alert-message">{tenWords}</span>;
  }



const ConversationList = ({getMessagesByConversation,conversation}) => {
  const user = useSelector((state) => state.auth.user?.user);

  const navigate = useNavigate();
  const handleSelection = () => {
    getMessagesByConversation(conversation._id)
    const route = `/chat/${conversation._id}`;
    navigate(route);
  };
  console.log(conversation.toUnitLastSeen)
  console.log(conversation.fromUnitLastSeen)
  return (
    <div className="conversation-list" onClick={handleSelection}>
      <div  className='row'>
        <img src={(conversation.ToUnit ===user._id )?conversation.fromUnitImg:conversation.toUnitImg} alt="" onClick={handleSelection}/>
        <div>
          <div className="name-date"><span>{conversation.toUnitName}</span>
          <span>{moment(conversation.toUnitLastSeen).fromNow()}</span></div>
          {conversation.lastMessage &&<TenWordsSpan conversation={conversation.lastMessage} />}
        </div>
      </div>
      <div className="row">
            <span></span>
          {conversation.readedByToUnit && conversation.lastMessage &&<BsCheck2All className="ckeckers"></BsCheck2All>}
        
      </div>
    </div>
  );
};

export default ConversationList;
