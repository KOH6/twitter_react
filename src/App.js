import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

import { SignUp } from "./containers/SignUp.jsx";
import { LogIn } from "./containers/LogIn";
import { PostIndex } from "./containers/PostIndex.jsx";

import { ToastMessage } from "./components/utils/ToastMessage";
import { Spinner } from "./components/utils/Spinner";

const theme = createTheme({
  palette: {
    primary: blue,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
