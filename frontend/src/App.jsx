import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import CustomerList from "./pages/CustomerList";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/LoginPage";
import CustomerForm from "./components/CustomerForm";

function App() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <Router>
      <Routes>
        <Route
          path="/customers"
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <CustomerList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/new"
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <CustomerForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/edit/:id"
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <CustomerForm />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login setIsAdmin={setIsAdmin} />} />
      </Routes>
    </Router>
  );
}

export default App;
