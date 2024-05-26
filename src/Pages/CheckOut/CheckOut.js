import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CheckOut.module.scss";
import { IoLocationSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
// import { HiMinus, HiPlus } from "react-icons/hi";
import { GoTrash } from "react-icons/go";
import config from "../../config";
import { createCart, createOrderWithUser, deleteCart, readCartTotal, readCities, readDistricts, readJWT, sendMailer, updateCart } from "../../services/apiUserService";
import jwtDecode from "../../hooks/jwtDecode";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from "react-toastify";
import { CountCartContext } from "../../hooks/DataContext";

const cx = classNames.bind(styles);

const CheckOut = () => {
  const { setCountCart } = useContext(CountCartContext)
  const navigate = useNavigate();
  const [dataCheckout, setDataCheckout] = useState();
  const [userLogin, setUserLogin] = useState()
  const [cities, setCities] = useState()
  const [districts, setDistricts] = useState()

  // useEffect(() => {   // window.scrollTo(0, 0);}, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchJWT(); const dataCheckout = JSON.parse(localStorage.getItem("dataCheckout")); setDataCheckout(dataCheckout) }, []);
  const fetchJWT = async () => {
    let decoded = false
    const resJWT = await readJWT();
    if (resJWT?.DT?.jwt) {
      decoded = await jwtDecode(resJWT?.DT?.jwt)
      fetchCartWithId(decoded?.user?.id)
    }
    setUserLogin(decoded?.user)

    if (decoded?.user?.cities) {
      let city = await readCities(decoded?.user?.cities)
      if (city?.EC === 0) { setCities(city?.DT?.name) }
    }

    if (decoded?.user?.districts) {
      let district = await readDistricts(null, decoded?.user?.districts)
      if (district?.EC === 0) { setDistricts(district?.DT?.name) }
    }
  };
  const fetchCartWithId = async (idUser) => {
    const fetchCart = await readCartTotal(idUser)
    setCountCart(fetchCart.DT)
  }

  const formatNumber = (number) => { return number.toLocaleString("vi-VN"); };

  const totalPrice = () => {
    return dataCheckout && dataCheckout.reduce((total, product) => {
      return total + product?.priceDiscount * product?.quantity
    }, 0)
  }

  // payment
  const [dataPayment, setDataPayment] = useState({ ship: 20000, payment: "payment-on-delivery" })
  const handlePayment = (e) => {
    const { name, value } = e.target
    setDataPayment((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  // payment delivery
  const handleCheckout = async (e) => {
    e.preventDefault();
    // let currentDataPayment = { ...dataCheckout[0], priceDiscount: dataCheckout[0]?.priceDiscount + dataPayment.ship }
    const value = (+totalPrice() + +dataPayment.ship)
    const fetchSendMailer = await sendMailer({ userLogin, dataCheckout, value })
    console.log(fetchSendMailer);
    if (fetchSendMailer) {
      let fetchOrder = await createOrderWithUser(userLogin?.id)
      if (fetchOrder) {
        await dataCheckout.map(async (cart, index) => {
          if (!cart.id) {
            let currentCart = { ...cart, idOrder: fetchOrder?.DT?.id }
            await createCart(currentCart)
            await fetchJWT()
          } else {
            await updateCart(cart.id, fetchOrder?.DT?.id)
            await fetchJWT()
          }
        })
      }
      toast.success("Đặt hàng thành công");
      navigate(`/${config.routes.order}`)
    }
  };

  // payment paypal
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: (+totalPrice() + +dataPayment.ship) / 10000
        },
      }],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      if (details.status === "COMPLETED") {
        let fetchOrder = await createOrderWithUser(userLogin?.id)
        if (fetchOrder) {
          await dataCheckout.map(async (cart, index) => {
            if (!cart.id) {
              let currentCart = { ...cart, idOrder: fetchOrder?.DT?.id }
              await createCart(currentCart)
              await fetchJWT()
            } else {
              await updateCart(cart.id, fetchOrder?.DT?.id)
              await fetchJWT()
            }
          })
        }
        toast.success("Đặt hàng thành công");
        navigate(`/${config.routes.order}`)
      } else {
        toast.warning("Số dư không đủ");
      }
    }).catch((error) => {
      console.error("Transaction failed: ", error);
      toast.warning("Đã xảy ra lỗi trong quá trình giao dịch.");
    });
  };
  const onError = (err) => {
    console.error("PayPal Checkout onError", err);
    toast.error("Đã xảy ra lỗi trong quá trình giao dịch.");
  };

  return (
    <>
      <div className={cx("bl-logo-checkout")} >
        <div className={cx("logo-checkout")}>
          <div className={cx("logo")}>
            <img
              src="https://res.cloudinary.com/daofedrqe/image/upload/v1707379342/wanfit_apple_imageAvt/mhf6siicj77fofhuvfcm.png"
              alt=""
            />
            QuocHoangDev
          </div>
          <div className={cx("checkout")}>Thanh Toán</div>
        </div>
      </div>
      <div className={cx("bg-wrapper")}>
        <div className={cx("container")}>
          <div className={cx("bg-top")}></div>
          <div className={cx("location")}>
            <div className={cx("title")}>
              <IoLocationSharp className={cx("logo")} />
              Địa chỉ nhận hàng
            </div>
            <div className={cx("content")}>
              <div className={cx("content-1")}>
                {userLogin?.lastName} {userLogin?.firstName}{userLogin && " / "}{userLogin?.phone}
              </div>
              <div className={cx("content-2")}>
                {cities && cities}{userLogin && ' - '}{districts && districts}{userLogin && " - "}{userLogin?.address}
              </div>
              <Link className={cx("content-3")} to={`/${config.routes.profile}`}>Thay Đổi</Link>
            </div>
          </div>
          {/* product */}
          <h3 className="rounded p-4 bg-white w-100 mb-1">Sản phẩm</h3>
          <table className="table table-hover mb-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Hình ảnh</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Màu</th>
                <th scope="col">Dung lượng</th>
              </tr>
            </thead>
            <tbody>
              {dataCheckout && dataCheckout.map((product, index) => {
                return (<tr key={`${index}-product`}>
                  <th scope="row">{index + 1}</th>
                  <td><img className={cx("img-avatar")} src={`${product?.image}`} alt="" /></td>
                  <td >{product?.title}</td>
                  <td>{product && formatNumber(product?.priceDiscount)}₫</td>
                  <td>{product?.color}</td>
                  <td>{product?.capacity}</td>
                </tr>)
              })}
            </tbody>
          </table>
          <h3 className="rounded p-4 bg-white w-100 mb-1">Thanh toán</h3>
          <div className={cx("payment")}>
            <div className="row">
              <div className="col-8">
                <div className="rounded p-4 bg-white w-100 mb-1">
                  <h4 className="fw-bold mb-3 fs-4">Chọn phương thức giao hàng</h4>
                  <div className="border border-primary-subtle rounded w-50 bg-primary bg-opacity-10 p-4">
                    <div className="form-check">
                      <input defaultChecked className="form-check-input" value={20000} type="radio" name="ship" id="ship1" onChange={handlePayment} />
                      <label className="form-check-label fs-4" htmlFor="ship1">
                        Giao hàng tiết kiệm
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" value={30000} type="radio" name="ship" id="ship2" onChange={handlePayment} />
                      <label className="form-check-label fs-4" htmlFor="ship2">
                        Giao hàng nhanh
                      </label>
                    </div>
                  </div>
                </div>
                <div className="rounded p-4 bg-white w-100">
                  <h4 className="fw-bold mb-3">Chọn phương thức thanh toán</h4>
                  <div className="border border-primary-subtle rounded w-50 bg-primary bg-opacity-10 p-4">
                    <div className="form-check">
                      <input defaultChecked className="form-check-input" value={"payment-on-delivery"} type="radio" name="payment" id="payment1" onChange={handlePayment} />
                      <label className="form-check-label fs-4" htmlFor="payment1">
                        Thanh toán tiền mặt khi nhận hàng
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" value={"payment-paypal"} type="radio" name="payment" id="payment2" onChange={handlePayment} />
                      <label className="form-check-label fs-4" htmlFor="payment2">
                        Thanh toán tiền bằng paypal
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="rounded p-4 bg-white w-100 mb-1">
                  <table className="table table-borderless fs-4">
                    <tbody>
                      <tr>
                        <td>Tạm tính</td>
                        <td className="d-flex justify-content-end fw-bold">{dataCheckout && formatNumber(totalPrice())} VND</td>
                      </tr>
                      <tr>
                        <td>Giảm giá</td>
                        <td className="d-flex justify-content-end fw-bold">0 VND</td>
                      </tr>
                      <tr>
                        <td>Phí giao hàng</td>
                        <td className="d-flex justify-content-end fw-bold">{formatNumber(+dataPayment.ship)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded p-4 bg-white w-100">
                  <table className="table table-borderless fs-4">
                    <tbody>
                      <tr>
                        <td>Tổng tiền</td>
                        <td className="d-flex justify-content-end fw-bold fs-2 text-danger">{dataCheckout && formatNumber((+totalPrice() + +dataPayment.ship))} VND</td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="fs-5 text-center">(Đã bao gồm VAT nếu có)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-4 w-100">
                  {dataPayment.payment === "payment-on-delivery"
                    && <div className={cx("bl-btn")}>
                      <button type="submit" className={cx("btn")} onClick={(e) => handleCheckout(e)}>
                        Đặt hàng
                      </button>
                    </div>
                  }
                  {dataPayment.payment === "payment-paypal"
                    && <PayPalScriptProvider options={{ "client-id": "AaDtiX4T1k8snm0mAoEeZF8jMvYqFKbIRwUjwivEyH8__8DL5RDhEC7nyYuDJg2LNUl7f2nEgSz3o6rM" }} amount={10000000}>
                      <PayPalButtons style={{ layout: "vertical" }} onApprove={onApprove} createOrder={createOrder} onError={onError} />
                    </PayPalScriptProvider>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
