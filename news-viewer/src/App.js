//src/App.js

import React, {useState} from "react";
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=kr&apiKey=d50b9493091443a48657199e0a0b4c22",
      );
      setData(response.data);
    } catch(e) {
      console.log(e);
    }
  };
  return (
    <div>
      <button onClick={onClick}>불러오기</button>
    {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true} />}
    </div>
  );
};

export default App;