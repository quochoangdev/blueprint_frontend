import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import config from "../../../config";
import { useEffect, useState } from "react";
import { readJWT } from "../../../services/apiUserService";
import jwtDecode from "../../../routes/jwtDecode";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const User = ({ icon }) => {
  const [userLogin, setUserLogin] = useState()

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => { fetchJWT(); }, []);
  const fetchJWT = async () => {
    let decoded = false
    const resJWT = await readJWT();
    if (resJWT?.DT?.jwt) { decoded = await jwtDecode(resJWT?.DT?.jwt) }
    setUserLogin(decoded)
  };

  return (
    <div className={cx("social-category-user")}>
      {!!userLogin === true ? (
        <div className={cx("social-category-link")}>{icon}</div>
      ) : (
        <Link className={cx("social-category-link")} to={`/${config.routes.login}`}>
          {icon}
        </Link>
      )}

      <div className={cx("subnav-user")}>
        {/* no user */}
        {(!!userLogin === false) && (
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
        {!!userLogin === true && userLogin?.groupWithRoles?.name === "Customer" && (
          <>
            <div className={cx("subnav-user-link")}>
              {userLogin?.user?.lastName}{" "}{userLogin?.user?.firstName}{" "}{`(${userLogin?.groupWithRoles?.name})`}
            </div>
            <Link className={cx("subnav-user-link")} to={`/${config.routes.logout}`}>
              Đăng xuất
            </Link>
          </>
        )}
        {/* Dev */}
        {!!userLogin === true && userLogin?.groupWithRoles?.name === "Dev" && (
          <>
            <div className={cx("subnav-user-link")}>
              {userLogin?.user?.lastName}{" "}{userLogin?.user?.firstName}{" "}{`(${userLogin?.groupWithRoles?.name})`}
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
        {!!userLogin === true && userLogin?.groupWithRoles?.name === "Leader" && (
          <>
            <div className={cx("subnav-user-link")}>
              {userLogin?.user?.lastName}{" "}{userLogin?.user?.firstName}{" "}{`(${userLogin?.groupWithRoles?.name})`}
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
