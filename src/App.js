import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Authentication/Login/Login";
import SignUp from "./components/Authentication/SignUp/SignUp";
import Verify from "./components/Authentication/Verify/Verify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            exact
            element={<Navigate replace to="/auth/login" />}
          />
          <Route path="/auth/login" exact element={<Login />} />
          <Route path="/auth/signup" exact element={<SignUp />} />
          <Route path="/auth/verify" exact element={<Verify />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
