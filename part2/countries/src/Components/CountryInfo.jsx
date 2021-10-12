const CountryInfo = ({ info }) => {
  const { name, capital, member, languages, image } = info;

  return (
    <div>
      <h1>{name}</h1>
      <p>capital: {capital}</p>
      <p>is UN member? {member ? "yes" : "no"}</p>

      <h2>Languages</h2>
      <ul>
        {languages.map((lang) => (
          <li key={`${name}-${lang}`}>{lang}</li>
        ))}
      </ul>
      <img src={image} alt={`${name} flag`} />
    </div>
  );
};
export default CountryInfo;
