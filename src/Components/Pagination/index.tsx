import ReactPaginate from 'react-paginate';
import React from 'react';

import style from './Pagination.module.scss'

type PaginationProps = {
  currentPage: number;
  setCurrentPage: any;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, setCurrentPage }) => {
  return (
    <div className={style.container} >
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => setCurrentPage(event.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={2}
        forcePage={currentPage - 1}
        previousLabel="<"
      />
    </div>
  );
};

export default Pagination;
