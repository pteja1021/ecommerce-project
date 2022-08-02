import './App.css';
import Navbar from './components/Navbar';
import Product from './components/Product';
import Home from './components/Home'
import { Routes,Route } from 'react-router-dom';

function App() {
  
  return (
    <div className='App'>
    <Navbar/>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products/:id" element={<Product />}/>
      </Routes>  
    </div>
    </div>
  );
}

export default App;
