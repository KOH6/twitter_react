import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import { SignUp } from "./containers/SignUp.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/signup" element={<SignUp />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
