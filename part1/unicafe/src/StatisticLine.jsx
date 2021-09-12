const StatisticLine = ({ text, value, allowPercentage }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value}
      {allowPercentage ? "%" : ""}
    </td>
  </tr>
);

export default StatisticLine;
