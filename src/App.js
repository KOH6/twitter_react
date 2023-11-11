import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SignUp } from "./containers/SignUp.jsx";
import { LogIn } from "./containers/LogIn";
import { PostIndex } from "./containers/PostIndex.jsx";

import { ToastMessage } from "./components/utils/ToastMessage";
import { Spinner } from "./components/utils/Spinner";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/login" element={<LogIn />}></Route>
          <Route exact path="/home" element={<PostIndex />}></Route>
        </Routes>
      </Router>

      <ToastMessage />
      <Spinner />
    </RecoilRoot>
  );
}

export default App;
