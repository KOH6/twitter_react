import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SignUp } from "./containers/SignUp.jsx";
import { PostIndex } from "./containers/PostIndex.jsx";
import { ToastMessage } from "./components/utils/ToastMessage";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/home" element={<PostIndex />}></Route>
        </Routes>
      </Router>

      {/* トースト表示 */}
      <ToastMessage />
    </RecoilRoot>
  );
}

export default App;
