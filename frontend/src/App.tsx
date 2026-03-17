import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import CalendarPage from "./pages/CalendarPage";
import GalleryPage from "./pages/GalleryPage";
import CorporatePage from "./pages/CorporatePage";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminNewsPage from "./pages/AdminNewsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/corporate" element={<CorporatePage />} />
          <Route path="/grid" element={<HomePage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminUsersPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="news" element={<AdminNewsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
