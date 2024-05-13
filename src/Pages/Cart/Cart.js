import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import { readCart, readJWT } from "../../services/apiUserService";
import ReactPaginateBlock from "../../layout/components/ReactPaginateBlock/ReactPaginateBlock";
import jwtDecode from "../../routes/jwtDecode";
import CartItem from "./CartItem";
import styles from "./Cart.module.scss";

const cx = classNames.bind(styles);

const Cart = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const [productData, setProductData] = useState();
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    // Page
    const handlePageClick = (event) => { setCurrentPage(event.selected + 1); };

    // Call Api
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchJWT(); setCurrentLimit(10); }, [currentPage]);
    const fetchJWT = async () => {
        let decoded = false
        const resJWT = await readJWT();
        if (resJWT?.DT?.jwt) {
            decoded = await jwtDecode(resJWT?.DT?.jwt)
            fetchCartWithId(decoded?.user?.id)
        }
    };
    const fetchCartWithId = async (idUser) => {
        const fetchCart = await readCart(currentPage, currentLimit, idUser)
        setTotalPages(fetchCart?.DT?.totalPages);
        setProductData(fetchCart?.DT?.carts)
    }

    return (
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
                        {productData && productData.map((product, index) => {
                            return (<CartItem key={`cart-${index}`} product={product} fetchProducts={fetchJWT} />);
                        })}
                    </div>
                    <div className={cx("bl-buy")}>
                        {totalPages > 0 && <ReactPaginateBlock handlePageClick={handlePageClick} totalPages={totalPages} />}
                        <Link to={"/"} className={cx("buy")}>Tiếp tục mua sắm</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
