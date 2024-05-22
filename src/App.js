import "./App.css";
import Layout from "./components/Layout";
import WifiPages from "./pages/WifiPages";
import { Route, Routes } from "react-router-dom";
import ComputerPages from "./pages/ComputerPages";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}> 
          <Route index element={<ComputerPages/>}/>
          <Route path="/wifi" element={<WifiPages/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
