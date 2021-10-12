const Result = ({ text, setTerm }) => {
  const handleClick = () => {
    setTerm(text.toLowerCase());
  };

  return (
    <li>
      {text}
      <button onClick={handleClick}>show</button>
    </li>
  );
};
export default Result;
