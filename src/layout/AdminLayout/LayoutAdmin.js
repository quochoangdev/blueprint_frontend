//
import PropTypes from "prop-types";
//
import classNames from "classnames/bind";
import styles from "./LayoutAdmin.module.scss";
import HeaderAdmin from "./components/HeaderAdmin/HeaderAdmin";
import SliderAdmin from "./components/SliderAdmin/SliderAdmin";

const cx = classNames.bind(styles);

const LayoutAdmin = ({ children }) => {
  return (
    <div className={cx("wrapper-color")}>
      <div className={cx("wrapper")}>
        <SliderAdmin />
        <div className={cx("container")}>
          <HeaderAdmin />
          {children}
        </div>
      </div>
    </div>
  );
};

LayoutAdmin.propTypes = {
  children: PropTypes.node,
};

export default LayoutAdmin;
