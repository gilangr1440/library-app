import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Register from "../pages/register";
import Login from "../pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
