import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login';
import Registration from './components/Registration';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Login/>} /> 
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Registration/>} />
        </Routes>
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
