import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCheckout } from "../../redux/cartSlice";
import { readCart, readJWT } from "../../services/apiUserService";
import ReactPaginateBlock from "../../layout/components/ReactPaginateBlock/ReactPaginateBlock";
import jwtDecode from "../../hooks/jwtDecode";
import CartItem from "./CartItem";
import styles from "./Cart.module.scss";
import config from "../../config";

const cx = classNames.bind(styles);

const Cart = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productData, setProductData] = useState();
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [Price, setPrice] = useState(0);

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

    const totalPrice = () => {
        return productData && productData.reduce((total, product) => {
            return total + product?.priceDiscount * product?.quantity
        }, 0)
    }

    const handleBuy = (e) => {
        e.preventDefault(); dispatch(addCheckout(productData));
        navigate(`/${config.routes.checkout}`)
    };

    const formatNumber = (number) => { return number.toLocaleString("vi-VN"); };

    return (
        <>
            {productData && productData?.length > 0 ?
                <div className={cx("wrapper")}>
                    <div className={cx("inner-left")}>
                        <div className={cx("bl-table")}>
                            <div className={cx("title")}>
                                <div className={cx("title-1")}>Hình ảnh</div>
                                <div className={cx("title-2")}>Tên sản phẩm</div>
                                <div className={cx("title-3")}>Giá bán</div>
                                <div className={cx("title-4")}>Số lượng</div>
                                <div className={cx("title-4")}>Khác</div>
                                <div className={cx("title-5")}></div>
                            </div>
                            <div className={cx("container")}>
                                {productData && productData.map((product, index) => {
                                    return (<CartItem key={`cart-${index}`} product={product} totalPrice={totalPrice()} fetchProducts={fetchJWT} />);
                                })}
                                <div className={cx("total-price")}>Tổng tiền: {productData && formatNumber(totalPrice())}₫</div>
                            </div>
                            <div className={cx("bl-buy")}>
                                {totalPages > 0 && <ReactPaginateBlock handlePageClick={handlePageClick} totalPages={totalPages} />}
                                <Link to={`/${config.routes.checkout}`} className={cx("buy")} onClick={handleBuy}>Mua tất cả</Link>
                                <Link to={"/"} className={cx("buy")}>Tiếp tục mua sắm</Link>
                            </div>
                        </div>
                    </div>
                </div> :
                <div className={cx("no-cart")}>
                    <img src="https://res.cloudinary.com/dqhj1sukr/image/upload/v1716057739/ecommerce/bb5ehztkhkwx51g2s6ez.png" alt="" />
                </div>
            }
        </>
    );
};

export default Cart;
