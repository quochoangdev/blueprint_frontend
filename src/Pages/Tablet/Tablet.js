import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import SliderDefaultLayout from "../../layout/components/SliderDefaultLayout";
import HomePageItem from "../../layout/components/HomePageItem/HomePageItem";
import { readProductFilter } from "../../services/apiUserService";
import { Link } from "react-router-dom";

import styles from "./Tablet.module.scss";
import ReactPaginateBlock from "../../layout/components/ReactPaginateBlock/ReactPaginateBlock";
import config from "../../config";

const cx = classNames.bind(styles);
const Tablet = () => {
  // Pagination
  const [listDataProduct, setListDataProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(0);

  const allCategory = ["Tất cả", "Ipad", "Samsung",];

  const [selectCategory, setSelectCategory] = useState("Tất cả");
  const [sort, setSort] = useState(null);

  // Page
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  // console.log(version?.toLowerCase())

  useEffect(() => {
    fetchProducts("tablet", null, null, null);
    setCurrentLimit(12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchProducts = async (categories, brand, version, sort) => {
    let data = await readProductFilter(currentPage, currentLimit, categories, brand, version, sort);
    setListDataProduct(data?.DT?.products);
    setTotalPages(data?.DT?.totalPages);
  };

  // handle click item category
  const handleClickItemCategory = (category) => {
    setSelectCategory(category);
    fetchProducts("tablet", category?.toLowerCase(), null, sort);
  };

  const handleCategorySelect = (e) => {
    if (e.target.value !== false) {
      setSort(e.target.value);
      fetchProducts("tablet", selectCategory, null, e.target.value);
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
            {selectCategory !== "Tất cả" && <Link className={cx("show-link")} to={`/${config.routes.tablet}/${selectCategory.toLocaleLowerCase()}`}>Xem chi tiết {selectCategory}</Link>}
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

export default Tablet;
