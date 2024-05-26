import classNames from "classnames/bind";
import { FaFacebookF } from "react-icons/fa";
import { SiYoutube, SiZalo } from "react-icons/si";
// import { AiOutlineMail } from "react-icons/ai";

//
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import config from "../../../config";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("wrapper")}>
      <div className={cx("footer")}>
        <div className={cx("information")}>
          <div className={cx("footer-upper")}>
            <div className={cx("upper-follow-us")}>
              <div className={cx("follow-us-logo")}>
                <Link className={cx("logo-link")} to="/"><div className={cx("logo")}>QHDev</div></Link>
              </div>
              <div className={cx("topic-block")}>
                Năm 2020, QuocHoangDev trở thành đại lý có tiềm năng. Chúng tôi phát
                triển chuỗi cửa hàng tiêu chuẩn và QuocHoangDev nhằm mang đến trải
                nghiệm tốt nhất về sản phẩm và dịch vụ của QuocHoangDev cho người dùng
                Việt Nam.
              </div>
              <div className={cx("social")}>
                <Link className={cx("social-facebook")} to="https://www.facebook.com/quochoang.pham.3701"><FaFacebookF /></Link>
                <Link className={cx("social-youtube")} to="https://www.youtube.com/"><SiYoutube /></Link>
                <Link className={cx("social-zalo")} to="https://www.facebook.com/quochoang.pham.3701"><SiZalo /></Link>
              </div>
            </div>
            {/*  */}
            <div className={cx("upper-information")}>
              <div className={cx("title")}>Danh Mục</div>
              <div className={cx("list")}>
                <Link className={cx("list-item")} to={`/${config.routes.mobile}`}>Điện thoại</Link>
                <Link className={cx("list-item")} to={`/${config.routes.tablet}`}>Tablet</Link>
                <Link className={cx("list-item")} to={`/${config.routes.laptop}`}>Laptop</Link>
                <span className={cx("list-item")} >Phản Hồi</span>
                <span className={cx("list-item")} >Tuyển Dụng</span>
              </div>
            </div>
            {/*  */}
            <div className={cx("upper-customer-service")}>
              <div className={cx("title")}>Chính sách</div>
              <div className={cx("list")}>
                <span className={cx("list-item")}>Giao hàng</span>
                <span className={cx("list-item")}>Giao hàng (ZaloPay)</span>
                <span className={cx("list-item")}>Huỷ giao dịch</span>
                <span className={cx("list-item")}>Đổi trả</span>
                <span className={cx("list-item")}>Bảo hành</span>
              </div>
            </div>
            {/*  */}
            <div className={cx("upper-my-account")}>
              <div className={cx("title")}>Địa chỉ & Liên hệ</div>
              <div className={cx("list")}>
                <Link className={cx("list-item")} to={`/${config.routes.profile}`}>Tài khoản của tôi</Link>
                <Link className={cx("list-item")} to={`/${config.routes.order}`}>Đơn đặt hàng</Link>
                <Link className={cx("list-item")} to="/">Hệ thống cửa hàng</Link>
                <Link className={cx("list-item")} to="tel:0971955144">Mua Hàng: 0971955144</Link>
                <span className={cx("list-item-location")}>Chi nhánh 1: khu vực Hà Nội và các tỉnh phía bắc</span>
                <Link className={cx("list-item")} to="tel:0971955144">Doanh nghiệp:{" "}<span className={cx("list-item-tel")}>0971.955.144</span></Link>
              </div>
            </div>
          </div>
          {/*  */}
          <div className={cx("footer-lower")}>
            <div className={cx("disclaimer")}>
              © 2016 Công ty Cổ Phần HESMAN Việt Nam GPDKKD: 0107465657 do Sở KH
              & ĐT TP. Hà Nội cấp
              <hr />
              ngày 08/06/2016. Địa chỉ: Số 76 Thái Hà, phường Trung Liệt, quận
              Đống Đa, thành phố Hà Nội, Việt Nam
              <hr />
              Đại diện pháp luật: PHẠM MẠNH HÒA | ĐT: 0247.305.9999 | Email:
              lienhe@shopdunk.com
            </div>
            <div className={cx("confirm")}>
              <Link className={cx("confirm-link")} to="http://online.gov.vn/(X(1)S(jfktnnku5rui3vjf5pnk4sgc))/Home/WebDetails/34144?AspxAutoDetectCookieSupport=1">
                <img className={cx("confirm-image")} src="https://shopdunk.com/images/uploaded-source/Trang%20ch%E1%BB%A7/Bocongthuong.png" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
