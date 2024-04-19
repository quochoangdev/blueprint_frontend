import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./SliderAdmin.module.scss";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { PiSignOut } from "react-icons/pi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { TbUserCog } from "react-icons/tb";
import { RiListRadio } from "react-icons/ri";
import config from "../../../../config";

const cx = classNames.bind(styles);

const SliderAdmin = () => {
  const [currentActive, setCurrentActive] = useState("");

  // set current active
  let url = window.location.pathname;
  useEffect(() => {
    let lastIndex = url.lastIndexOf("/");
    let result = url.substring(lastIndex + 1);
    setCurrentActive(result);
  }, [url]);
  // add active slider
  useEffect(() => {
    const listItem = document.getElementsByClassName(styles["list-item"]);
    const listItemArray = Array.from(listItem);

    listItemArray.map((item) => {
      item.onclick = () => {
        listItemArray.map((removeAllClass) => {
          return removeAllClass.classList.remove(styles["active"]);
        });
        item.classList.add(styles["active"]);
      };
      return item;
    });
  }, []);

  return (
    <div className={cx("wrapper")}>
      <Link className={cx("heading")} to={`/${config.routes.homeAdmin}`}>
        <MdDashboard className={cx("heading-icon")} />
        <span>QHoangiT</span>
      </Link>
      <div className={cx("list")}>
        <Link
          className={cx("list-item", currentActive === "dashboard" ? "active" : "")}
          to={`/${config.routes.homeAdmin}`}
        >
          <RxDashboard className={cx("list-icon")} />
          <span className={cx("list-content")}>Dashboard</span>
        </Link>
        <Link
          className={cx("list-item", currentActive === "users" ? "active" : "")}
          to={`/${config.routes.userAdmin}`}
        >
          <TbUserCog className={cx("list-icon")} />
          <span className={cx("list-content")}>Users</span>
        </Link>
        <Link
          className={cx("list-item", currentActive === "groups" ? "active" : "")}
          to={`/${config.routes.groupAdmin}`}
        >
          <RiListRadio className={cx("list-icon")} />
          <span className={cx("list-content")}>Groups</span>
        </Link>
        <Link
          className={cx("list-item", currentActive === "group-role" ? "active" : "")}
          to={`/${config.routes.groupRoleAdmin}`}
        >
          <RiListRadio className={cx("list-icon")} />
          <span className={cx("list-content")}>Group-Role</span>
        </Link>
        <Link
          className={cx("list-item", currentActive === "roles" ? "active" : "")}
          to={`/${config.routes.roleAdmin}`}
        >
          <RiListRadio className={cx("list-icon")} />
          <span className={cx("list-content")}>Roles</span>
        </Link>
        <Link
          className={cx("list-item", currentActive === "products" ? "active" : "")}
          to={`/${config.routes.productAdmin}`}
        >
          <HiOutlineShoppingBag className={cx("list-icon")} />
          <span className={cx("list-content")}>Products</span>
        </Link>
        <Link
          className={cx("list-item", currentActive === "categorys" ? "active" : "")}
          to={`/${config.routes.categoryAdmin}`}
        >
          <HiOutlineShoppingBag className={cx("list-icon")} />
          <span className={cx("list-content")}>Categorys</span>
        </Link>
        <Link
          className={cx("list-item", currentActive === "orders" ? "active" : "")}
          to={`/${config.routes.orderAdmin}`}
        >
          <MdOutlineShoppingCart className={cx("list-icon")} />
          <span className={cx("list-content")}>Orders</span>
        </Link>
        <Link
          className={cx("list-item", currentActive === "settings" ? "active" : "")}
          to={`/${config.routes.settingAdmin}`}
        >
          <IoSettingsOutline className={cx("list-icon")} />
          <span className={cx("list-content")}>Settings</span>
        </Link>
        <Link
          className={cx("list-item", currentActive === "sign-out" ? "active" : "")}
          to={`/${config.routes.signOutAdmin}`}
        >
          <PiSignOut className={cx("list-icon")} />
          <span className={cx("list-content")}>Sign Out</span>
        </Link>
      </div>
    </div>
  );
};

export default SliderAdmin;
