import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import { Home } from "../pages/public/Home";
import Shop from "../pages/public/Shop";
import ProductDetail from "../pages/public/ProductDetail";
import Artists from "../pages/public/Artists";
import Genres from "../pages/public/Categories";
import Categories from "../pages/public/Categories";

import Login from "../pages/dashboard/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Products from "../pages/dashboard/Products";
import AdminArtists from "../pages/dashboard/Artists";
import AdminGenres from "../pages/dashboard/Genres";
import AdminCategories from "../pages/dashboard/Categories";

export default function AppRouter() {
  return (
    <Routes>
      {/* Tienda pública */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/categories" element={<Categories />} />
      </Route>

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Panel administrativo */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="artists" element={<AdminArtists />} />
        <Route path="genres" element={<AdminGenres />} />
        <Route path="categories" element={<AdminCategories />} />
      </Route>
    </Routes>
  );
}
