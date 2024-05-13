import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CheckOut.module.scss";
import { IoLocationSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
// import { HiMinus, HiPlus } from "react-icons/hi";
import { GoTrash } from "react-icons/go";
import config from "../../config";
import { readJWT } from "../../services/apiUserService";
import jwtDecode from "../../hooks/jwtDecode";

const cx = classNames.bind(styles);

const CheckOut = () => {
  const navigate = useNavigate();
  const [dataCheckout, setDataCheckout] = useState();
  const [userLogin, setUserLogin] = useState()

  useEffect(() => {
    window.scrollTo(0, 0);
    const dataCheckout = JSON.parse(localStorage.getItem("dataCheckout"));
    console.log(dataCheckout)
    setDataCheckout(dataCheckout)
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchJWT(); }, []);
  const fetchJWT = async () => {
    let decoded = false
    const resJWT = await readJWT();
    if (resJWT?.DT?.jwt) {
      decoded = await jwtDecode(resJWT?.DT?.jwt)
    }
    setUserLogin(decoded?.user)
  };

  const handleCheckout = (e) => {
    e.preventDefault();
  };

  const formatNumber = (number) => { return number.toLocaleString("vi-VN"); };

  const totalPrice = () => {
    return dataCheckout && dataCheckout.reduce((total, product) => {
      return total + product?.priceDiscount
    }, 0)
  }

  return (
    <>
      <div className={cx("bl-logo-checkout")}>
        <div className={cx("logo-checkout")}>
          <div className={cx("logo")}>
            <img
              src="https://res.cloudinary.com/daofedrqe/image/upload/v1707379342/wanfit_apple_imageAvt/mhf6siicj77fofhuvfcm.png"
              alt=""
            />
            WanFit
          </div>
          <div className={cx("checkout")}>Thanh Toán</div>
        </div>
      </div>
      <div className={cx("bg-wrapper")}>
        <div className={cx("wrapper")}>
          <div className={cx("bg-top")}></div>
          <div className={cx("location")}>
            <div className={cx("title")}>
              <IoLocationSharp className={cx("logo")} />
              Địa chỉ nhận hàng
            </div>
            <div className={cx("content")}>
              <div className={cx("content-1")}>
                {userLogin?.lastName} {userLogin?.firstName}{" / "}{userLogin?.phone}
              </div>
              <div className={cx("content-2")}>
                {userLogin?.address}
              </div>
              <Link className={cx("content-3")}>Thay Đổi</Link>
            </div>
          </div>
          <div className={cx("title-product")}>Sản phẩm</div>
          <div className={cx("bl-product")}>
            <div className={cx("inner-left")}>
              <div className={cx("bl-table")}>
                <div className={cx("title")}>
                  <div className={cx("title-1")}>Hình ảnh</div>
                  <div className={cx("title-2")}>Tên sản phẩm</div>
                </div>
                <div className={cx("container")}>
                  {dataCheckout && dataCheckout.map((product, index) => (
                    <div className={cx("content")} key={index}>
                      <div className={cx("content-1")}>
                        <img src={`${product?.image}`} alt="" />
                      </div>
                      <div className={cx("content-2")}>
                        <div className={cx("heading")}>{product?.title}</div>
                        <div className={cx("address")}>Giá: {product && formatNumber(product?.priceDiscount)}₫</div>
                        <div className={cx("color")}>
                          Màu: {product?.color}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={cx("inner-right")}>
              <div className={cx("bl-total")}>
                <div className={cx("total-1")}>
                  <div className={cx("title-1")}>Tổng tiền hàng</div>
                  <div className={cx("text-1")}>
                    ₫{dataCheckout && formatNumber(totalPrice())}
                  </div>
                </div>
                <div className={cx("total-2")}>
                  <div className={cx("title-2")}>Phí vận chuyển</div>
                  <div className={cx("text-2")}>₫0</div>
                </div>
                <div className={cx("total-3")}>
                  <div className={cx("title-3")}>Tổng thanh toán</div>
                  <div className={cx("text-3")}>
                    ₫{dataCheckout && formatNumber(totalPrice())}
                  </div>
                </div>
                <div className={cx("bl-btn")}>
                  <div className={cx("bl-buy")}>
                    <Link to={`/${config.routes.cart}`} className={cx("buy")}>
                      Quay lại giỏ hàng
                    </Link>
                  </div>
                  <button type="submit" className={cx("btn")} onClick={(e) => handleCheckout(e)}>
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
