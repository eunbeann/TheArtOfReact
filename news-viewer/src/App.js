import { useState } from "react";
import axios from "axios";

import React from 'react'

const App = () => {
  const WeatherAPIKEY = process.env.REACT_APP_WEATHER_API_KEY;
  // console.log(WeatherAPIKEY);
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${WeatherAPIKEY}`,
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    };
  }
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true} />}
    </div>
  );
};
export default App