import PropTypes from "prop-types";
import classNames from "classnames/bind";

//
import styles from "./DefaultLayoutNoContact.module.scss";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

//
const cx = classNames.bind(styles);

const DefaultLayoutNoContact = ({ children }) => {

  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>{children}</div>
      <Footer />
    </div>
  );
};

DefaultLayoutNoContact.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayoutNoContact;
