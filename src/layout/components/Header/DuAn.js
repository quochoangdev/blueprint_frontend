import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

//
// import config from "../../../config";
import styles from "./Header.module.scss";
import config from "../../../config";

const cx = classNames.bind(styles);
const DuAn = ({ name, linkUrl, icon }) => {
  return (
    <div className={cx("menu-category")}>
      <Link to={`/${linkUrl}`} className={cx("menu-category-link")}>
        <span>{name}</span>
        {icon && <div className={cx("menu-category-icon")}>{icon}</div>}
      </Link>
      {icon && (
        <div className={cx("menu-category-link-absolute")}>
          <Link className={cx("menu-category-link-absolute-a")} to={`/${config.routes.nhaCap4Dep}`}>
            Nhà cấp 4 đẹp
          </Link>
          <Link className={cx("menu-category-link-absolute-a")} to={`/${config.routes.nhaPhoDep}`}>
            Nhà phố đẹp
          </Link>
          <Link
            className={cx("menu-category-link-absolute-a")}
            to={`/${config.routes.mauBietThuDep}`}
          >
            Mẫu biệt thự đẹp
          </Link>
          <Link
            className={cx("menu-category-link-absolute-a")}
            to={`/${config.routes.mauKhachSanDep}`}
          >
            Mẫu khách sạn đẹp
          </Link>
        </div>
      )}
    </div>
  );
};

DuAn.propTypes = {
  name: PropTypes.string,
  linkUrl: PropTypes.string,
};

export default DuAn;
