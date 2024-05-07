import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Register from "../pages/register";
import Login from "../pages/login";
import Detail from "../pages/detail";
import NewReleaseBooks from "../pages/new-release-books";
import Profile from "../pages/profile";
import EditProfile from "../pages/edit-profile";
import Dashboard from "../pages/dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/new" element={<NewReleaseBooks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<p className="text-center text-3xl font-medium py-20">There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
