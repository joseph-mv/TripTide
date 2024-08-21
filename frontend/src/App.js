
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Authenticate from './Pages/Authenticate'; 
import TripPlan from './Pages/TripPlan';
import PlanDetails from './Pages/PlanDetails';
import Temp from './Pages/Temp';
import Verification from './Pages/Verification';
import ForgotPassword from './Pages/ForgotPassword';
import Itinerary from './Pages/Itinerary/Itinerary';


function App() {
 
  return (
    <div>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={< Authenticate/>} />
        <Route path='/trip-plan' element={<TripPlan/>}/>
        <Route path='/plan-details' element={<PlanDetails/>} />
        <Route path="/verify-email" element={<Verification/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/plan-details/itinerary" element={<Itinerary/>} />
       
        <Route path='/temp' element={<Temp/>}/>
        
      </Routes>
    </BrowserRouter>
   
  </div>
  );
}

export default App;
