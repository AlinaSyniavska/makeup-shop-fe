import { FC, MouseEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import style from "./Pages.module.css";
import { useAppSelector } from "../../hooks";
import { commonHelper } from "../../helpers";

const Pages: FC = () => {
  const calculatePagesCount = (pageSize: number, totalCount: number) => {
    // we suppose that if we have 0 items we want 1 empty page
    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
  };

  const { page, perPage, sortOrder, filterBy, count } = useAppSelector(
    (state) => state.productReducer
  );

  const [query, setQuery] = useSearchParams(commonHelper.setupQuery(page, perPage, sortOrder, filterBy));

  const [pages, setPages] = useState(
    calculatePagesCount(Number(perPage), Number(count))
  );

  useEffect(() => {
    const infoPage = document.getElementById(
      "infoPage"
    ) as HTMLParagraphElement;
    setPages(calculatePagesCount(Number(perPage), Number(count)));
    infoPage.innerText = `${page} of ${pages} pages`;
  }, [page, pages, perPage, sortOrder, filterBy, count]);

  const changePage = (e: MouseEvent<HTMLButtonElement>) => {
    const nextPage = document.getElementById("next");

    let curPage = parseInt(query.get("page") || "1", 10);

    if (e.target === nextPage) {
      curPage++;
      if (curPage > pages) {
        curPage = 1;
      }
    } else {
      curPage--;
      if (curPage <= 0) {
        curPage = pages;
      }
    }

    setQuery(commonHelper.setupQuery(`${curPage}`, perPage, sortOrder, filterBy));
    commonHelper.scrollToUp();
  };

  return (
    <div>
      <div className={style.wrap}>
        <div className={style.pagination}>
          <button className={`${style.btnPagination} ${style.btnPaginationPrev}`} onClick={changePage} id={"prev"}>
            Prev
          </button>
          <button className={`${style.btnPagination} ${style.btnPaginationNext}`} onClick={changePage} id={"next"}>
            Next
          </button>
        </div>
        <p id={"infoPage"}></p>
      </div>
    </div>
  );
};

export { Pages };
