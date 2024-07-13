
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Authenticate from './Pages/Authenticate'; 
import TripPlan from './Pages/TripPlan';

function App() {
  return (
    <div>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={< Authenticate/>} />
        <Route path='/trip-plan' element={<TripPlan/>}/>
        
      </Routes>
    </BrowserRouter>
   
  </div>
  );
}

export default App;
