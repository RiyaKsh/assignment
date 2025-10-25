import Login from "./pages/login"
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
