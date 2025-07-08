import styles from "./Pagination.module.scss";

type Props = {
  currentPage: number;
  maxPage: number;
  onPrev: () => void;
  onNext: () => void;
  onPageSelect: (page: number) => void;
};

const Pagination = ({ currentPage, maxPage, onPrev, onNext, onPageSelect }: Props) => {
  const getVisiblePages = (): number[] => {
    if (maxPage <= 3) {
      return [...Array(maxPage)].map((_, i) => i + 1);
    }

    const pages = new Set<number>();

    pages.add(1);
    pages.add(maxPage);

    if (currentPage !== 1 && currentPage !== maxPage) {
      pages.add(currentPage);
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={styles["pagination"]}>
      <button onClick={onPrev} disabled={currentPage === 1}>
        Prev
      </button>

      {visiblePages.map((page) => (
        <button key={page} onClick={() => onPageSelect(page)} className={currentPage === page ? styles.active : ""}>
          {page}
        </button>
      ))}

      <button onClick={onNext} disabled={currentPage === maxPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
