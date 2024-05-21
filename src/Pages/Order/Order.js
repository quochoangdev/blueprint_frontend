import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Order.module.scss";
import { deleteOrder, readCartWithOrderId, readJWT, readOrder } from "../../services/apiUserService";
import jwtDecode from "../../hooks/jwtDecode";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const Order = () => {
  const [dataOrder, setDataOrder] = useState();
  const [userLogin, setUserLogin] = useState()
  const [cartData, setCartData] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchJWT() }, []);
  const fetchJWT = async () => {
    let decoded = false
    const resJWT = await readJWT();
    if (resJWT?.DT?.jwt) {
      decoded = await jwtDecode(resJWT?.DT?.jwt)
      fetchOrderWithId(decoded?.user?.id)
    }
    setUserLogin(decoded?.user)
  };
  const fetchOrderWithId = async (idUser) => {
    const fetchOrder = await readOrder(null, null, idUser)
    setDataOrder(fetchOrder.DT)
  }

  const fetchCartWithIdOrder = async (idUser) => {
    const fetchOrder = await readCartWithOrderId(idUser)
    return fetchOrder.DT
  }
  useEffect(() => {
    const fetchCartData = async () => {
      const cartDataPromises = dataOrder.map(order => fetchCartWithIdOrder(order.id));
      const cartDataResults = await Promise.all(cartDataPromises);
      const newCartData = dataOrder.reduce((acc, order, index) => {
        acc[order.id] = cartDataResults[index];
        return acc;
      }, {});
      setCartData(newCartData);
    };
    if (dataOrder?.length > 0) {
      fetchCartData();
    }
  }, [dataOrder]);

  const getTimeOrder = (isoDateString) => {
    let date = new Date(isoDateString);
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();
    return `${day}/${month}/${year}`
  }

  const handleDelOrder = async (id) => {
    const fetchOrder = await deleteOrder(id)
    if (fetchOrder?.EC === 0) {
      fetchOrderWithId(userLogin?.id)
      toast.success(fetchOrder?.EM)
    } else {
      toast.error(fetchOrder?.EM)
    }
  }

  // dataOrder && console.log(dataOrder);
  const formatNumber = (number) => { return number.toLocaleString("vi-VN"); };
  return (
    <>
      {dataOrder && dataOrder.length > 0 ?
        <React.Fragment>
          <div className={cx("bl-logo-checkout")} >
            <div className={cx("logo-checkout")}>
              <div className={cx("logo")}>
                {userLogin?.lastName} {userLogin?.firstName}
              </div>
              <div className={cx("checkout")}>{userLogin?.phone}</div>
            </div>
          </div>
          <div className="container pt-3">
            <h3 className="rounded p-4 bg-white w-100 mb-1 fw-bold">Đơn hàng</h3>
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
            </table>
            {dataOrder && dataOrder.map((order, index) => (
              <div className="row  mb-2" key={`${index}-order`}>
                <div className="col-11">
                  <table className="table table-hover" >
                    <tbody>
                      <tr>
                        <td colSpan="6" className="fw-medium fs-4 px-4 py-3">
                          Ngày đặt hàng: {getTimeOrder(order.createdAt)}
                        </td>
                      </tr>
                      {cartData[order.id] && cartData[order.id].map((product, productIndex) => (
                        <tr key={product.id} className={cx('cursor-pointer')}>
                          <td>{index + 1}.{productIndex + 1}</td>
                          <td>
                            <img src={product.image} alt={product.title} width="50" height="50" />
                          </td>
                          <td>{product.title}</td>
                          <td>{formatNumber(product.price)}</td>
                          <td>{product.color}</td>
                          <td>{product.capacity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-1 mb-3">
                  <div className={cx("d-flex justify-content-center align-items-center w-100 h-100 bg-white", "icon-hover")} onClick={() => handleDelOrder(order?.id)}><FaTrashAlt className="fs-1" /></div>
                </div>
              </div>
            ))}
            <div className="mb-5"></div>
          </div>
        </React.Fragment> :
        <div className={cx("no-order")}>
          <img src="https://res.cloudinary.com/dqhj1sukr/image/upload/v1716057739/ecommerce/bb5ehztkhkwx51g2s6ez.png" alt="" />
        </div>
      }

    </>
  );
};

export default Order;
