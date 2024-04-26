import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import ContactOrderCart from "../../layout/components/ContactOrderCart/ContactOrderCart";
import CartItem from "./CartItem";
import { readCart, readJWT } from "../../services/apiUserService";
import ReactPaginate from "react-paginate";

const cx = classNames.bind(styles);

const Cart = () => {
    // Pagination
    const [productData, setProductData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [dataUsers, setDataUsers] = useState();
    const [cookie, setCookie] = useState();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Get localStorage
        const user = JSON.parse(localStorage.getItem("dataUsers"));
        setDataUsers(user);
        // Call api JWT
        fetchJWT();
    }, []);

    const fetchJWT = async () => {
        const resJWT = await readJWT();
        setCookie(resJWT?.DT?.jwt);
    };
    // Page
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };
    // Call Api
    // useEffect(() => {
    //     !!dataUsers === true && !!cookie === true && fetchProducts();
    //     setCurrentLimit(5);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dataUsers, cookie, currentPage]);
    // const fetchProducts = async () => {
    //     let data = await readCart(currentPage, currentLimit);
    //     setProductData(data?.DT?.carts);
    //     setTotalPages(data?.DT?.totalPages);
    // };
    return (
        <>
            <div className={cx("wrapper")}>
                <div className={cx("inner-left")}>
                    <div className={cx("bl-table")}>
                        <div className={cx("title")}>
                            <div className={cx("title-1")}>Hình ảnh</div>
                            <div className={cx("title-2")}>Tên sản phẩm</div>
                            <div className={cx("title-3")}>Giá bán</div>
                            <div className={cx("title-4")}>Số lượng</div>
                            <div className={cx("title-5")}></div>
                        </div>
                        <div className={cx("container")}>
                            {/* {console.log(productData)} */}
                            {/* {productData &&
                                productData.map((product, index) => {
                                    return (
                                        <CartItem
                                            key={`cart-${index}`}
                                            product={product}
                                            fetchProducts={fetchProducts}
                                        />
                                    );
                                })} */}
                        </div>
                        <div className={cx("bl-buy")}>
                            {totalPages > 0 && (
                                <div className={cx("page")}>
                                    <ReactPaginate
                                        className={cx("pagination", "hello")}
                                        nextLabel="Next >"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={2}
                                        pageCount={totalPages}
                                        previousLabel="< Prev"
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
                            )}
                            <Link to={"/"} className={cx("buy")}>
                                Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <div className={cx("inner-right")}>
          <div className={cx("bg-color")}>
            <ContactOrderCart />
          </div>
        </div> */}
            </div>
        </>
    );
};

export default Cart;
