import React from "react";
import classes from './Pagination.module.css';

const Pagination = ({ limit, totalProjects, page, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProjects / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes.page__wrapper}>
      {pageNumbers.map(number =>
        <span
          onClick={() => paginate(number)}
          key={number}
          className={page === number ? classes.page__current : classes.page}
        >
          {number}
        </span>
      )}
    </div>
  );
};

export default Pagination;