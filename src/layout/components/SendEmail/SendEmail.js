import classNames from "classnames/bind";
import { AiOutlineMail } from "react-icons/ai";

//
import styles from "./SendEmail.module.scss";
import { useState } from "react";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const SendEmail = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    product: "",
    budget: "",
    message: "",
  });
  const isCheckInputs = () => {
    if (!data.name) {
      toast("Vui lòng nhập họ và tên");
      return false;
    }
    if (!data.phone) {
      toast("Vui lòng nhập số điện thoại");
      return false;
    }
    if (!data.product) {
      toast("Vui lòng nhập diện tích đất");
      return false;
    }
    if (!data.budget) {
      toast("Vui lòng chọn ngân sách hiện có");
      return false;
    }
    return true;
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let isCheck = isCheckInputs();
    if (isCheck === true) {
      console.log(data);
    }
  };
  return (
    <div className={cx("footer-new-letter-bg")}>
      <div className={cx("footer-new-letter")}>
        <div className={cx("heading-letter")}>Liên hệ với chúng tôi</div>
        <form className={cx("send-email")}>
          {/* Họ và tên */}
          <div className={cx("email-letter")}>
            <label htmlFor="name" className={cx("email-letter-title")}>
              Họ và tên
            </label>
            <input
              id="name"
              className={cx("email-letter-input")}
              name="name"
              onChange={handleOnChange}
            />
          </div>
          {/* Số điện thoại */}
          <div className={cx("email-letter")}>
            <label htmlFor="phone" className={cx("email-letter-title")}>
              Số điện thoại
            </label>
            <input
              id="phone"
              className={cx("email-letter-input")}
              name="phone"
              onChange={handleOnChange}
            />
          </div>
          {/* Sản phẩm */}
          <div className={cx("email-letter")}>
            <label htmlFor="product" className={cx("email-letter-title")}>
              Sản phẩm
            </label>
            <input
              id="product"
              className={cx("email-letter-input")}
              name="product"
              onChange={handleOnChange}
            />
          </div>
          {/* Ngân sách */}
          <div className={cx("email-letter")}>
            <label className={cx("email-letter-title")}>Ngân sách</label>
            <div className={cx("budget-content")}>
              {/* < 10tr */}
              <div className={cx("budget-block")}>
                <input
                  id="budget-1"
                  type="checkbox"
                  className={cx("budget-input")}
                  name="budget"
                  value={"0-10"}
                  onChange={handleOnChange}
                />
                <label htmlFor="budget-1" className={cx("budget-title")}>
                  &lt; 10 triệu
                </label>
              </div>
              {/* Từ 10 - 20 */}
              <div className={cx("budget-block")}>
                <input
                  id="budget-2"
                  type="checkbox"
                  className={cx("budget-input")}
                  name="budget"
                  value={"10-20"}
                  onChange={handleOnChange}
                />
                <label htmlFor="budget-2" className={cx("budget-title")}>
                  10 - 20 triệu
                </label>
              </div>
              {/* Từ 20 - 30 */}
              <div className={cx("budget-block")}>
                <input
                  id="budget-3"
                  type="checkbox"
                  className={cx("budget-input")}
                  name="budget"
                  value={"20-30"}
                  onChange={handleOnChange}
                />
                <label htmlFor="budget-3" className={cx("budget-title")}>
                  Từ 20 - 30 triệu
                </label>
              </div>
              {/* > 30 triệu */}
              <div className={cx("budget-block")}>
                <input
                  id="budget-4"
                  type="checkbox"
                  className={cx("budget-input")}
                  name="budget"
                  value={"30"}
                  onChange={handleOnChange}
                />
                <label htmlFor="budget-4" className={cx("budget-title")}>
                  &gt; 30 triệu
                </label>
              </div>
            </div>
          </div>
          {/* Lời nhắn */}
          <div className={cx("email-letter")}>
            <label htmlFor="message" className={cx("email-letter-title")}>
              Lời nhắn
            </label>
            <textarea
              rows={3}
              id="message"
              className={cx("email-letter-input", "input-area")}
              name="message"
              onChange={handleOnChange}
            />
          </div>
          <button className={cx("email-letter-register")} onClick={handleSubmit}>
            Gửi cho chúng tôi
            <AiOutlineMail className={cx("email-letter-register-icon")} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendEmail;
