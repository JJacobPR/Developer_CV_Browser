import { useState } from "react";

const usePagination = <T>(items: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const next = () => {
    setCurrentPage((prev) => Math.min(prev + 1, maxPage));
  };

  const prev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const jump = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, maxPage));
    setCurrentPage(pageNumber);
  };

  return { currentPage, maxPage, currentItems, next, prev, jump };
};

export default usePagination;
