import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import { SignUp } from "./containers/SignUp.jsx";
import { PostIndex } from "./containers/PostIndex.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/home" element={<PostIndex />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
