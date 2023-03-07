import ReactPaginate from 'react-paginate';
import React from 'react';

import style from './Pagination.module.scss'

const Pagination = ({ setCurrentPage }) => {
  return (
    <div className={style.container} >
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => setCurrentPage(event.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={2}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
