
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Authenticate from './Pages/Authenticate'; 

function App() {
  return (
    <div>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={< Authenticate/>} />
        {/* <Route path="/login" element={<Login />}></Route>
        <Route path="/sell" element={<Create />}></Route>
        <Route path="/view" element={<ViewPost/>}></Route> */}
      </Routes>
    </BrowserRouter>
   
  </div>
  );
}

export default App;
