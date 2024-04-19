import classNames from "classnames/bind";
import { FaFacebookF } from "react-icons/fa";
import { SiYoutube, SiZalo } from "react-icons/si";
// import { AiOutlineMail } from "react-icons/ai";

//
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("wrapper")}>
      <div className={cx("footer")}>
        {/*  */}
        <div className={cx("information")}>
          {/*  */}
          <div className={cx("footer-upper")}>
            {/*  */}
            <div className={cx("upper-follow-us")}>
              <div className={cx("follow-us-logo")}>
                <a className={cx("logo-link")} href="/">
                  <img
                    className={cx("logo")}
                    src="https://res.cloudinary.com/daofedrqe/image/upload/v1707379342/wanfit_apple_imageAvt/mhf6siicj77fofhuvfcm.png"
                    alt="logo"
                  />
                </a>
              </div>
              <div className={cx("topic-block")}>
                Năm 2020, WanFit trở thành đại lý có tiềm năng. Chúng tôi phát triển chuỗi cửa hàng
                tiêu chuẩn và WanFit nhằm mang đến trải nghiệm tốt nhất về sản phẩm và dịch vụ của
                WanFit cho người dùng Việt Nam.
              </div>
              <div className={cx("social")}>
                <a
                  className={cx("social-facebook")}
                  href="https://www.facebook.com/quochoang.pham.3701"
                >
                  <FaFacebookF />
                </a>
                <a className={cx("social-youtube")} href="https://www.youtube.com/">
                  <SiYoutube />
                </a>
                <a
                  className={cx("social-zalo")}
                  href="https://www.facebook.com/quochoang.pham.3701"
                >
                  <SiZalo />
                </a>
              </div>
            </div>
            {/*  */}
            <div className={cx("upper-information")}>
              <div className={cx("title")}>Dự án</div>
              <div className={cx("list")}>
                <a className={cx("list-item")} href="/">
                  Nhà cấp 4 đẹp
                </a>
                <a className={cx("list-item")} href="/">
                  Nhà phố đẹp
                </a>
                <a className={cx("list-item")} href="/">
                  Nhà 2 tầng
                </a>
                <a className={cx("list-item")} href="/">
                  Nhà 3 tầng
                </a>
                <a className={cx("list-item")} href="/">
                  Nhà 4 tầng
                </a>
                <a className={cx("list-item")} href="/">
                  Nhà 5 tầng
                </a>
                <a className={cx("list-item")} href="/">
                  Nhà 6 tầng
                </a>
                <a className={cx("list-item")} href="/">
                  Mẫu biệt thự đẹp
                </a>
                <a className={cx("list-item")} href="/">
                  Mẫu khách sạn đẹp
                </a>
              </div>
            </div>
            {/*  */}
            <div className={cx("upper-customer-service")}>
              <div className={cx("title")}>Chính sách</div>
              <div className={cx("list")}>
                <a className={cx("list-item")} href="/">
                  Giao hàng
                </a>
                <a className={cx("list-item")} href="/">
                  Giao hàng (ZaloPay)
                </a>
                <a className={cx("list-item")} href="/">
                  Huỷ giao dịch
                </a>
                <a className={cx("list-item")} href="/">
                  Đổi trả
                </a>
                <a className={cx("list-item")} href="/">
                  Bảo hành
                </a>
                <a className={cx("list-item")} href="/">
                  Dịch vụ
                </a>
                <a className={cx("list-item")} href="/">
                  Giải quyết khiếu nại
                </a>
                <a className={cx("list-item")} href="/">
                  Bảo mật thông tin
                </a>
                <a className={cx("list-item")} href="/">
                  Hướng dẫn thanh toán qua VNPAY
                </a>
              </div>
            </div>
            {/*  */}
            <div className={cx("upper-my-account")}>
              <div className={cx("title")}>Địa chỉ & Liên hệ</div>
              <div className={cx("list")}>
                <a className={cx("list-item")} href="/">
                  Tài khoản của tôi
                </a>
                <a className={cx("list-item")} href="/">
                  Đơn đặt hàng
                </a>
                <a className={cx("list-item")} href="/">
                  Hệ thống cửa hàng
                </a>
                <a className={cx("list-item")} href="/">
                  Mua Hàng: 0971955144
                </a>
                <span className={cx("list-item-location")}>
                  Chi nhánh 1: khu vực Hà Nội và các tỉnh phía bắc
                </span>
                <span className={cx("list-item-location")}>
                  Chi nhánh 2: khu vực Hồ Chí Minh và các tỉnh phía nam
                </span>
                <a className={cx("list-item")} href="/">
                  Doanh nghiệp: <span className={cx("list-item-tel")}>0971.955.144</span>
                </a>
              </div>
            </div>
          </div>
          {/*  */}
          <div className={cx("footer-lower")}>
            <div className={cx("disclaimer")}>
              © 2016 Công ty Cổ Phần HESMAN Việt Nam GPDKKD: 0107465657 do Sở KH & ĐT TP. Hà Nội cấp
              <hr />
              ngày 08/06/2016. Địa chỉ: Số 76 Thái Hà, phường Trung Liệt, quận Đống Đa, thành phố Hà
              Nội, Việt Nam
              <hr />
              Đại diện pháp luật: PHẠM MẠNH HÒA | ĐT: 0247.305.9999 | Email: lienhe@shopdunk.com
            </div>
            <div className={cx("confirm")}>
              <a
                className={cx("confirm-link")}
                href="http://online.gov.vn/(X(1)S(jfktnnku5rui3vjf5pnk4sgc))/Home/WebDetails/34144?AspxAutoDetectCookieSupport=1"
              >
                <img
                  className={cx("confirm-image")}
                  src="https://shopdunk.com/images/uploaded-source/Trang%20ch%E1%BB%A7/Bocongthuong.png"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
