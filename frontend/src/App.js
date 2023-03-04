import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Home from "./components/home/Home";
import Explore from "./components/explore/Explore";
import Messages from "./components/messages/Messages";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
