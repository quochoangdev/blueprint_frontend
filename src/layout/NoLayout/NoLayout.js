//
import PropTypes from "prop-types";

//
import classNames from "classnames/bind";
import styles from "./NoLayout.module.scss";
import Header from "../components/Header/Header";
// import Footer from "../components/Footer/Footer";

const cx = classNames.bind(styles);

const NoLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

NoLayout.propTypes = {
  children: PropTypes.node,
};

export default NoLayout;
