import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ContactOrder.module.scss";
import { FaChevronDown, FaRegHeart } from "react-icons/fa";
import { createHeart } from "../../../services/userService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

const ContactOrder = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    phone: "",
    city: "",
    district: "",
  });
  const isCheckInputs = () => {
    if (!data.name) {
      toast("Vui lòng nhập tên");
      return false;
    }
    if (!data.phone) {
      toast("Vui lòng nhập số điện thoại");
      return false;
    }
    if (!data.city) {
      toast("Vui lòng chọn thành phố");
      return false;
    }
    if (!data.district) {
      toast("Vui lòng chọn huyện");
      return false;
    }
    return true;
  };
  // Call Api
  const handleAddHeart = async (e) => {
    e.preventDefault();
    if (!!props?.dataUsers === true && !!props?.cookie === true) {
      let data = await createHeart(props.productData);
      if (data.EC === 0) {
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    } else {
      toast.error("Vui lòng đăng nhập");
    }
  };

  const handleBuyWithHeart = async (e) => {
    e.preventDefault();
    const isCheck = isCheckInputs();
    if (isCheck) {
      const newData = { infoCustomer: data, productData: props.productData };
      localStorage.setItem("dataCustomer", JSON.stringify(newData));
      navigate("/checkout");
    }
    // console.log(data);
    // console.log(props.productData);
    // console.log(newData);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
  };

  return (
    <div>
      <form className={cx("contact-form")}>
        <div className={cx("title")}>Liên hệ đặt hàng</div>
        {/* name */}
        <div className={cx("block-input")}>
          <label className={cx("bl-label")} htmlFor="name">
            Tên của bạn
          </label>
          <input
            className={cx("bl-input")}
            id="name"
            name="name"
            type="text"
            placeholder="Nhập tên của bạn"
            onChange={handleOnChange}
          />
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
            name="phone"
            placeholder="Nhập số điện thoại"
            onChange={handleOnChange}
          />
        </div>
        <div className={cx("two-select")}>
          {/* province/city */}
          <div className={cx("block-select", "mr-12")}>
            <label className={cx("bl-label")} htmlFor="province-city">
              Tỉnh/Thành phố *
            </label>
            <div className={cx("bl-down")}>
              <select
                className={cx("bl-select")}
                id="province-city"
                name="city"
                onChange={handleOnChange}
              >
                <option value={`0`}>- chọn -</option>
                <option value={`Quảng Ngãi`}>Quảng Ngãi</option>
                <option value={`Đà Nẵng`}>Đà Nẵng</option>
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
              <select
                className={cx("bl-select")}
                id="district"
                name="district"
                onChange={handleOnChange}
              >
                <option value={`0`}>- chọn -</option>
                <option value={`Tịnh Khê`}>Tịnh Khê</option>
                <option value={`Thanh Khê`}>Thanh Khê</option>
              </select>
              <FaChevronDown className={cx("bl-icon")} />
            </div>
          </div>
        </div>
        <div className={cx("sum-price")}>
          <div className={cx("sum")}>Tổng tiền:</div>
          <div className={cx("price")}>
            {props?.productData?.price && formatNumber(props?.productData?.price)} ₫
          </div>
        </div>
        <p className={cx("note")}>Bạn chưa cần phải thanh toán tiền ở bước này</p>
        <button className={cx("btn", "cl-white", "fl-1")} onClick={(e) => handleAddHeart(e)}>
          <FaRegHeart className={cx("icon")} />
          {props?.isCheckHeart ? "Đã thêm vào yêu thích" : "Thêm vào yêu thích"}
        </button>
        <button className={cx("btn", "cl-primary")} onClick={(e) => handleBuyWithHeart(e)}>
          Mua Ngay
        </button>
      </form>
    </div>
  );
};

export default ContactOrder;
