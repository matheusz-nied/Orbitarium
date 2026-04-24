import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { CategoryPage } from "./pages/CategoryPage";
import { HomePage } from "./pages/HomePage";
import { LessonPage } from "./pages/LessonPage";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categoria/:categoryId" element={<CategoryPage />} />
        <Route path="/aula/:contentId" element={<LessonPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </AppLayout>
  );
}
