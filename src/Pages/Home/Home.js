import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import config from "../../config";
import Feedback from "./Feedback";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { readProduct } from "../../services/userService";
import { MdPhoneIphone, MdOutlineTabletMac } from "react-icons/md";
import { FaLaptop } from "react-icons/fa";
import SliderHome from "../../layout/components/SliderHome";
import HomePageItem from "../../layout/components/HomePageItem";

const cx = classNames.bind(styles);

const Home = () => {
  const [dataMobile, setDataMobile] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const refSlider = useRef();
  const [data, setData] = useState({
    kindOfHouse: "",
    roomNumber: "",
    width: "",
    length: "",
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleLeftSlider = () => {
    refSlider.current.scrollLeft -= 400;
  };
  const handleRightSlider = () => {
    refSlider.current.scrollLeft += 400;
  };
  setInterval(() => {
    if (refSlider && refSlider.current && refSlider.current.scrollLeft) {
      refSlider.current.scrollLeft += 400;
    }
  }, 4000);
  const handleSubmitSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <SliderHome />
      <div className={cx("video-slice")}>
        <div className={cx("slice-container")}>
          <form className={cx("search-option")}>
            {/* Loại nhà */}
            <div className={cx("search-item")}>
              <label className={cx("search-title")}>Loại nhà</label>
              <select
                className={cx("search-select")}
                name="kindOfHouse"
                onChange={handleOnChange}
              >
                <option>Chọn loại nhà</option>
                <option>Nhà cấp 4</option>
                <option>Nhà 2 Tầng</option>
                <option>Nhà 3 Tầng</option>
                <option>Nhà 4 Tầng</option>
                <option>Nhà 5 Tầng</option>
                <option>Nhà 6 Tầng</option>
                <option>Mẫu biệt thự đẹp</option>
                <option>Mẫu khách sạn đẹp</option>
              </select>
            </div>
            {/* Số phòng ngủ */}
            <div className={cx("search-item")}>
              <label className={cx("search-title")}>Số phòng ngủ</label>
              <select
                className={cx("search-select")}
                name="roomNumber"
                onChange={handleOnChange}
              >
                <option>Chọn số lượng</option>
                <option>1 phòng</option>
                <option>2 phòng</option>
                <option>3 phòng</option>
                <option>4 phòng</option>
                <option>5 phòng</option>
                <option>6 phòng</option>
                <option>7 phòng</option>
                <option>8 phòng</option>
              </select>
            </div>
            {/* Chiều rộng */}
            <div className={cx("search-item")}>
              <label className={cx("search-title")}>Chiều rộng</label>
              <select
                className={cx("search-select")}
                name="width"
                onChange={handleOnChange}
              >
                <option>Chọn số mét</option>
                <option>3 mét</option>
                <option>4 mét</option>
                <option>5 mét</option>
                <option>6 mét</option>
                <option>7 mét</option>
                <option>8 mét</option>
                <option>9 mét</option>
                <option>10 mét</option>
              </select>
            </div>
            {/* Chiều dài */}
            <div className={cx("search-item")}>
              <label className={cx("search-title")}>Chiều dài</label>
              <select
                className={cx("search-select")}
                name="length"
                onChange={handleOnChange}
              >
                <option>Chọn số mét</option>
                <option>10 mét</option>
                <option>15 mét</option>
                <option>20 mét</option>
                <option>25 mét</option>
                <option>30 mét</option>
              </select>
            </div>
            <button
              type="submit"
              className={cx("search-btn")}
              onClick={handleSubmitSearch}
            >
              <FaSearch className={cx("search-btn-icon")} />
            </button>
          </form>
          <div className={cx("select-menu")}>
            {/* Mobile */}
            <Link className={cx("item")} to={config.routes.nhaCap4Dep}>
              <div className={cx("img-item")}>
                <MdPhoneIphone className={cx("img")} />
              </div>
              <div className={cx("title-item")}>Điện thoại</div>
            </Link>
            {/* IPad  */}
            <Link className={cx("item")} to={config.routes.nhaPhoDep}>
              <div className={cx("img-item")}>
                <MdOutlineTabletMac className={cx("img")} />
              </div>
              <div className={cx("title-item")}>Nhà phố đẹp</div>
            </Link>
            {/* Laptop */}
            <Link className={cx("item")} to={config.routes.mauBietThuDep}>
              <div className={cx("img-item")}>
                <FaLaptop className={cx("img")} />
              </div>
              <div className={cx("title-item")}>Laptop</div>
            </Link>
          </div>
        </div>
      </div>
      <HomePageItem
        data={dataMobile}
        length={4}
        title={"Mobile"}
        btn={true}
        link={"/"}
      />
      <div className={cx("bg-feedback")}>
        <div className={cx("feedback")}>
          <div className={cx("heading")}>Phản hồi của khách hàng</div>
          <div className={cx("slider")} ref={refSlider}>
            <div className={cx("slider-left-icon")} onClick={handleLeftSlider}>
              <FaCircleChevronLeft />
            </div>
            <div
              className={cx("slider-right-icon")}
              onClick={handleRightSlider}
            >
              <FaCircleChevronRight />
            </div>
            <Feedback
              content={
                "Cảm ơn đội ngũ SBS đã hỗ trợ 2 vc có được thiết kế ngôi nhà như ý. Chúc các anh chị luôn khoẻ mạnh và SBS ngày càng phát triển hơn"
              }
              img={
                "https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/411259879_1512266179566114_696488175276542422_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=-JKTBo5n-MkAX_1qmUJ&_nc_ht=scontent.fdad1-1.fna&oh=00_AfB69HmJSrYEpXzA3UuSRUty0qLmEmR17aWCdWRSxHLfmw&oe=65C8FEDE"
              }
            />
            <Feedback
              content={
                "Cảm ơn đội ngũ SBS đã hỗ trợ 2 vc có được thiết kế ngôi nhà như ý. Chúc các anh chị luôn khoẻ mạnh và SBS ngày càng phát triển hơn"
              }
              img={
                "https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/411259879_1512266179566114_696488175276542422_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=-JKTBo5n-MkAX_1qmUJ&_nc_ht=scontent.fdad1-1.fna&oh=00_AfB69HmJSrYEpXzA3UuSRUty0qLmEmR17aWCdWRSxHLfmw&oe=65C8FEDE"
              }
            />
            <Feedback
              content={
                "Cảm ơn đội ngũ SBS đã hỗ trợ 2 vc có được thiết kế ngôi nhà như ý. Chúc các anh chị luôn khoẻ mạnh và SBS ngày càng phát triển hơn"
              }
              img={
                "https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/411259879_1512266179566114_696488175276542422_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=-JKTBo5n-MkAX_1qmUJ&_nc_ht=scontent.fdad1-1.fna&oh=00_AfB69HmJSrYEpXzA3UuSRUty0qLmEmR17aWCdWRSxHLfmw&oe=65C8FEDE"
              }
            />
            <Feedback
              content={
                "Cảm ơn đội ngũ SBS đã hỗ trợ 2 vc có được thiết kế ngôi nhà như ý. Chúc các anh chị luôn khoẻ mạnh và SBS ngày càng phát triển hơn"
              }
              img={
                "https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/411259879_1512266179566114_696488175276542422_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=-JKTBo5n-MkAX_1qmUJ&_nc_ht=scontent.fdad1-1.fna&oh=00_AfB69HmJSrYEpXzA3UuSRUty0qLmEmR17aWCdWRSxHLfmw&oe=65C8FEDE"
              }
            />
            <Feedback
              content={
                "Cảm ơn đội ngũ SBS đã hỗ trợ 2 vc có được thiết kế ngôi nhà như ý. Chúc các anh chị luôn khoẻ mạnh và SBS ngày càng phát triển hơn"
              }
              img={
                "https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/411259879_1512266179566114_696488175276542422_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=-JKTBo5n-MkAX_1qmUJ&_nc_ht=scontent.fdad1-1.fna&oh=00_AfB69HmJSrYEpXzA3UuSRUty0qLmEmR17aWCdWRSxHLfmw&oe=65C8FEDE"
              }
            />
            <Feedback
              content={
                "Cảm ơn đội ngũ SBS đã hỗ trợ 2 vc có được thiết kế ngôi nhà như ý. Chúc các anh chị luôn khoẻ mạnh và SBS ngày càng phát triển hơn"
              }
              img={
                "https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/411259879_1512266179566114_696488175276542422_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=-JKTBo5n-MkAX_1qmUJ&_nc_ht=scontent.fdad1-1.fna&oh=00_AfB69HmJSrYEpXzA3UuSRUty0qLmEmR17aWCdWRSxHLfmw&oe=65C8FEDE"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
