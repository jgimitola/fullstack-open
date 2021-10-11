import axios from "axios";
import { useEffect, useState } from "react";

import Search from "./Search";
import CountryInfo from "./CountryInfo";

const App = () => {
  const [info, setInfo] = useState({});
  const [term, setTerm] = useState("");
  const [all, setAll] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(({ data }) => {
      setAll(data);
    });
  }, []);

  return (
    <div>
      <Search all={all} term={term} setTerm={setTerm} setInfo={setInfo} />
      {Object.keys(info).length > 0 && <CountryInfo info={info} />}
    </div>
  );
};
export default App;
