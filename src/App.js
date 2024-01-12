import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

import { SignUp } from "./containers/SignUp.jsx";
import { LogIn } from "./containers/LogIn";
import { PostsIndex } from "./containers/PostsIndex";
import { PostsShow } from "./containers/PostsShow";
import { UsersShow } from "./containers/UsersShow";
import { Page404 } from "./pages/Page404";

import { Layout } from "./layouts/Layout";
import { ToastMessage } from "./components/utils/ToastMessage";
import { Spinner } from "./components/utils/Spinner";
import { ConfirmationDialog } from "./components/utils/ConfirmationDialog.jsx";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: grey,
    black: {
      main: "#0E1419",
      contrastText: "#FFFFFF",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<LogIn />} />
            <Route path="/" element={<Layout />}>
              <Route exact path="/home" element={<PostsIndex />} />
              <Route exact path="/not_found" element={<Page404 />} />
              <Route path="/:user_name" element={<UsersShow />} />
              <Route exact path="/:user_name/:id" element={<PostsShow />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </Router>
        <ToastMessage />
        <Spinner />
        <ConfirmationDialog />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
