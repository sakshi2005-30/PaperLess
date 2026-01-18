import {Routes,Route,Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Documents from "./pages/Documents"
import { useEffect } from "react"
import api from "./services/api"
import Folders from "./pages/Folders"
import ShareView from "./pages/ShareView"

const App = () => {
  
  const isAuthenticated=!!localStorage.getItem("token");

  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/documents"
          element={isAuthenticated ? <Documents /> : <Navigate to="/login" />}
        />
        <Route
          path="/folders"
          element={isAuthenticated ? <Folders /> : <Navigate to="/login" />}
        />
        <Route path="/share/:token" element={<ShareView />} />

        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App