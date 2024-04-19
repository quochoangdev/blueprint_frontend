import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

//
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);
const HeaderItem = ({ name, linkUrl }) => {
  return (
    <div className={cx("menu-category")}>
      <Link to={`/${linkUrl}`} className={cx("menu-category-link")}>
        <span>{name}</span>
      </Link>
    </div>
  );
};

HeaderItem.propTypes = {
  name: PropTypes.string,
  linkUrl: PropTypes.string,
};

export default HeaderItem;
