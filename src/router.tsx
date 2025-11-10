import {
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { VacanciesPage } from "./pages/vacancies_page/VacanciesPage";
import { VacanciesList } from "./components/vacancies_list/VacanciesList";
import { VacancyPage } from "./pages/vacancy_page/VacancyPage";
import { NotFoundPage } from "./pages/notfound_page/NotFoundPage";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Navigate to="/vacancies" replace />}
        errorElement={<NotFoundPage />}
      />
      <Route path="vacancies/" element={<VacanciesPage />}>
        <Route index element={<VacanciesList />} />
        <Route path="moscow" element={<VacanciesList />} />
        <Route path="petersburg" element={<VacanciesList />} />
      </Route>
      <Route
        path="vacancies/:id"
        element={<VacancyPage />}
        errorElement={<NotFoundPage />}
      />
    </>
  )
);
