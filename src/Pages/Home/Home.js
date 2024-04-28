import React, { useEffect, useRef, useState, version } from "react";
import { Link } from "react-router-dom";
import { readProduct } from "../../services/apiUserService";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { MdPhoneIphone, MdOutlineTabletMac } from "react-icons/md";
import { FaLaptop, FaSearch } from "react-icons/fa";
import SliderHome from "../../layout/components/SliderHome";
import HomePageItem from "../../layout/components/HomePageItem";
import Feedback from "./Feedback";
import config from "../../config";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

const Home = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [dataMobile, setDataMobile] = useState();
  const refSlider = useRef();
  const [dataSearch, setDataSearch] = useState({ type: "", version: "", width: "", length: "", });

  // feedback
  const handleLeftSlider = () => {
    refSlider.current.scrollLeft -= 400;
  };
  const handleRightSlider = () => {
    refSlider.current.scrollLeft += 400;
  };

  setInterval(() => {
    if (refSlider?.current?.scrollLeft) { refSlider.current.scrollLeft += 400; }
  }, 4000);

  // search option
  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDataSearch((prev) => { return { ...prev, [name]: value, }; });
  };
  const handleSubmitSearch = (e) => { e.preventDefault(); };

  useEffect(() => { fetchProduct() }, [])
  const fetchProduct = async () => {
    const response = await readProduct()
    if (response) {
      setDataMobile(response?.DT)
    }
  }
  return (
    <>
      <SliderHome />
      <div className={cx("video-slice")}>
        <div className={cx("slice-container")}>
          <form className={cx("search-option")}>
            {/* L o a i */}
            <div className={cx("search-item")}>
              <label className={cx("search-title")}>Loại</label>
              <select
                className={cx("search-select")}
                name="type"
                onChange={handleOnChange}
              >
                <option>-- chọn --</option>
                <option>Laptop</option>
                <option>IPad</option>
                <option>Điện thoại</option>
              </select>
            </div>
            {/* version */}
            <div className={cx("search-item")}>
              <label className={cx("search-title")}>Phiên bản</label>
              <select
                className={cx("search-select")}
                name="version"
                onChange={handleOnChange}
              >
                <option>-- chọn --</option>
                <option>IPhone 10</option>
                <option>IPhone 11</option>
              </select>
            </div>
            {/* Chiều rộng */}
            {/* <div className={cx("search-item")}>
              <label className={cx("search-title")}>Chiều rộng</label>
              <select
                className={cx("search-select")}
                name="width"
                onChange={handleOnChange}
              >
                <option>Chọn số mét</option>
                <option>3 mét</option>
                <option>4 mét</option>
              </select>
            </div> */}
            {/* Chiều dài */}
            {/* <div className={cx("search-item")}>
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
            </div> */}
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
            <Link className={cx("item")} to={config.routes.mobile}>
              <div className={cx("img-item")}>
                <MdPhoneIphone className={cx("img")} />
              </div>
              <div className={cx("title-item")}>Điện thoại</div>
            </Link>
            {/* IPad  */}
            <Link className={cx("item")} to={config.routes.ipad}>
              <div className={cx("img-item")}>
                <MdOutlineTabletMac className={cx("img")} />
              </div>
              <div className={cx("title-item")}>IPad</div>
            </Link>
            {/* Laptop */}
            <Link className={cx("item")} to={config.routes.laptop}>
              <div className={cx("img-item")}>
                <FaLaptop className={cx("img")} />
              </div>
              <div className={cx("title-item")}>Laptop</div>
            </Link>
          </div>
        </div>
      </div>
      {dataMobile && <HomePageItem
        data={dataMobile}
        length={4}
        title={"Điện thoại"}
        btn={true}
        link={"/"}
      />}
      {dataMobile && <HomePageItem
        data={dataMobile}
        length={4}
        title={"IPad"}
        btn={true}
        link={"/"}
      />}
      {dataMobile && <HomePageItem
        data={dataMobile}
        length={4}
        title={"Laptap"}
        btn={true}
        link={"/"}
      />}
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
                "Cảm ơn đội ngũ QuocHoangDev đã hỗ trợ 2 vc có được những mẫu điện thoại như ý. Chúc các anh chị luôn khoẻ mạnh và QuocHoangDev ngày càng phát triển hơn"
              }
              img={
                "https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/411259879_1512266179566114_696488175276542422_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=-JKTBo5n-MkAX_1qmUJ&_nc_ht=scontent.fdad1-1.fna&oh=00_AfB69HmJSrYEpXzA3UuSRUty0qLmEmR17aWCdWRSxHLfmw&oe=65C8FEDE"
              }
            />
            <Feedback
              content={
                "Cảm ơn đội ngũ QuocHoangDev đã hỗ trợ 2 vc có được những mẫu điện thoại như ý. Chúc các anh chị luôn khoẻ mạnh và QuocHoangDev ngày càng phát triển hơn"
              }
              img={
                "https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/411259879_1512266179566114_696488175276542422_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=-JKTBo5n-MkAX_1qmUJ&_nc_ht=scontent.fdad1-1.fna&oh=00_AfB69HmJSrYEpXzA3UuSRUty0qLmEmR17aWCdWRSxHLfmw&oe=65C8FEDE"
              }
            />
            <Feedback
              content={
                "Cảm ơn đội ngũ QuocHoangDev đã hỗ trợ 2 vc có được những mẫu điện thoại như ý. Chúc các anh chị luôn khoẻ mạnh và QuocHoangDev ngày càng phát triển hơn"
              }
              img={
                "https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/411259879_1512266179566114_696488175276542422_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=-JKTBo5n-MkAX_1qmUJ&_nc_ht=scontent.fdad1-1.fna&oh=00_AfB69HmJSrYEpXzA3UuSRUty0qLmEmR17aWCdWRSxHLfmw&oe=65C8FEDE"
              }
            />
            <Feedback
              content={
                "Cảm ơn đội ngũ QuocHoangDev đã hỗ trợ 2 vc có được những mẫu điện thoại như ý. Chúc các anh chị luôn khoẻ mạnh và QuocHoangDev ngày càng phát triển hơn"
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
