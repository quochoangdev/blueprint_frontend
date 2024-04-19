//
import PropTypes from "prop-types";
import classNames from "classnames/bind";

//
import styles from "./HeadlessLayout.module.scss";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

//
const cx = classNames.bind(styles);

const HeadlessLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>{children}</div>
      <Footer />
    </div>
  );
};

HeadlessLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeadlessLayout;
