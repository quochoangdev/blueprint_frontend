import classNames from "classnames/bind";
import { Link } from "react-router-dom";
//
import config from "../../../config";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { readJWT } from "../../../services/userService";

const cx = classNames.bind(styles);

const User = ({ icon }) => {
  const [dataUsers, setDataUsers] = useState();
  const [cookie, setCookie] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Get localStorage
    const user = JSON.parse(localStorage.getItem("dataUsers"));
    setDataUsers(user);
    // Call api JWT
    fetchJWT();
  }, []);

  const fetchJWT = async () => {
    const resJWT = await readJWT();
    setCookie(resJWT?.DT?.jwt);
  };

  return (
    <div className={cx("social-category-user")}>
      {!!dataUsers === true && !!cookie === true ? (
        <div className={cx("social-category-link")}>{icon}</div>
      ) : (
        <Link className={cx("social-category-link")} to={`/${config.routes.login}`}>
          {icon}
        </Link>
      )}

      <div className={cx("subnav-user")}>
        {/* no user */}
        {(!!dataUsers === false || !!cookie === false || (!!dataUsers === !!cookie) === false) && (
          <>
            <Link className={cx("subnav-user-link")} to={`/${config.routes.register}`}>
              Tạo tài khoản ngay
            </Link>
            <Link className={cx("subnav-user-link")} to={`/${config.routes.login}`}>
              Đăng nhập
            </Link>
          </>
        )}
        {/* Customer */}
        {!!dataUsers === true && dataUsers?.currentRoleName === "Customer" && !!cookie === true && (
          <>
            <div className={cx("subnav-user-link")}>
              {dataUsers?.currentDataUsers?.lastName} {dataUsers?.currentDataUsers?.firstName}{" "}
              {`(${dataUsers?.currentRoleName})`}
            </div>
            <Link className={cx("subnav-user-link")} to={`/${config.routes.logout}`}>
              Đăng xuất
            </Link>
          </>
        )}
        {/* Dev */}
        {!!dataUsers === true && dataUsers?.currentRoleName === "Dev" && !!cookie === true && (
          <>
            <div className={cx("subnav-user-link")}>
              {dataUsers?.currentDataUsers?.lastName} {dataUsers?.currentDataUsers?.firstName}{" "}
              {`(${dataUsers?.currentRoleName})`}
            </div>
            <Link className={cx("subnav-user-link")} to={`/${config.routes.homeAdmin}`}>
              Quản lý website (limit)
            </Link>
            <Link className={cx("subnav-user-link")} to={`/${config.routes.logout}`}>
              Đăng xuất
            </Link>
          </>
        )}
        {/* Leader */}
        {!!dataUsers === true && dataUsers?.currentRoleName === "Leader" && !!cookie === true && (
          <>
            <div className={cx("subnav-user-link")}>
              {dataUsers?.currentDataUsers?.lastName} {dataUsers?.currentDataUsers?.firstName}{" "}
              {`(${dataUsers?.currentRoleName})`}
            </div>
            <Link className={cx("subnav-user-link")} to={`/${config.routes.homeAdmin}`}>
              Quản lý website
            </Link>
            <Link className={cx("subnav-user-link")} to={`/${config.routes.logout}`}>
              Đăng xuất
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
