//
import PropTypes from "prop-types";
import classNames from "classnames/bind";

//
import styles from "./DefaultLayout.module.scss";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import SendEmail from "../components/SendEmail";

//
const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>{children}</div>
      <SendEmail />
      <Footer />
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
