import React from "react";
import classNames from "classnames/bind";
import styles from "./HeaderAdmin.module.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiUserCircleLight } from "react-icons/pi";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const HeaderAdmin = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>Dashboard</div>
      <div className={cx("search")}>
        <input className={cx("input")} placeholder="Tìm kiếm ..." />
      </div>
      <div className={cx("social")}>
        <div className={cx("setting")}>
          <IoSettingsOutline className={cx("setting-icon")} />
        </div>
        <div className={cx("setting")}>
          <IoMdNotificationsOutline className={cx("setting-icon")} />
        </div>
        <Link className={cx("user")} to={`/`}>
          <PiUserCircleLight className={cx("user-icon")} />
          <span className={cx("user-content")}>Phạm Quốc Hoàng</span>
          <FaAngleDown className={cx("user-icon-down")} />
        </Link>
      </div>
    </div>
  );
};

export default HeaderAdmin;
