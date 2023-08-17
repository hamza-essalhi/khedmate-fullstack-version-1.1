import { BsCheck2All } from "react-icons/bs";
import userImage from "../../../images/user.jpg";


const TenWordsSpan = ({text}) => {
    const tenWords = text.split(' ').length > 6 ? text.split(' ').slice(0, 5).join('') :text;
    
    return text?.split(' ').length > 4 ? <span className="alert-message">{tenWords}...</span>:<span className="alert-message">{tenWords}</span>;
  }



const ConversationList = ({func,conversation}) => {
  
  


  const handleSelection = () => {
   
    func(conversation.id-1)
  };
  return (
    <div className="conversation-list" onClick={handleSelection}>
      <div  className='row'>
        <img src={userImage} alt="" onClick={handleSelection}/>
        <div>
          <span>{conversation.name}</span>
          <TenWordsSpan text={conversation.lastMessage} />
        </div>
      </div>
      <div className="row">
            <span>2m ago</span>
          {!conversation.read &&<span className="counter">5</span>}
          {conversation.read && <BsCheck2All className="ckeckers"></BsCheck2All>}
        
      </div>
    </div>
  );
};

export default ConversationList;
