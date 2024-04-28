import React from "react";
import classNames from "classnames/bind";

import styles from "./ItemProductCustom.module.scss";

const cx = classNames.bind(styles);

const ItemProductCustom = ({ data, length }) => {
  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
  };
  length && (data = data.slice(0, length));

  return (
    <div className={cx("container")}>
      {data.map((dataItem) => {
        const priceDiscount =
          dataItem &&
          dataItem?.price - dataItem?.price * (dataItem?.percentDiscount / 100);

        return (
          <a
            className={cx("item-link")}
            key={dataItem?._id}
            href={`/${dataItem?.slug}`}
          >
            <div className={cx("item")}>
              <div className={cx("item-new")}>
                {dataItem?.new && (
                  <img
                    src="https://shopdunk.com/images/uploaded/icon/new.png"
                    alt="error"
                  />
                )}
              </div>
              <div className={cx("item-img")}>
                <img src={dataItem?.imageAvatar[0]} alt="error" />
              </div>
              <div className={cx("item-content")}>
                <h3 className={cx("title")}>{dataItem?.title}</h3>
                <div className={cx("content")}>
                  <div className={cx("content-price")}>
                    {formatNumber(priceDiscount)}
                    <div className={cx("price-icon")}>₫</div>
                  </div>
                  <div className={cx("content-sale")}>
                    {formatNumber(dataItem?.price)}
                    <div className={cx("sale-icon")}>₫</div>
                  </div>
                  <div className={cx("content-percent")}>
                    -{dataItem?.percentDiscount}%
                  </div>
                </div>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default ItemProductCustom;
