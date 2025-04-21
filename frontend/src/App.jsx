import './App.css'
import LoginForm from './components/loginform.jsx'
import RegisterForm from './components/registerform.jsx';
import SearchPage from './components/SearchPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}
export default App