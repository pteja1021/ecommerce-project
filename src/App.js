import './App.css';
import Navbar from './components/Navbar';
import Product from './components/Product';
import Home from './components/Home'
import { Routes,Route } from 'react-router-dom';
import {atom} from 'recoil';

function App() {
  
  const cartAtom=atom({
      key:'cart',
      default:{}
  })

  return (
    <div className='App'>
    <Navbar atom={cartAtom}/>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products/:id" element={<Product atom={cartAtom}/>}/>
      </Routes>  
    </div>
    </div>
  );
}

export default App;
