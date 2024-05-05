import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import config from "../../../config";

const cx = classNames.bind(styles);
const MobileSl = ({ name, linkUrl, icon }) => {
  return (
    <div className={cx("menu-category")}>
      <Link to={`/${linkUrl}`} className={cx("menu-category-link")}>
        <span>{name}</span>
        {icon && <div className={cx("menu-category-icon")}>{icon}</div>}
      </Link>
      {icon && (
        <div className={cx("menu-category-link-absolute")}>
          <Link className={cx("menu-category-link-absolute-a")} to={`/dien-thoai/${config.routes.iphone}`}>Iphone</Link>
          <Link className={cx("menu-category-link-absolute-a")} to={`/dien-thoai/${config.routes.mobile}`}>Samsung</Link>
        </div>
      )}
    </div>
  );
};

MobileSl.propTypes = {
  name: PropTypes.string,
  linkUrl: PropTypes.string,
};

export default MobileSl;
