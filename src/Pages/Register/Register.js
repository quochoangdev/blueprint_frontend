import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import styles from "./Register.module.scss";
import { registerUser } from "../../services/userService";

const cx = classNames.bind(styles);

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showPassword, setShowPassword] = useState([false]);
  const [showConfirmPassword, setShowConfirmPassword] = useState([false]);
  const [data, setData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    sex: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const isCheckInputs = () => {
    if (!data.lastName) {
      toast("Vui lòng nhập họ");
      return false;
    }
    if (!data.firstName) {
      toast("Vui lòng nhập tên");
      return false;
    }
    if (!data.email) {
      toast("Vui lòng nhập email");
      return false;
    }
    if (!data.sex) {
      toast("Vui lòng chọn giới tính");
      return false;
    }
    if (!data.phone) {
      toast("Vui lòng nhập số điện thoại");
      return false;
    }
    if (!data.password) {
      toast("Vui lòng nhập mật khẩu");
      return false;
    }
    if (data.password !== data.confirmPassword) {
      toast("Mật khẩu không trùng nhau");
      return false;
    }
    let regular = /\S+@\S+\.\S+/;
    if (!regular.test(data.email)) {
      toast("Địa chỉ email không hợp lệ");
      return false;
    }
    return true;
  };

  // handle
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isCheck = isCheckInputs();
    if (isCheck === true) {
      let response = await registerUser(data);
      if (+response?.EC === 0) {
        toast.success(response?.EM);
        navigate("/login");
      } else {
        toast.error(response?.EM);
      }
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("instructions")}>
        <img
          className={cx("instructions-img")}
          src="https://shopdunk.com/images/uploaded/banner/TND_M402_010%201.jpeg"
          alt="Not found!"
        />
      </div>
      <div className={cx("register")}>
        <form className={cx("form-register")} onSubmit={handleSubmit}>
          <h1 className={cx("heading")}>Đăng Ký</h1>
          {/* last name */}
          <div className={cx("register-item")}>
            <label className={cx("register-item-label")}>Nhập họ:</label>
            <input
              className={cx("register-item-input")}
              name="lastName"
              type="text"
              onChange={handleOnChange}
            />
          </div>
          {/* first name */}
          <div className={cx("register-item")}>
            <label className={cx("register-item-label")}>Nhập tên:</label>
            <input
              className={cx("register-item-input")}
              name="firstName"
              type="text"
              onChange={handleOnChange}
            />
          </div>
          {/* email */}
          <div className={cx("register-item")}>
            <label className={cx("register-item-label")}>E-mail:</label>
            <input
              className={cx("register-item-input")}
              name="email"
              type="text"
              onChange={handleOnChange}
            />
          </div>
          {/* sex */}
          <div className={cx("register-male")}>
            <div className={cx("register-male-title-block")}>
              <label className={cx("register-male-title")}>Giới tính:</label>
            </div>
            <div className={cx("register-male-input-block")}>
              <input
                id={cx("gender-male")}
                className={cx("register-male-input")}
                value="male"
                type="radio"
                name="sex"
                onChange={handleOnChange}
              />
              <label htmlFor="gender-male" className={cx("register-male-label")}>
                Nam
              </label>
            </div>
            <div className={cx("register-male-input-block")}>
              <input
                id={cx("gender-female")}
                className={cx("register-male-input")}
                value="female"
                type="radio"
                name="sex"
                onChange={handleOnChange}
              />
              <label htmlFor="gender-female" className={cx("register-male-label")}>
                Nữ
              </label>
            </div>
          </div>
          {/* phone */}
          <div className={cx("register-item")}>
            <label className={cx("register-item-label")}>Điện thoại:</label>
            <input
              className={cx("register-item-input")}
              name="phone"
              type="text"
              onChange={handleOnChange}
            />
          </div>
          {/* password */}
          <div className={cx("register-item")}>
            <label className={cx("register-item-label")}>Mật khẩu:</label>
            <input
              className={cx("register-item-input")}
              name="password"
              type={showPassword ? "password" : "text"}
              onChange={handleOnChange}
            />
            {data.password.length > 0 && (
              <div className={cx("register-item-icon")} onClick={handleShowPassword}>
                {showPassword ? <BiHide /> : <BiShow />}
              </div>
            )}
          </div>
          {/* confirm password */}
          <div className={cx("register-item")}>
            <label className={cx("register-item-label")}>Nhập lại mật khẩu:</label>
            <input
              className={cx("register-item-input")}
              name="confirmPassword"
              type={showConfirmPassword ? "password" : "text"}
              onChange={handleOnChange}
            />
            {data.confirmPassword.length > 0 && (
              <div className={cx("register-item-icon")} onClick={handleShowConfirmPassword}>
                {showConfirmPassword ? <BiHide /> : <BiShow />}
              </div>
            )}
          </div>
          <button onClick={handleSubmit} type="submit" className={cx("btnSubmit")}>
            Đăng ký
          </button>
          <div className={cx("login")}>
            <b className={cx("login-question")}>Bạn Đã Có Tài Khoản?</b>
            <Link className={cx("login-link")} to="/login">
              Đăng Nhập Ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
