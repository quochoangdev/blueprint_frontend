import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCheckout } from "../../redux/cartSlice";
import styles from "./Cart.module.scss";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import { addCart, deleteCart, readCartTotal, readJWT } from "../../services/apiUserService";
import { toast } from "react-toastify";
import jwtDecode from "../../hooks/jwtDecode";
import { CountCartContext } from "../../hooks/DataContext";
import config from "../../config";
import { MdAdd } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CartItem = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userLogin, setUserLogin] = useState()
  const { setCountCart } = useContext(CountCartContext)
  const [quantity, setQuantity] = useState(props?.product?.quantity)

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

  // handle quantity
  const handleIncrease = async () => {
    setQuantity(prev => prev + 1)
    let currentDataBuy = { ...props?.product, quantity: quantity + 1, idUser: userLogin?.user?.id }
    await addCart(currentDataBuy)
    await props.fetchProducts()
  }
  const handleReduce = async () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
      let currentDataBuy = { ...props?.product, quantity: quantity - 1, idUser: userLogin?.user?.id }
      await addCart(currentDataBuy)
      await props.fetchProducts()
    }
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

  const handleBuy = (e) => {
    const convertToArray = [props?.product]
    e.preventDefault(); dispatch(addCheckout(convertToArray));
    navigate(`/${config.routes.checkout}`)
  };

  const formatNumber = (number) => { return number.toLocaleString("vi-VN"); };

  return (
    <div className={cx("content")} >
      <Link className={cx("content-1")} to={`/${props?.product?.slug}`}>
        {props?.product && <img src={props?.product?.image} alt="error" />}
      </Link>
      <div className={cx("content-2")}>
        <Link className={cx("heading")} to={`/${props?.product?.slug}`}>{props?.product?.title}</Link>
        <div className={cx("address")}>
          Dung lượng: {props?.product?.capacity}
        </div>
        <div className={cx("color")}>Màu: {props?.product?.color}</div>
      </div>
      <div className={cx("content-3")}>
        <div>Giá: {props?.product && formatNumber(props?.product?.price)}₫ - ({props?.product?.percentDiscount}%)</div>
        <div>Thanh toán: {props?.product && formatNumber(props?.product?.priceDiscount)}₫</div>
      </div>
      <div className={cx("content-4")}>
        <div className={cx("buy")}>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-primary  fs-3" onClick={handleReduce}><RiSubtractFill /></button>
            <p className="mb-0 px-4 fs-3 d-flex align-items-center">{quantity}</p>
            <button type="button" className="btn btn-primary  fs-3" onClick={handleIncrease}><MdAdd /></button>
          </div>
        </div>
      </div>
      <div className={cx("content-4")}>
        <div className={cx("buy")}>
          <Link className={cx("buy-btn")} to={`/${config.routes.checkout}`} onClick={handleBuy}>
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
