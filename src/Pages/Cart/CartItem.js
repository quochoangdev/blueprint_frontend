import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import { deleteCart, readProductId } from "../../services/apiUserService";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const CartItem = (props) => {
  const [productData, setProductData] = useState();

  // Call Api
  useEffect(() => {
    const { ProductId } = props?.product;
    fetchProductForCart(ProductId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.product]);
  const fetchProductForCart = async (ProductId) => {
    let data = await readProductId(null, null, ProductId);
    setProductData(data.DT);
  };
  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
  };

  // handle delete
  const handleDeleteCart = async (id) => {
    const response = await deleteCart(id);
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
        <img src={`${productData && productData?.image[0]}`} alt="" />
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
        <div className={cx("bl-trash")} onClick={() => handleDeleteCart(productData?.id)}>
          <GoTrash className={cx("trash")} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
