import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import { deleteCart, readCartTotal, readJWT, readProductId } from "../../services/apiUserService";
import { toast } from "react-toastify";
import jwtDecode from "../../routes/jwtDecode";
import { CountCartContext } from "../../hooks/DataContext";

const cx = classNames.bind(styles);

const CartItem = (props) => {
  const [userLogin, setUserLogin] = useState()
  const { setCountCart } = useContext(CountCartContext)
  const firstImageColor = Object.keys(props?.product?.image)[0]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchJWT(); }, []);
  const fetchJWT = async () => {
    let decoded = false
    const resJWT = await readJWT();
    if (resJWT?.DT?.jwt) {
      decoded = await jwtDecode(resJWT?.DT?.jwt)
      fetchCartWithId(decoded?.user?.id)
    }
    setUserLogin(decoded)
  };
  const fetchCartWithId = async (idUser) => {
    const fetchCart = await readCartTotal(idUser)
    setCountCart(fetchCart.DT)
  }



  // handle delete
  const handleDeleteCart = async (id) => {
    const idUser = userLogin?.user?.id
    const idProduct = id
    const fetchCart = await deleteCart(idUser, idProduct);
    if (fetchCart.EC === 0) {
      toast.success(fetchCart.EM);
      props.fetchProducts();
      fetchJWT()
    } else {
      toast.error(fetchCart.EM);
    }
  };

  const formatNumber = (number) => { return number.toLocaleString("vi-VN"); };

  return (
    <div className={cx("content")}>
      <div className={cx("content-1")}>
        {props?.product?.image && <img src={props?.product?.image[firstImageColor][0]} alt="error" />}
      </div>
      <div className={cx("content-2")}>
        <div className={cx("heading")}>{props?.product?.title}</div>
        <div className={cx("address")}>
          Dung lượng: {props?.product?.capacity}
        </div>
        <div className={cx("color")}>Màu: {props?.product?.color}</div>
      </div>
      <div className={cx("content-3")}>{props?.product && formatNumber(props?.product?.price)}₫</div>
      <div className={cx("content-4")}>
        <div className={cx("buy")}>
          <Link className={cx("buy-btn")} to={`/`}>
            Mua Ngay
          </Link>
        </div>
      </div>
      <div className={cx("content-5")}>
        <div className={cx("bl-trash")} onClick={() => handleDeleteCart(props?.product?.id)}>
          <GoTrash className={cx("trash")} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
