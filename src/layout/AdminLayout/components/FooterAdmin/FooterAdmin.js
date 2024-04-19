import React from "react";
import ReactPaginate from "react-paginate";
import classNames from "classnames/bind";
import styles from "./FooterAdmin.module.scss";

const cx = classNames.bind(styles);

const FooterAdmin = () => {
  const handlePageClick = (event) => {
    console.log(event.selected);
  };
  return (
    <div className={cx("footing")}>
      <div className={cx("page")}>
        <ReactPaginate
          className={cx("pagination", "hello")}
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={11}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default FooterAdmin;
