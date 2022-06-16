import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Registration from './components/Registration';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import ImageUpload from './components/ImageUpload';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>} /> 
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Registration/>} />
          <Route path='/imageUpload' element={<ImageUpload/>}/>
        </Routes>
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
