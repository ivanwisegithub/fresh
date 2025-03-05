import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import FarmSales from "./pages/FarmSales";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/farm-sales" element={<FarmSales />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
