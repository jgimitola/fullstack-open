import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  const existsFeedback = good || neutral || bad;

  return (
    <div>
      {existsFeedback ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="average" value={average} />
            <StatisticLine
              text="positive"
              value={positive}
              allowPercentage={true}
            />
          </tbody>
        </table>
      ) : (
        <p>There is no feedback yet</p>
      )}
    </div>
  );
};

export default Statistics;
