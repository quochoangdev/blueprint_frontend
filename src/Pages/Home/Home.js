import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import config from "../../config";
import Feedback from "./Feedback";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import ProductItemBlock from "../../layout/components/ProductItemBlock/ProductItemBlock";
import { readProduct } from "../../services/userService";

const cx = classNames.bind(styles);

const Home = () => {
  const [listDataProduct, setListDataProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

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

  // Call api product
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    fetchProducts();
    setCurrentLimit(8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchProducts = async () => {
    let data = await readProduct(currentPage, currentLimit);
    setListDataProduct(data);
    setTotalPages(data?.DT?.totalPages);
  };

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
      {/*  */}
      <div className={cx("video-block")}>
        <video className={cx("video-source")} autoPlay={true} muted loop>
          <source
            src="https://res.cloudinary.com/daofedrqe/video/upload/v1707379911/wanfit_apple_imageAvt/b1gvsn5jsoy2mfln0rgi.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      {/*  */}
      <div className={cx("video-slice")}>
        <div className={cx("slice-container")}>
          <form className={cx("search-option")}>
            {/* Loại nhà */}
            <div className={cx("search-item")}>
              <label className={cx("search-title")}>Loại nhà</label>
              <select className={cx("search-select")} name="kindOfHouse" onChange={handleOnChange}>
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
              <select className={cx("search-select")} name="roomNumber" onChange={handleOnChange}>
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
              <select className={cx("search-select")} name="width" onChange={handleOnChange}>
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
              <select className={cx("search-select")} name="length" onChange={handleOnChange}>
                <option>Chọn số mét</option>
                <option>10 mét</option>
                <option>15 mét</option>
                <option>20 mét</option>
                <option>25 mét</option>
                <option>30 mét</option>
              </select>
            </div>
            <button type="submit" className={cx("search-btn")} onClick={handleSubmitSearch}>
              <FaSearch className={cx("search-btn-icon")} />
            </button>
          </form>
          <div className={cx("select-menu")}>
            {/* Nhà cấp 4 đẹp */}
            <Link className={cx("item")} to={config.routes.nhaCap4Dep}>
              <div className={cx("img-item")}>
                <img
                  className={cx("img")}
                  src="https://sieuthibanve.com/themes/icons/24.png"
                  alt=""
                />
              </div>
              <div className={cx("title-item")}>Nhà cấp 4 đẹp</div>
              <div className={cx("content-item")}>
                Nhà 1 tầng, 3 gian, được xây dựng phù hợp với không gian ven thành phố, nông thôn
              </div>
            </Link>
            {/* Nhà phố đẹp  */}
            <Link className={cx("item")} to={config.routes.nhaPhoDep}>
              <div className={cx("img-item")}>
                <img
                  className={cx("img")}
                  src="https://sieuthibanve.com/themes/icons/22.png"
                  alt=""
                />
              </div>
              <div className={cx("title-item")}>Nhà phố đẹp</div>
              <div className={cx("content-item")}>
                Là nhà được xây dựng tại những khu đất được chia lô, từ 2 tầng trở lên
              </div>
            </Link>
            {/* Mẫu biệt thự đẹp */}
            <Link className={cx("item")} to={config.routes.mauBietThuDep}>
              <div className={cx("img-item")}>
                <img
                  className={cx("img")}
                  src="https://sieuthibanve.com/themes/icons/26.png"
                  alt=""
                />
              </div>
              <div className={cx("title-item")}>Mẫu biệt thự đẹp</div>
              <div className={cx("content-item")}>
                Tổng hợp những mẫu thiêt kế biệt thự đẹp và hiện đại nhất
              </div>
            </Link>
            {/* Công trình dịch vụ */}
            <Link className={cx("item")} to={config.routes.mauKhachSanDep}>
              <div className={cx("img-item")}>
                <img
                  className={cx("img")}
                  src="https://sieuthibanve.com/themes/icons/21.png"
                  alt=""
                />
              </div>
              <div className={cx("title-item")}>Mẫu khách sạn đẹp</div>
              <div className={cx("content-item")}>
                Tổng hợp những mẫu thiêt kế khách sạn đẹp và hiện đại nhất
              </div>
            </Link>
            {/* Xây dựng trọn gói */}
            <Link className={cx("item")}>
              <div className={cx("img-item")}>
                <img
                  className={cx("img")}
                  src="https://sieuthibanve.com/themes/icons/21.png"
                  alt=""
                />
              </div>
              <div className={cx("title-item")}>Xây dựng trọn gói</div>
              <div className={cx("content-item")}>
                Là dịch vụ xây nhà trọn gói, chìa khóa trao tay
              </div>
            </Link>
            {/* Dự toán công trình */}
            <Link className={cx("item")}>
              <div className={cx("img-item")}>
                <img
                  className={cx("img")}
                  src="https://sieuthibanve.com/themes/icons/25.png"
                  alt=""
                />
              </div>
              <div className={cx("title-item")}>Dự toán công trình</div>
              <div className={cx("content-item")}>
                Công cụ giúp bạn tính toán nhanh chi phí xây dựng, xây dựng cho ngôi nhà của mình
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/*  */}
      <div className={cx("container")}>
        <div className={cx("heading")}>1000 Mẫu thiết kế nhà đẹp ở Việt Nam</div>
        <div className={cx("product-list")}>
          {listDataProduct?.DT?.products.map((product, index) => {
            return <ProductItemBlock key={`product-${index}`} product={product} />;
          })}
        </div>
        <div className={cx("page")}>
          <ReactPaginate
            className={cx("pagination", "hello")}
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="< Prev"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
      <div className={cx("bg-feedback")}>
        <div className={cx("feedback")}>
          <div className={cx("heading")}>Phản hồi của khách hàng</div>
          <div className={cx("slider")} ref={refSlider}>
            <div className={cx("slider-left-icon")} onClick={handleLeftSlider}>
              <FaCircleChevronLeft />
            </div>
            <div className={cx("slider-right-icon")} onClick={handleRightSlider}>
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
