
import { Route,Routes } from "react-router-dom";
import NewsPage from "./pages/NewsPage";

const App = () => {
  return (
    // react-router-dom version 6부터 <Route>를 <Routes>로 감싸줘야함.
    // compoenet 대신 element 사용    
    <Routes>
      <Route element={<NewsPage />} path="/"/>
      <Route element={<NewsPage />} path="/:category"/>
    </Routes>
  )
}

export default App