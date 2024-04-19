import React from "react";
import classNames from "classnames/bind";
import styles from "./ContactOrderCart.module.scss";
import { FaChevronDown } from "react-icons/fa";
// import {  FaRegHeart } from "react-icons/fa";
// import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const ContactOrderCart = () => {
  return (
    <div>
      <form className={cx("contact-form")}>
        <div className={cx("title")}>Liên hệ đặt hàng</div>
        {/* name */}
        <div className={cx("block-input")}>
          <label className={cx("bl-label")} htmlFor="name">
            Tên của bạn
          </label>
          <input className={cx("bl-input")} id="name" type="text" placeholder="Nhập tên của bạn" />
        </div>
        {/* phone */}
        <div className={cx("block-input")}>
          <label className={cx("bl-label")} htmlFor="phone">
            Số điện thoại
          </label>
          <input
            className={cx("bl-input")}
            id="phone"
            type="text"
            placeholder="Nhập số điện thoại"
          />
        </div>
        <div className={cx("two-select")}>
          {/* province/city */}
          <div className={cx("block-select", "mr-12")}>
            <label className={cx("bl-label")} htmlFor="province-city">
              Tỉnh/Thành phố *
            </label>
            <div className={cx("bl-down")}>
              <select className={cx("bl-select")} id="province-city">
                <option>- chọn -</option>
              </select>
              <FaChevronDown className={cx("bl-icon")} />
            </div>
          </div>
          {/* district */}
          <div className={cx("block-select")}>
            <label className={cx("bl-label")} htmlFor="district">
              Quận huyện *
            </label>
            <div className={cx("bl-down")}>
              <select className={cx("bl-select")} id="district">
                <option>- chọn -</option>
              </select>
              <FaChevronDown className={cx("bl-icon")} />
            </div>
          </div>
        </div>
        <div className={cx("sum-price")}>
          <div className={cx("sum")}>Tổng tiền:</div>
          <div className={cx("price")}>6,990,000 ₫</div>
        </div>
        <p className={cx("note")}>Bạn chưa cần phải thanh toán tiền ở bước này</p>
        {/* <div className={cx("two-btn")}> */}
        {/* <button className={cx("btn", "cl-white", "fl-1", "mr-6")}>
          <FaRegHeart className={cx("icon")} />
          Thêm yêu thích
        </button> */}
        {/* <button className={cx("btn", "cl-white", "fl-1")}>
          <FiShoppingCart className={cx("icon")} />
          Thêm vào giỏ hàng
        </button> */}
        {/* </div> */}
        <Link to={"/checkout"} className={cx("btn", "cl-primary")}>
          Mua Ngay
        </Link>
      </form>
    </div>
  );
};

export default ContactOrderCart;
