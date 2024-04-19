import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { cx } from "./CheckOut";

export const CheckOut = () => {
  const navigate = useNavigate();
  const [infoCustomer, setInfoCustomer] = useState();
  const [productData, setProductData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    const dataCustomer = JSON.parse(localStorage.getItem("dataCustomer"));
    const { infoCustomer, productData } = dataCustomer;
    setInfoCustomer(dataCustomer.infoCustomer);
    setProductData(dataCustomer.productData);
    console.log(">>>Check infoCustomer", infoCustomer);
    console.log(">>>Check productData", productData);
  }, []);

  const handleCheckout = (e) => {
    // e.preventDefault();
  };

  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
  };

  return (
    <>
      <div className={cx("bl-logo-checkout")}>
        <div className={cx("logo-checkout")}>
          <div className={cx("logo")}>
            <img
              src="https://res.cloudinary.com/daofedrqe/image/upload/v1707379342/wanfit_apple_imageAvt/mhf6siicj77fofhuvfcm.png"
              alt=""
            />
            WanFit
          </div>
          <div className={cx("checkout")}>Thanh Toán</div>
        </div>
      </div>
      <div className={cx("bg-wrapper")}>
        <div className={cx("wrapper")}>
          <div className={cx("bg-top")}></div>
          <div className={cx("location")}>
            <div className={cx("title")}>
              <IoLocationSharp className={cx("logo")} />
              Địa chỉ nhận hàng
            </div>
            <div className={cx("content")}>
              <div className={cx("content-1")}>
                {infoCustomer?.name} {infoCustomer?.phone}
              </div>
              <div className={cx("content-2")}>
                {infoCustomer?.district} {infoCustomer?.city}
              </div>
              <Link className={cx("content-3")}>Thay Đổi</Link>
            </div>
          </div>
          <div className={cx("title-product")}>Sản phẩm</div>
          <div className={cx("bl-product")}>
            <div className={cx("inner-left")}>
              <div className={cx("bl-table")}>
                <div className={cx("title")}>
                  <div className={cx("title-1")}>Hình ảnh</div>
                  <div className={cx("title-2")}>Tên sản phẩm</div>
                </div>
                <div className={cx("container")}>
                  <div className={cx("content")}>
                    <div className={cx("content-1")}>
                      <img src={`${productData?.imageAvatar[0]}`} alt="" />
                    </div>
                    <div className={cx("content-2")}>
                      <div className={cx("heading")}>{productData?.title}</div>
                      {/* <div className={cx("address")}>Khu vực: Khu vực miền Bắc</div> */}
                      <div className={cx("color")}>
                        Diện tích: {productData?.width * productData?.length}m2
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("inner-right")}>
              <div className={cx("bl-total")}>
                <div className={cx("total-1")}>
                  <div className={cx("title-1")}>Tổng tiền hàng</div>
                  <div className={cx("text-1")}>
                    ₫{productData && formatNumber(productData?.price)}
                  </div>
                </div>
                <div className={cx("total-2")}>
                  <div className={cx("title-2")}>Phí vận chuyển</div>
                  <div className={cx("text-2")}>₫92.200</div>
                </div>
                <div className={cx("total-3")}>
                  <div className={cx("title-3")}>Tổng thanh toán</div>
                  <div className={cx("text-3")}>
                    ₫{productData && formatNumber(productData?.price)}
                  </div>
                </div>
                <div className={cx("bl-btn")}>
                  <div className={cx("bl-buy")}>
                    <Link to={"/"} className={cx("buy")}>
                      Tiếp tục mua sắm
                    </Link>
                  </div>
                  <button type="submit" className={cx("btn")} onClick={(e) => handleCheckout(e)}>
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
