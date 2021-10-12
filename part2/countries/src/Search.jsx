import { useState } from "react";

const Search = ({ all, setInfo }) => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleInput = (e) => {
    const updatedTerm = e.target.value;

    if (updatedTerm.length > 0) {
      const filtered = all.filter(({ name: { common } }) =>
        common.toLowerCase().includes(updatedTerm)
      );

      if (filtered.length === 0) setInfo({});
      if (filtered.length === 1) {
        const match = filtered[0];

        const info = {
          name: match.name.common,
          capital: match.capital[0],
          member: match.unMember,
          languages: Object.entries(match.languages).map((key) => key[1]),
          image: match.flags.png,
        };
        setInfo(info);
      }
      setResults(filtered);
    } else {
      setInfo({});
      setResults([]);
    }
    setTerm(updatedTerm);
  };

  return (
    <div>
      <label htmlFor="searchbar">find countries: </label>
      <input type="search" id="searchbar" value={term} onChange={handleInput} />

      {results.length === 0 && <p>There are no results, try another filter.</p>}
      {results.length >= 10 && <p>Too many matches, specify another filter</p>}

      {results.length > 0 && results.length < 10 && (
        <ul>
          {results.map(({ name: { common } }) => (
            <li key={`r-${common}`}>{common}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Search;
