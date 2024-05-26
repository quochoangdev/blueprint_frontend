import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { readProductFilter } from "../../services/apiUserService";
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
  const [dataTablet, setDataTablet] = useState();
  const [dataLaptop, setDataLaptop] = useState();
  const refSlider = useRef();
  // const [dataSearch, setDataSearch] = useState({ type: "", version: "", width: "", length: "", });

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
  // const handleOnChange = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setDataSearch((prev) => { return { ...prev, [name]: value, }; });
  // };
  // const handleSubmitSearch = (e) => { e.preventDefault(); };

  useEffect(() => { fetchProduct() }, [])
  const fetchProduct = async () => {
    let fetchMobile = await readProductFilter(1, 4, "mobile", null, null, null);
    let fetchTablet = await readProductFilter(1, 4, "tablet", null, null, null);
    let fetchLaptop = await readProductFilter(1, 4, "Laptop", null, null, null);
    setDataMobile(fetchMobile?.DT?.products)
    setDataTablet(fetchTablet?.DT?.products)
    setDataLaptop(fetchLaptop?.DT?.products)
  }
  return (
    <>
      <SliderHome />
      <div className={cx("video-slice")}>
        <div className={cx("slice-container")}>
          {/* <form className={cx("search-option")}>
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
            <button
              type="submit"
              className={cx("search-btn")}
              onClick={handleSubmitSearch}
            >
              <FaSearch className={cx("search-btn-icon")} />
            </button>
          </form> */}
          <div className={cx("select-menu")}>
            {/* Mobile */}
            <Link className={cx("item")} to={config.routes.mobile}>
              <div className={cx("img-item")}>
                <MdPhoneIphone className={cx("img")} />
              </div>
              <div className={cx("title-item")}>Điện thoại</div>
            </Link>
            {/* IPad  */}
            <Link className={cx("item")} to={config.routes.tablet}>
              <div className={cx("img-item")}>
                <MdOutlineTabletMac className={cx("img")} />
              </div>
              <div className={cx("title-item")}>Tablet</div>
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
        link={config.routes.mobile}
      />}
      {dataTablet && <HomePageItem
        data={dataTablet}
        length={4}
        title={"Tablet"}
        btn={true}
        link={config.routes.tablet}
      />}
      {dataLaptop && <HomePageItem
        data={dataLaptop}
        length={4}
        title={"Laptop"}
        btn={true}
        link={config.routes.laptop}
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
                "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716227277/ecommerce/j76d5npthy5ggoduthfc.jpg"
              }
            />
            <Feedback
              content={
                "Cảm ơn đội ngũ QuocHoangDev đã hỗ trợ 2 vc có được những mẫu Máy tính bản như ý. Chúc các anh chị luôn khoẻ mạnh và QuocHoangDev ngày càng phát triển hơn"
              }
              img={
                "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716227276/ecommerce/eh1lnl1exifqkdppnlec.jpg"
              }
            />
            <Feedback
              content={
                "Cảm ơn đội ngũ QuocHoangDev đã hỗ trợ 2 vc có được những mẫu Laptop như ý. Chúc các anh chị luôn khoẻ mạnh và QuocHoangDev ngày càng phát triển hơn"
              }
              img={
                "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716227276/ecommerce/aksgfw1v7iveqlbdcyf2.jpg"
              }
            />
            <Feedback
              content={
                "Cảm ơn đội ngũ QuocHoangDev đã hỗ trợ 2 vc có được những mẫu Laptop như ý. Chúc các anh chị luôn khoẻ mạnh và QuocHoangDev ngày càng phát triển hơn"
              }
              img={
                "https://res.cloudinary.com/dqhj1sukr/image/upload/v1716227276/ecommerce/sprrvqqwwfwpwcrqtmn5.jpg"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
