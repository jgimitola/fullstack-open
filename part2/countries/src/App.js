import axios from "axios";
import { useEffect, useState } from "react";

import Search from "./Components/Search";
import CountryInfo from "./Components/CountryInfo";
import Weather from "./Components/Weather";

const App = () => {
  const COUNTRIES_API_URL = process.env.REACT_APP_COUNTRIES_API_URL;

  const [info, setInfo] = useState({});
  const [all, setAll] = useState([]);

  useEffect(() => {
    axios.get(COUNTRIES_API_URL).then(({ data }) => {
      setAll(data);
    });
  }, [COUNTRIES_API_URL]);

  return (
    <div>
      <Search all={all} setInfo={setInfo} />
      {Object.keys(info).length > 0 && (
        <>
          <CountryInfo info={info} />
          <Weather capital={info.capital} />
        </>
      )}
    </div>
  );
};
export default App;
