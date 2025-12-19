const MessageCard = ({ text, sentByUser }:{
    text :string , 
    sentByUser : boolean
}) => {
  return (
    <div
      className={`flex ${sentByUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] px-4 py-2 rounded-xl text-sm
          ${
            sentByUser
              ? "bg-white text-black rounded-br-none"
              : "bg-neutral-700 text-white rounded-bl-none"
          }`}
      >
        {text}
      </div>
    </div>
  );
};

export default MessageCard;
