import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./HomeDetail.module.scss";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { FaRegSquare } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { GrPrevious, GrNext } from "react-icons/gr";
import {
  FiLayers,
  FiSmartphone,
  FiAirplay,
  FiInfo,
  FiLayout,
  FiCreditCard,
  FiHome,
  FiDollarSign,
  FiHash,
} from "react-icons/fi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ContactOrder from "../../layout/components/ContactOrder/ContactOrder";
import { useParams } from "react-router-dom";
import { readHeart, readJWT, readProductDetail } from "../../services/userService";

const cx = classNames.bind(styles);

const HomeDetail = () => {
  const [isCheckHeart, setIsCheckHeart] = useState();
  const { slug } = useParams();
  const [productData, setProductData] = useState();
  const [srcAvatar, setSrcAvatar] = useState();
  const [overflow, setOverflow] = useState(false);
  const [indexNextImageAvatar, setIndexNextImageAvatar] = useState(0);
  const [indexNextImageDetail, setIndexNextImageDetail] = useState();
  const refImgSub = useRef();

  // Check user
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [dataUsers, setDataUsers] = useState();
  const [cookie, setCookie] = useState();

  useEffect(() => {
    // Get localStorage
    const user = JSON.parse(localStorage.getItem("dataUsers"));
    setDataUsers(user);
    // Call api JWT
    fetchJWT();
  }, [productData?.id]);

  const fetchJWT = async () => {
    const resJWT = await readJWT();
    setCookie(resJWT?.DT?.jwt);
  };

  // Call Api
  useEffect(() => {
    if (!!dataUsers === true && !!cookie === true) {
      fetchProductId(productData?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUsers, cookie, productData?.id]);
  const fetchProductId = async () => {
    let productId = productData?.id;
    let data = await readHeart(null, null, productId);
    if (data.EC === 0) {
      setIsCheckHeart(true);
    } else {
      setIsCheckHeart(null);
    }
  };

  // Call Api
  useEffect(() => {
    fetchProducts(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchProducts = async (slug) => {
    let data = await readProductDetail(slug);
    setProductData(data?.DT);
    setSrcAvatar(data?.DT?.imageAvatar[0]);
  };
  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
  };

  const handleLeft = () => {
    refImgSub.current.scrollLeft -= 80;
  };
  const handleRight = () => {
    refImgSub.current.scrollLeft += 80;
  };

  // Avatar
  const handleShowImgAvt = async (src, index) => {
    setSrcAvatar(src);
    setIndexNextImageAvatar(index);
  };

  // Detail
  const handleShowImg = async (arr, index) => {
    setIndexNextImageDetail(index);
    await setOverflow(true);
    let imgHtml = await document.getElementsByClassName(`${styles.imgSrc}`);
    let imgArray = await Array.from(imgHtml);
    imgArray[0].src = arr;
  };
  const handleCloseImg = () => {
    setOverflow(false);
    setIndexNextImageAvatar(0);
    setIndexNextImageDetail(undefined);
  };

  const handlePrevImageDetail = async () => {
    if (indexNextImageAvatar >= 0 && indexNextImageDetail === undefined) {
      setIndexNextImageAvatar((prev) => prev - 1);
      let imgHtml = await document.getElementsByClassName(`${styles.imgSrc}`);
      let imgArray = await Array.from(imgHtml);
      if (productData.imageAvatar[indexNextImageAvatar - 1]) {
        imgArray[0].src = productData.imageAvatar[indexNextImageAvatar - 1];
      } else {
        setOverflow(false);
      }
    }
    if (indexNextImageDetail >= 0) {
      setIndexNextImageDetail((prev) => prev - 1);
      let imgHtml = await document.getElementsByClassName(`${styles.imgSrc}`);
      let imgArray = await Array.from(imgHtml);
      if (productData.imageDetail[indexNextImageDetail - 1]) {
        imgArray[0].src = productData.imageDetail[indexNextImageDetail - 1];
      } else {
        setOverflow(false);
      }
    }
  };
  const handleNextImageDetail = async () => {
    if (indexNextImageAvatar >= 0 && indexNextImageDetail === undefined) {
      setIndexNextImageAvatar((prev) => prev + 1);
      let imgHtml = await document.getElementsByClassName(`${styles.imgSrc}`);
      let imgArray = await Array.from(imgHtml);
      if (productData.imageAvatar[indexNextImageAvatar + 1]) {
        imgArray[0].src = productData.imageAvatar[indexNextImageAvatar + 1];
      } else {
        setOverflow(false);
      }
    }
    if (indexNextImageDetail >= 0) {
      setIndexNextImageDetail((prev) => prev + 1);
      let imgHtml = await document.getElementsByClassName(`${styles.imgSrc}`);
      let imgArray = await Array.from(imgHtml);
      if (productData.imageDetail[indexNextImageDetail + 1]) {
        imgArray[0].src = productData.imageDetail[indexNextImageDetail + 1];
      } else {
        setOverflow(false);
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("information")}>
          <div className={cx("title")}>{productData?.title}</div>
          <div className={cx("img-avatar")} onClick={() => handleShowImg(srcAvatar)}>
            <img src={`${srcAvatar}`} alt="" />
            <div className={cx("heart")}>
              {!!dataUsers === true && !!cookie === true ? (
                isCheckHeart ? (
                  <FaHeart className={cx("heart-icon-fill")} />
                ) : (
                  <FaRegHeart className={cx("heart-icon-empty")} />
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={cx("img-sub")}>
            <div className={cx("img-sub-icon")}>
              <div className={cx("sub-icon-left")} onClick={handleLeft}>
                <FaCircleChevronLeft />
              </div>
              <div className={cx("sub-icon-right")} onClick={handleRight}>
                <FaCircleChevronRight />
              </div>
            </div>
            <div className={cx("img-sub-list")} ref={refImgSub}>
              {productData?.imageAvatar.map((imgAvatar, index) => {
                return (
                  <div
                    key={index}
                    className={cx("img-sub-item")}
                    onClick={() => handleShowImgAvt(imgAvatar, index)}
                  >
                    <img src={`${imgAvatar}`} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <hr className={cx("hr")} />
          <div className={cx("specifications")}>
            <div className={cx("title")}>Thông số kỹ thuật</div>
            <div className={cx("table-detail")}>
              <table className={cx("table-left")}>
                <tbody>
                  <tr>
                    <th>
                      <div className={cx("two-row")}>
                        <FiLayers className={cx("icon")} />
                        <span className={cx("text")}>Số tầng</span>
                      </div>
                    </th>
                    <td className={cx("text")}>{productData?.numberOfFloors}</td>
                  </tr>
                  <tr>
                    <th>
                      <div className={cx("two-row")}>
                        <FaRegSquare className={cx("icon")} />
                        <span className={cx("text")}>Diện tích</span>
                      </div>
                    </th>
                    <td className={cx("text")}>{productData?.width * productData?.length}m2</td>
                  </tr>
                  <tr>
                    <th>
                      <div className={cx("two-row")}>
                        <FiSmartphone className={cx("icon")} />
                        <span className={cx("text")}>Chiều dài</span>
                      </div>
                    </th>
                    <td className={cx("text")}>{productData?.length}m</td>
                  </tr>
                  <tr>
                    <th>
                      <div className={cx("two-row")}>
                        <FiAirplay className={cx("icon")} />
                        <span className={cx("text")}>Phong cách</span>
                      </div>
                    </th>
                    <td className={cx("text")}>Mái bằng</td>
                  </tr>
                  <tr>
                    <th>
                      <div className={cx("two-row")}>
                        <FiInfo className={cx("icon")} />
                        <span className={cx("text")}>Thiết kế bởi</span>
                      </div>
                    </th>
                    <td className={cx("text")}>QuocHoangIT</td>
                  </tr>
                </tbody>
              </table>
              <table className={cx("table-right")}>
                <tbody>
                  <tr>
                    <th>
                      <div className={cx("two-row")}>
                        <FiLayout className={cx("icon")} />
                        <span className={cx("text")}>Phòng ngủ</span>
                      </div>
                    </th>
                    <td className={cx("text")}>{productData?.roomNumber}</td>
                  </tr>
                  <tr>
                    <th>
                      <div className={cx("two-row")}>
                        <FiCreditCard className={cx("icon")} />
                        <span className={cx("text")}>Mặt tiền</span>
                      </div>
                    </th>
                    <td className={cx("text")}>{productData?.facade}m</td>
                  </tr>
                  <tr>
                    <th>
                      <div className={cx("two-row")}>
                        <FiHome className={cx("icon")} />
                        <span className={cx("text")}>Loại hình</span>
                      </div>
                    </th>
                    <td className={cx("text")}>{productData?.Category?.name}</td>
                  </tr>
                  <tr>
                    <th>
                      <div className={cx("two-row")}>
                        <FiDollarSign className={cx("icon")} />
                        <span className={cx("text")}>Chi phí</span>
                      </div>
                    </th>
                    <td className={cx("text")}>Liên hệ</td>
                  </tr>
                  <tr>
                    <th>
                      <div className={cx("two-row")}>
                        <FiHash className={cx("icon")} />
                        <span className={cx("text")}>Mã SP</span>
                      </div>
                    </th>
                    <td className={cx("text")}>{productData?.productCode}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={cx("contact")}>
          <ContactOrder
            productData={productData}
            dataUsers={dataUsers}
            cookie={cookie}
            isCheckHeart={isCheckHeart}
          />
        </div>
      </div>
      <div className={cx("detail-product")}>
        <div className={cx("title")}>Chi tiết sản phẩm</div>
        <div className={cx("block-img")}>
          {productData?.imageDetail.map((imgDetail, index) => {
            return (
              <img
                key={`imgDetail-${index}`}
                className={cx("detail-img")}
                src={`${imgDetail}`}
                alt=""
                onClick={() => handleShowImg(imgDetail, index)}
              />
            );
          })}
        </div>
        {overflow && (
          <div className={cx("overflow-img")}>
            <IoIosClose className={cx("overflow-close")} onClick={handleCloseImg} />
            <img className={cx("imgSrc")} src="" alt="" />
            <div className={cx("prev-next")}>
              <GrPrevious className={cx("icon")} onClick={handlePrevImageDetail} />
              <GrNext className={cx("icon")} onClick={handleNextImageDetail} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeDetail;
