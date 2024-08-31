import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerList from './pages/CustomerList';
import CustomerDetails from './pages/CustomerDetails';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/LoginPage';

function App() {
  const isAdmin = false;

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
          path="/customers/:id"
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <CustomerDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
