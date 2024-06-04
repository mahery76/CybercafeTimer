import "./App.css";
import Layout from "./components/Layout";
// import Layout from "./components/Layout2";
import WifiPages from "./pages/WifiPages";
import ComputerPages from "./pages/ComputerPages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <Routes>
        <Route path="/" element={<Layout/>}> 
          <Route index element={<ComputerPages/>}/>
          <Route path="/wifi" element={<WifiPages/>}/>
        </Route>
      </Routes> */}
      <Layout />
    </div>
  );
}

export default App;
