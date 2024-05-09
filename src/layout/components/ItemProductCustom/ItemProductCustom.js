import React from "react";
import classNames from "classnames/bind";

import styles from "./ItemProductCustom.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const ItemProductCustom = ({ data, length }) => {
  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
  };
  length && (data = data.slice(0, length));

  return (
    <div className={cx("container")}>
      {data.map((dataItem, index) => {
        const priceDiscount = dataItem && dataItem?.price - dataItem?.price * (dataItem?.percentDiscount / 100);
        const firstImageColor = Object.keys(dataItem.image)[0]

        return (
          <Link className={cx("item-link")} key={`${index}-product`} to={`/${dataItem?.slug}`}>
            <div className={cx("item")}>
              <div className={cx("item-new")}>
                {dataItem?.new && (<img src="https://shopdunk.com/images/uploaded/icon/new.png" alt="error" />)}
              </div>
              <div className={cx("item-img")}>
                {dataItem?.image && <img src={dataItem?.image[firstImageColor][0]} alt="error" />}
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
          </Link>
        );
      })}
    </div>
  );
};

export default ItemProductCustom;
