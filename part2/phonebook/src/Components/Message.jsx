const Message = ({ type, message }) => {
  if (!message) return null;
  return <p className={type === "error" ? "error" : "success"}>{message}</p>;
};
export default Message;
