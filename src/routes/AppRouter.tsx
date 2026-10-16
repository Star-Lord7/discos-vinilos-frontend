import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import { Home } from "../pages/public/Home";
import ProductDetail from "../pages/public/ProductDetail";
import PublicLayout from "../layouts/PublicLayout";
import Shop from "../pages/public/Shop";
import Genres from "../pages/public/Categories";
import Artists from "../pages/public/Artists";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/products/:id" element={<ProductDetail />} />

          <Route path="/products" element={<Shop />} />

          <Route path="/artists" element={<Artists />} />

          <Route path="/genres" element={<Genres />} />
        </Route>

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
