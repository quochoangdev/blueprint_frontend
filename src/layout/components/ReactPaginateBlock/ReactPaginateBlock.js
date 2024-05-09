import React from 'react'
import classNames from "classnames/bind";
import styles from "./ReactPaginateBlock.module.scss";
import ReactPaginate from 'react-paginate';

const cx = classNames.bind(styles);

const ReactPaginateBlock = (prop) => {
    return (
        <div className={cx("page")}>
            <ReactPaginate
                className={cx("pagination", "custom")}
                nextLabel="next >"
                onPageChange={prop?.handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={prop?.totalPages}
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
    )
}

export default ReactPaginateBlock