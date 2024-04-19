import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductItemBlockCategory.module.scss";
import { Link } from "react-router-dom";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
// import { FaRegHeart } from "react-icons/fa";
// import { FaHeart } from "react-icons/fa";

const cx = classNames.bind(styles);

const ProductItemBlockCategory = (props) => {
  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
  };

  return (
    <Link to={`/${props?.product?.slug}`} className={cx("product-item-block")}>
      <div className={cx("heart")}>
        {/* <FaRegHeart className={cx("heart-icon-empty")} /> */}
        {/* <FaHeart className={cx("heart-icon-fill")} /> */}
      </div>
      <div className={cx("avatar")}>
        <img className={cx("img")} src={`${props?.product?.imageAvatar[0]}`} alt="" />
      </div>
      <div className={cx("content")}>
        <div className={cx("check-design")}>
          <IoShieldCheckmarkSharp className={cx("check-icon")} />
          Thiết kế bởi WanFit
        </div>
        <div className={cx("title")}>{props?.product?.title}</div>
        <div className={cx("information")}>
          <span className={cx("information")}>Số tầng {props?.product?.numberOfFloors}</span>
          <span className={cx("information", "center")}>
            Phòng ngủ {props?.product?.roomNumber}
          </span>
          <span className={cx("information")}>
            Diện tích {props?.product?.width * props?.product?.length} m2
          </span>
        </div>
        <div className={cx("btn-price")}>
          <button className={cx("btn")}>
            Khám Phá
            <MdOutlineArrowOutward className={cx("btn-icon")} />
          </button>
          <div className={cx("price")}>
            {props && props.product && props.product.price && formatNumber(props.product.price)} ₫
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItemBlockCategory;
