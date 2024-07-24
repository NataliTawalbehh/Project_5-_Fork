import "./App.css";
import { Route, Routes } from "react-router-dom";



//===============================================================

const App = () => {
  return (
    <div className="App">
      <h1>app</h1>
      <Routes>
        {/* <Route path={"/"} element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newArticle" element={<NewArticle />} /> */}
      </Routes>
    </div>
  );
};

export default App;
