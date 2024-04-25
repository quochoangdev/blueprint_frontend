import React from "react";
import classNames from "classnames/bind";
import { FaChevronRight } from "react-icons/fa6";

import styles from "./HomePageItem.module.scss";
import ItemProductCustom from "../ItemProductCustom";

const cx = classNames.bind(styles);

const HomePageItem = ({ data = [], length, title, link, btn }) => {
  return (
    <div className={cx("wrapper")}>
      {title ? (
        <h2 className={cx("title")}>
          <a href={`/${link}`} className={cx("title-link")}>
            {title}
          </a>
        </h2>
      ) : (
        <></>
      )}
      <ItemProductCustom data={data} length={length} />
      {btn ? (
        <div className={cx("btn-show-all")}>
          <a href={`/${link}`} className={cx("btn-show-all-link")}>
            Xem tất cả {title}
            <span className={cx("btn-show-icon")}>
              <FaChevronRight />
            </span>
          </a>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HomePageItem;
