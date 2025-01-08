import { Route, Routes } from "react-router-dom";
import { RouteIndex } from "@/helper/constants";
import Layout from "@/layout/layout";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Routes>
      <Route path={RouteIndex} element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
