/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  loadVacancies,
  setPage,
  setSearch,
  setCity,
  setSkills,
} from "../store/vacanciesSlice";

export const useVacancies = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { items, loading, page, totalPages, search, city, skills } =
    useAppSelector((state) => state.vacancies);
  const [localSearch, setLocalSearch] = useState(search);
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstSync = useRef(true);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlSkillsParam = searchParams.get("skills");
    const urlSkills = urlSkillsParam
      ? urlSkillsParam.split(",").filter(Boolean)
      : null;
    const urlPage = Number(searchParams.get("page")) || 1;

    if (urlPage !== page) dispatch(setPage(urlPage));
    if (urlSearch !== search) {
      dispatch(setSearch(urlSearch));
      setLocalSearch(urlSearch);
    }
    if (urlSkills && urlSkills.join(",") !== skills.join(",")) {
      dispatch(setSkills(urlSkills));
    }
  }, [searchParams]);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (search) params.search = search;
    if (skills.length > 0) params.skills = skills.join(",");
    if (page > 1) params.page = page.toString();

    if (isFirstSync.current) {
      setSearchParams(params, { replace: true });
      isFirstSync.current = false;
    } else {
      setSearchParams(params);
    }
  }, [search, skills, page]);

  useEffect(() => {
    if (location.pathname === "/vacancies" && city !== "") {
      dispatch(setCity(""));
      dispatch(setPage(1));
    } else if (location.pathname.includes("/moscow") && city !== "moscow") {
      dispatch(setCity("moscow"));
      dispatch(setPage(1));
    } else if (
      location.pathname.includes("/petersburg") &&
      city !== "petersburg"
    ) {
      dispatch(setCity("petersburg"));
      dispatch(setPage(1));
    }
  }, [location.pathname]);

  useEffect(() => {
    const params = searchParams.toString();
    const query = params ? `?${params}` : "";

    if (city === "") {
      navigate(`/vacancies${query}`, { replace: true });
    } else {
      navigate(`/vacancies/${city}${query}`, { replace: true });
    }
  }, [city, searchParams]);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(loadVacancies());
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [page, search, city, skills]);

  const handleSearch = () => {
    dispatch(setSearch(localSearch));
    dispatch(setPage(1));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(setSearch(localSearch));
      dispatch(setPage(1));
    }
  };

  const handlePageChange = (p: number) => {
    dispatch(setPage(p));
  };

  const handleTabSelect = (tab: "moscow" | "petersburg") => {
    dispatch(setCity(tab));
    dispatch(setPage(1));
  };

  return {
    items,
    loading,
    page,
    search,
    skills,
    city,
    totalPages,
    localSearch,
    setLocalSearch,
    handleSearch,
    handleKeyDown,
    handlePageChange,
    handleTabSelect,
  };
};
