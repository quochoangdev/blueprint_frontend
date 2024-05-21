import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import SliderDefaultLayout from "../../layout/components/SliderDefaultLayout";
import HomePageItem from "../../layout/components/HomePageItem/HomePageItem";
import { readProductFilter } from "../../services/apiUserService";

import styles from "./MacBook.module.scss";
import ReactPaginateBlock from "../../layout/components/ReactPaginateBlock/ReactPaginateBlock";

const cx = classNames.bind(styles);
const MacBook = () => {

  // Pagination
  const [listDataProduct, setListDataProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(0);

  const allVersion = [{ key: "Tất cả", value: "" }, { key: "MacBook Air M3", value: "air" }, { key: "MacBook Pro M3", value: "pro" }];

  const [selectVersion, setSelectVersion] = useState("Tất cả");

  const [sort, setSort] = useState(null);
  const [version, setVersion] = useState(null);

  // Page
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    fetchProducts("laptop", "macbook", null, null);
    setCurrentLimit(12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);


  const fetchProducts = async (categories, brand, version, sort) => {
    let data = await readProductFilter(currentPage, currentLimit, categories, brand, version, sort);
    setListDataProduct(data?.DT?.products);
    setTotalPages(data?.DT?.totalPages);
  };

  // handle click item category
  const handleClickItemCategory = (key, value) => {
    setSelectVersion(key);
    setVersion(value)
    fetchProducts("laptop", "macbook", value, sort);
  };

  const handleCategorySelect = async (e) => {
    if (e.target.value !== false) {
      setSort(e.target.value);
      fetchProducts("laptop", "macbook", version, e.target.value);
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
              {allVersion.map((item, index) => {
                return (
                  <div className={cx("category-item", `${item?.key === selectVersion ? "active" : ""}`)} key={index} onClick={() => handleClickItemCategory(item?.key, item?.value)}>{item?.key}</div>
                );
              })}
            </div>
          </div>
          <div className={cx("category-right")}>
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

export default MacBook;
