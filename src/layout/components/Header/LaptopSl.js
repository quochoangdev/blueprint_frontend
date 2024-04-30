import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

//
// import config from "../../../config";
import styles from "./Header.module.scss";
import config from "../../../config";

const cx = classNames.bind(styles);
const LaptopSl = ({ name, linkUrl, icon }) => {
  return (
    <div className={cx("menu-category")}>
      <Link to={`/${linkUrl}`} className={cx("menu-category-link")}>
        <span>{name}</span>
        {icon && <div className={cx("menu-category-icon")}>{icon}</div>}
      </Link>
      {icon && (
        <div className={cx("menu-category-link-absolute")}>
          <Link className={cx("menu-category-link-absolute-a")} to={`/${config.routes.laptop}`}>MacBook</Link>
          <Link className={cx("menu-category-link-absolute-a")} to={`/${config.routes.laptop}`}>HP</Link>
          <Link className={cx("menu-category-link-absolute-a")} to={`/${config.routes.laptop}`}>ASus</Link>
          <Link className={cx("menu-category-link-absolute-a")} to={`/${config.routes.laptop}`}>Acer</Link>
          <Link className={cx("menu-category-link-absolute-a")} to={`/${config.routes.laptop}`}>Lenovo</Link>
          <Link className={cx("menu-category-link-absolute-a")} to={`/${config.routes.laptop}`}>Dell</Link>
          <Link className={cx("menu-category-link-absolute-a")} to={`/${config.routes.laptop}`}>Msi</Link>
        </div>
      )}
    </div>
  );
};

LaptopSl.propTypes = {
  name: PropTypes.string,
  linkUrl: PropTypes.string,
};

export default LaptopSl;
