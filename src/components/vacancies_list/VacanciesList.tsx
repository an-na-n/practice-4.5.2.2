/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton } from "@mantine/core";
import { VacancyCard } from "../vacancy_card/VacancyCard";
import { PaginationBar } from "../pagination_bar/PaginationBar";
import { useOutletContext } from "react-router-dom";
import type { Vacancy } from "../../api/types";

export const VacanciesList = () => {
  const { items, loading, totalPages, page, onPageChange } =
    useOutletContext<any>();

  return (
    <main>
      {loading ? (
        Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} />)
      ) : (
        <>
          {items.map((vacancy: Vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
          {totalPages > 1 && (
            <PaginationBar
              page={page}
              total={totalPages}
              onChange={onPageChange}
            />
          )}
        </>
      )}
    </main>
  );
};
