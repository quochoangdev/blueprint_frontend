import React from "react";
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

import classNames from "classnames/bind";

import styles from "./SliderHome.module.scss";
import './SliderHome.css'

const cx = classNames.bind(styles);

const SliderHome = () => {
  const image = [
    {
      original:
        "https://shopdunk.com/images/uploaded/banner/thang_12_1/banner%20imac%20t12_Banner%20PC1.jpg",
      originalClass: cx("slide-img"),
    },
    {
      original:
        "https://shopdunk.com/images/uploaded/banner/banner_thang12/tongpc.png",
      originalClass: cx("slide-img"),
    },
    {
      original:
        "https://shopdunk.com/images/uploaded/banner/thang_12_1/2560x800%20(1).png",
      originalClass: cx("slide-img"),
    },
    {
      original:
        "https://shopdunk.com/images/uploaded/banner/thang_12_1/2560x800%20(2).png",
      originalClass: cx("slide-img"),
    },
    {
      original:
        "https://shopdunk.com/images/uploaded/banner/banner_thang12/airpc.png",
      originalClass: cx("slide-img"),
    },
    {
      original:
        "https://shopdunk.com/images/uploaded/banner/banner_thang12/m2pc.png",
      originalClass: cx("slide-img"),
    },
    {
      original:
        "https://shopdunk.com/images/uploaded/banner/banner_thang12/2560x800%20(1).png",
      originalClass: cx("slide-img"),
    },
  ];
  return (
    <div className={cx("slider")}>
      <ImageGallery
        showPlayButton={false}
        showFullscreenButton={false}
        autoPlay={true}
        showThumbnails={false}
        slideDuration={2000}
        items={image}
        originalHeight={450}
        showBullets
        renderLeftNav={(onClick, disabled) => {
          return (
            <FaCircleChevronLeft
              className={cx("slider-icon-left")}
              onClick={onClick}
              disabled={disabled}
            />
          );
        }}
        renderRightNav={(onClick, disabled) => {
          return (
            <FaCircleChevronRight
              className={cx("slider-icon-right")}
              onClick={onClick}
              disabled={disabled}
            />
          );
        }}
      />
    </div>
  );
};

export default SliderHome;
