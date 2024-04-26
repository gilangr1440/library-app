import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Register from "../pages/register";
import Login from "../pages/login";
import Detail from "../pages/detail";
import NewReleaseBooks from "../pages/new-release-books";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/new" element={<NewReleaseBooks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
