// App.js
import "./index.css";
import React from "react";
// import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutWrapper from "./Layout/LayoutWrapper";
import PatrolTable from "./components/PatrolTable";
import PatrolInspectionTable from "./components/PatrolInspectionTable";
import CrawlingTable from "./components/CrawlingTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define routes using LayoutWrapper */}
        <Route path="/" element={<LayoutWrapper />}>
          {/* Nested routes with different URL parameters */}
          <Route index element={<PatrolTable />} />
          <Route path="patrol" element={<PatrolTable />} />
          <Route path="patrol/:id" element={<PatrolInspectionTable />} />
          <Route path="crawling" element={<CrawlingTable />} />
          <Route path="test" element={<div>Test Page</div>} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
