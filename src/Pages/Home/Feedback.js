import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
const Feedback = (props) => {
  return (
    <div className={cx("block-feedback")}>
      <div className={cx("message-feedback")}>
        <FaQuoteLeft className={cx("feedback-icon")} />
        <div className={cx("feedback-content")}>{props.content}</div>
        <div className={cx("feedback-show")}>
          <div className={cx("show-more")}>Xem thêm</div>
        </div>
      </div>
      <div className={cx("feedback-user")}>
        <div className={cx("feedback-avatar")}>
          <img className={cx("feedback-img")} src={props.img} alt="" />
        </div>
        <div className={cx("feedback-name")}>Phạm Quốc Hoàng (WanFit)</div>
      </div>
    </div>
  );
};

export default Feedback;
