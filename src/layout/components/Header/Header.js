import classNames from "classnames/bind";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState, createContext, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../../../config";
import styles from "./Header.module.scss";
import HeaderItem from "./HeaderItem";
import User from "./User";
import Search from "../Search/Search";
import { readCart, readJWT } from "../../../services/apiUserService";
import MobileSl from "./MobileSl";
import IpadSl from "./IpadSl";
import LaptopSl from "./LaptopSl";

const cx = classNames.bind(styles);
export const ToggleSearchFullscreenContext = createContext(null);

const Header = () => {
  const [blockSearchFullscreen, setBlockSearchFullscreen] = useState(false);
  const [productData, setProductData] = useState();
  const [dataUsers, setDataUsers] = useState();
  const [cookie, setCookie] = useState();

  // Check user
  useEffect(() => {
    // Get localStorage
    const user = JSON.parse(localStorage.getItem("dataUsers"));
    setDataUsers(user);
    // Call api JWT
    // fetchJWT();
  }, []);

  // const fetchJWT = async () => {
  //   const resJWT = await readJWT();
  //   setCookie(resJWT?.DT?.jwt);
  // };

  const handleSearchFullscreen = (e) => {
    e.preventDefault();
    setBlockSearchFullscreen((pre) => !pre);
  };

  const handleClose = () => {
    setBlockSearchFullscreen((pre) => !pre);
  };

  // useEffect(() => {
  //   if (!!dataUsers === true && !!cookie === true) {
  //     fetchProducts();
  //   }
  // }, [dataUsers, cookie]);

  // const fetchProducts = async () => {
  //   if (!!dataUsers === true && !!cookie === true) {
  //     let data = await readCart();
  //     setProductData(data?.DT);
  //   }
  // };
  return (
    <div className={cx("wrapper")}>
      <nav className={cx("navbar")}>
        {/* logo */}
        <div className={cx("navbar-item-logo")}>
          <Link className={cx("logo-link")} to="/">
            <div className={cx("logo")}>QHDev</div>
          </Link>
        </div>
        {/* menu category */}
        <div className={cx("navbar-item-menu")}>
          <HeaderItem name={"TRANG CHỦ"} linkUrl={""} />
          <MobileSl
            name={"Điện thoại"}
            linkUrl={config.routes.mobile}
            icon={<MdKeyboardArrowDown />}
          />
          <IpadSl
            name={"Tablet"}
            linkUrl={config.routes.tablet}
            icon={<MdKeyboardArrowDown />}
          />
          <LaptopSl
            name={"Laptop"}
            linkUrl={config.routes.laptop}
            icon={<MdKeyboardArrowDown />}
          />
          <HeaderItem name={"Phản hồi"} linkUrl={"phan-hoi"} />
          <HeaderItem name={"Tuyển dụng"} linkUrl={"tuyen-dung"} />
        </div>
        {/* social */}
        <div className={cx("navbar-item-social")}>
          <div className={cx("social-category")}>
            <Link
              to="tel:0971955144"
              className={cx("social-category-link", "tel-link")}
            >
              Tel: 0971955144
            </Link>
          </div>
          <div className={cx("social-category")}>
            <Link
              to="/"
              className={cx("social-category-link")}
              onClick={handleSearchFullscreen}
            >
              <FiSearch />
            </Link>
          </div>
          <div className={cx("social-category")}>
            <Link
              to={`/${config.routes.cart}`}
              className={cx("social-category-link")}
            >
              <FiShoppingCart />
              {/* {!!dataUsers === true && !!cookie === true ? (
                <div className={cx("car-quantity")}>
                  {productData && productData?.length}
                </div>
              ) : (
                <div className={cx("car-quantity")}>0</div>
              )} */}
              <div className={cx("car-quantity")}>0</div>
            </Link>
          </div>
          <div className={cx("social-category")}>
            <User icon={<FiUser />} />
          </div>
        </div>
        {/* search fullscreen */}
        <ToggleSearchFullscreenContext.Provider value={handleClose}>
          <Search
            blockSearchFullscreen={blockSearchFullscreen}
            handleClose={handleClose}
          />
        </ToggleSearchFullscreenContext.Provider>
      </nav>
    </div>
  );
};

export default Header;
