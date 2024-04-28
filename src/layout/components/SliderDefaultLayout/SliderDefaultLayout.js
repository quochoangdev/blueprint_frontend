import React from "react";
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

import classNames from "classnames/bind";

import styles from "./SliderDefaultLayout.module.scss";

const cx = classNames.bind(styles);

const SliderDefaultLayout = ({ images = [] }) => {
  const newImages = [];
  images.map((image) => {
    return newImages.push({
      original: image,
      originalClass: cx("slide-img"),
    });
  });
  return (
    <div className={cx("slider")}>
      <ImageGallery
        showPlayButton={false}
        showFullscreenButton={false}
        autoPlay={true}
        showThumbnails={false}
        slideDuration={2000}
        items={newImages}
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

export default SliderDefaultLayout;
