import { useEffect, useState } from "react";

import Result from "./Result";

const Search = ({ all, setInfo }) => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  const filterDisplay = () => {
    if (term.length > 0) {
      const filtered = all.filter(({ name: { common } }) =>
        common.toLowerCase().includes(term)
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
  };

  useEffect(filterDisplay, [all, setInfo, term]);

  const handleInput = (e) => {
    setTerm(e.target.value);
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
            <Result key={`r-${common}`} text={common} setTerm={setTerm} />
          ))}
        </ul>
      )}
    </div>
  );
};
export default Search;
