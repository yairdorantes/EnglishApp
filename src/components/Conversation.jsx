const Conversation = () => {
  const handleBugReportClick = () => {
    window.open("mailto:yairmasterlol@gmail.com?subject=Bug%20Report");
  };
  return (
    <div className="h-screen">
      <button className="btn" onClick={handleBugReportClick}>
        btn
      </button>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png" />
          </div>
        </div>
        <div className="chat-header">
          Yair
          {/* <time className="text-xs opacity-50">12:45</time> */}
        </div>
        <div className="chat-bubble">
          fuistejjaajajaj el elegido felicidades
        </div>
        <div className="chat-footer opacity-50">You were the Chosen One!</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://i.pinimg.com/736x/2c/8b/ed/2c8bed2ea157922ca65cf5f4ac98d43a--bot-avatar.jpg" />
          </div>
        </div>
        <div className="chat-header">
          EnglishApp
          {/* <time className="text-xs opacity-50">12:46</time> */}
        </div>
        <div className="chat-bubble">I hate you!</div>
        <div className="chat-footer opacity-50">Te odio jajaja</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png" />
          </div>
        </div>
        <div className="chat-header">
          Yair
          {/* <time className="text-xs opacity-50">12:45</time> */}
        </div>
        <div className="chat-bubble"> como se dice eso</div>
        <div className="chat-footer opacity-50">How do you say that</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://i.pinimg.com/736x/2c/8b/ed/2c8bed2ea157922ca65cf5f4ac98d43a--bot-avatar.jpg" />
          </div>
        </div>
        <div className="chat-header">
          EnglishApp
          {/* <time className="text-xs opacity-50">12:46</time> */}
        </div>
        <div className="chat-bubble">Like this, look</div>
        <div className="chat-footer opacity-50">asi, mira</div>
      </div>
    </div>
  );
};

export default Conversation;
