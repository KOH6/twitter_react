import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

import { SignUp } from "./containers/SignUp.jsx";
import { LogIn } from "./containers/LogIn";
import { PostsIndex } from "./containers/PostsIndex";
import { PostsShow } from "./containers/PostsShow";
import { Page404 } from "./pages/Page404";

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
            <Route exact path="/home" element={<PostsIndex />}></Route>
            <Route exact path="/signup" element={<SignUp />}></Route>
            <Route exact path="/login" element={<LogIn />}></Route>
            <Route exact path="/:user_name/:id" element={<PostsShow />}></Route>
            <Route path="*" element={<Page404 />}></Route>
          </Routes>
        </Router>
        <ToastMessage />
        <Spinner />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
