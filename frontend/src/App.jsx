import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./Components/Layout/PublicLayout";

const AdminApp = lazy(() => import("./admin/AdminApp"));

const AdminLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-white">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
  </div>
);

function App() {
  return (
    <Suspense fallback={<AdminLoader />}>
      <Routes>
        <Route path="/admin-panel/*" element={<AdminApp />} />
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Suspense>
  );
}

export default App;
