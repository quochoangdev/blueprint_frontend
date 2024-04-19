import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Heart.module.scss";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import { deleteHeart, readProduct } from "../../services/userService";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const HeartItem = (props) => {
  const [productData, setProductData] = useState();

  // Call Api
  useEffect(() => {
    const { ProductId } = props?.product;
    fetchProductForHeart(ProductId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.product]);
  const fetchProductForHeart = async (ProductId) => {
    let data = await readProduct(null, null, null, null, ProductId);
    setProductData(data.DT);
  };
  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
  };

  // handle delete
  const handleDeleteHeart = async (id) => {
    const response = await deleteHeart(id);
    console.log(response);
    if (response.EC === 0) {
      toast.success(response.EM);
      props.fetchProducts();
    } else {
      toast.error(response.EM);
    }
  };
  return (
    <div className={cx("content")}>
      <div className={cx("content-1")}>
        <img src={`${productData && productData?.imageAvatar[0]}`} alt="" />
      </div>
      <div className={cx("content-2")}>
        <div className={cx("heading")}>{productData && productData?.title}</div>
        <div className={cx("address")}>
          Diện tích: {productData && productData?.width * productData?.length}m2
        </div>
        <div className={cx("color")}>Mã sản phẩm: {productData && productData?.productCode}</div>
      </div>
      <div className={cx("content-3")}>{productData && formatNumber(productData?.price)}₫</div>
      <div className={cx("content-4")}>
        <div className={cx("buy")}>
          <Link className={cx("buy-btn")} to={`/`}>
            Mua Ngay
          </Link>
        </div>
      </div>
      <div className={cx("content-5")}>
        <div className={cx("bl-trash")} onClick={() => handleDeleteHeart(productData?.id)}>
          <GoTrash className={cx("trash")} />
        </div>
      </div>
    </div>
  );
};

export default HeartItem;
