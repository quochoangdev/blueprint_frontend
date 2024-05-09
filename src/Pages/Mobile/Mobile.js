import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import SliderDefaultLayout from "../../layout/components/SliderDefaultLayout";
import HomePageItem from "../../layout/components/HomePageItem/HomePageItem";
import { readProduct } from "../../services/apiUserService";
import { Link } from "react-router-dom";

import styles from "./Mobile.module.scss";
import ReactPaginateBlock from "../../layout/components/ReactPaginateBlock/ReactPaginateBlock";

const cx = classNames.bind(styles);
const Mobile = () => {
  // Pagination
  const [listDataProduct, setListDataProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(0);

  const allCategory = ["Tất cả", "IPhone", "Samsung",];

  const [selectCategory, setSelectCategory] = useState("Tất cả");
  const [version, setVersion] = useState(null);
  const [sort, setSort] = useState(null);
  console.log("version", version)
  console.log("sort", sort)
  // Page
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    fetchProducts();
    setCurrentLimit(12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchProducts = async () => {
    let data = await readProduct(currentPage, currentLimit, "mobile", null, null, null);
    const mixArray = (arr) => {
      const equalRandom = () => { return Math.random() - 0.5; }
      return arr.sort(equalRandom);
    }
    const newDataMix = mixArray(data?.DT?.products)
    setListDataProduct(newDataMix);
    setTotalPages(data?.DT?.totalPages);
  };

  // handle click item category
  const handleClickItemCategory = (category) => {
    setVersion(category);
    setSelectCategory(category);
  };

  const handleCategorySelect = (e) => {
    if (e.target.value !== false) {
      setSort(e.target.value);
    } else {
      setSort(null);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <>
        <h1 className={cx("title")}>IPhone</h1>
        <SliderDefaultLayout
          images={["https://shopdunk.com/images/uploaded/banner/banner_thang12/gen10dm.png", "https://shopdunk.com/images/uploaded/banner/banner_thang12/airdm.png", "https://shopdunk.com/images/uploaded/banner/banner_thang12/g9dm.png",]}
        />
        ;
      </>
      <div className={cx("container")}>
        <div className={cx("all-category")}>
          <div className={cx("category-left")}>
            <div className={cx("category")}>
              {allCategory.map((item, index) => {
                return (
                  <div className={cx("category-item", `${item === selectCategory ? "active" : ""}`)} key={index} onClick={() => handleClickItemCategory(item)}>{item}</div>
                );
              })}
            </div>
          </div>
          <div className={cx("category-right")}>
            {selectCategory !== "Tất cả" && <Link className={cx("show-link")} to={`/dien-thoai/${selectCategory.toLocaleLowerCase()}`}>Xem chi tiết {selectCategory}</Link>}
            <select onChange={handleCategorySelect}>
              <option value={false}>Thứ tự hiển thị</option>
              <option value={"title"}>Tên: A đến Z</option>
              <option value={"-title"}>Tên: Z đến A</option>
              <option value={"price"}>Giá thấp đến cao</option>
              <option value={"-price"}>Giá cao đến thấp</option>
            </select>
          </div>
        </div>
        <div className={cx("all-product")}>
          <HomePageItem data={listDataProduct} />
        </div>
      </div>
      {totalPages > 0 && <ReactPaginateBlock handlePageClick={handlePageClick} totalPages={totalPages} />}
    </div>

  );
};

export default Mobile;
